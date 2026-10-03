import SqlWorkspace from '../models/SqlWorkspace.js';

const MAX_WORKSPACES_PER_USER = 5;

/**
 * @desc    Get all SQL workspaces for the current user
 * @route   GET /api/sql-workspaces
 * @access  Public / Authenticated
 */
export const getWorkspaces = async (req, res, next) => {
  try {
    const clerkId = req.query.clerkId || req.headers['x-user-id'] || 'usr_guest';

    const workspaces = await SqlWorkspace.find({ clerkId })
      .select('workspaceName description templateType createdAt updatedAt queryHistory')
      .sort({ updatedAt: -1 })
      .lean();

    const formatted = workspaces.map((ws) => ({
      _id: ws._id,
      workspaceName: ws.workspaceName,
      description: ws.description,
      templateType: ws.templateType,
      historyCount: ws.queryHistory ? ws.queryHistory.length : 0,
      createdAt: ws.createdAt,
      updatedAt: ws.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      maxAllowed: MAX_WORKSPACES_PER_USER,
      data: formatted,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single SQL workspace by ID
 * @route   GET /api/sql-workspaces/:id
 * @access  Public / Authenticated
 */
export const getWorkspaceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clerkId = req.query.clerkId || req.headers['x-user-id'] || 'usr_guest';

    const workspace = await SqlWorkspace.findOne({ _id: id, clerkId });

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: 'SQL Workspace not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new SQL workspace (Enforces MAX 5 limit)
 * @route   POST /api/sql-workspaces
 * @access  Public / Authenticated
 */
export const createWorkspace = async (req, res, next) => {
  try {
    const clerkId = req.body.clerkId || req.headers['x-user-id'] || 'usr_guest';
    const { workspaceName, description, templateType, sqlDraft, schemaSnapshot, binaryDbBase64 } = req.body;

    if (!workspaceName || !workspaceName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Workspace name is required.',
      });
    }

    const currentCount = await SqlWorkspace.countDocuments({ clerkId });
    if (currentCount >= MAX_WORKSPACES_PER_USER) {
      return res.status(400).json({
        success: false,
        message: `Workspace limit reached (${MAX_WORKSPACES_PER_USER} max). Please delete or edit an existing workspace.`,
      });
    }

    const newWorkspace = await SqlWorkspace.create({
      clerkId,
      workspaceName: workspaceName.trim(),
      description: (description || '').trim(),
      templateType: templateType || 'BLANK',
      sqlDraft: sqlDraft || '',
      schemaSnapshot: schemaSnapshot || { tables: [] },
      binaryDbBase64: binaryDbBase64 || '',
      queryHistory: [],
    });

    return res.status(201).json({
      success: true,
      message: 'SQL Workspace created successfully.',
      data: newWorkspace,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing SQL workspace (Draft, DB Snapshot, Metadata, History)
 * @route   PUT /api/sql-workspaces/:id
 * @access  Public / Authenticated
 */
export const updateWorkspace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clerkId = req.body.clerkId || req.headers['x-user-id'] || 'usr_guest';
    const { workspaceName, description, sqlDraft, schemaSnapshot, binaryDbBase64, newHistoryItem } = req.body;

    const workspace = await SqlWorkspace.findOne({ _id: id, clerkId });

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: 'SQL Workspace not found.',
      });
    }

    if (workspaceName !== undefined) workspace.workspaceName = workspaceName.trim();
    if (description !== undefined) workspace.description = description.trim();
    if (sqlDraft !== undefined) workspace.sqlDraft = sqlDraft;
    if (schemaSnapshot !== undefined) workspace.schemaSnapshot = schemaSnapshot;
    if (binaryDbBase64 !== undefined) workspace.binaryDbBase64 = binaryDbBase64;

    if (newHistoryItem && newHistoryItem.query) {
      workspace.queryHistory.unshift({
        query: newHistoryItem.query,
        executionTimeMs: newHistoryItem.executionTimeMs || 0,
        rowsAffected: newHistoryItem.rowsAffected || 0,
        status: newHistoryItem.status || 'success',
        errorMessage: newHistoryItem.errorMessage || '',
        timestamp: new Date(),
      });

      // Keep only the most recent 50 queries
      if (workspace.queryHistory.length > 50) {
        workspace.queryHistory = workspace.queryHistory.slice(0, 50);
      }
    }

    await workspace.save();

    return res.status(200).json({
      success: true,
      message: 'SQL Workspace updated successfully.',
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a SQL workspace
 * @route   DELETE /api/sql-workspaces/:id
 * @access  Public / Authenticated
 */
export const deleteWorkspace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clerkId = req.query.clerkId || req.headers['x-user-id'] || 'usr_guest';

    const deleted = await SqlWorkspace.findOneAndDelete({ _id: id, clerkId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'SQL Workspace not found.',
      });
    }

    const remainingCount = await SqlWorkspace.countDocuments({ clerkId });

    return res.status(200).json({
      success: true,
      message: 'SQL Workspace deleted successfully.',
      remainingCount,
      maxAllowed: MAX_WORKSPACES_PER_USER,
    });
  } catch (error) {
    next(error);
  }
};
