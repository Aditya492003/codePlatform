import { apiRequest } from './api';

const LOCAL_STORAGE_KEY = 'codeplatform_sql_workspaces';
const MAX_WORKSPACES = 5;

// Guest localStorage helpers
function getLocalWorkspaces() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to parse local SQL workspaces:', e);
    return [];
  }
}

function saveLocalWorkspaces(workspaces) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workspaces));
  } catch (e) {
    console.warn('Failed to persist local SQL workspaces:', e);
  }
}

export const sqlWorkspaceService = {
  /**
   * Get all workspaces for a user (Max 5)
   */
  async getWorkspaces(clerkId = 'usr_guest') {
    try {
      const res = await apiRequest(`/sql-workspaces?clerkId=${encodeURIComponent(clerkId)}`);
      return res.data || [];
    } catch (err) {
      console.warn('Falling back to localStorage for workspaces:', err.message);
      const local = getLocalWorkspaces();
      return local.map((ws) => ({
        _id: ws._id,
        workspaceName: ws.workspaceName,
        description: ws.description,
        templateType: ws.templateType,
        historyCount: ws.queryHistory ? ws.queryHistory.length : 0,
        createdAt: ws.createdAt,
        updatedAt: ws.updatedAt,
      }));
    }
  },

  /**
   * Get a single workspace by ID
   */
  async getWorkspaceById(id, clerkId = 'usr_guest') {
    try {
      const res = await apiRequest(`/sql-workspaces/${id}?clerkId=${encodeURIComponent(clerkId)}`);
      return res.data;
    } catch (err) {
      console.warn('Falling back to localStorage for workspace detail:', err.message);
      const local = getLocalWorkspaces();
      const found = local.find((w) => w._id === id);
      if (!found) throw new Error('Workspace not found locally.');
      return found;
    }
  },

  /**
   * Create a new SQL workspace
   */
  async createWorkspace(workspaceData, clerkId = 'usr_guest') {
    try {
      const res = await apiRequest('/sql-workspaces', {
        method: 'POST',
        body: JSON.stringify({ ...workspaceData, clerkId }),
      });
      return res.data;
    } catch (err) {
      console.warn('Creating workspace in localStorage:', err.message);
      const local = getLocalWorkspaces();
      if (local.length >= MAX_WORKSPACES) {
        throw new Error(`Maximum limit of ${MAX_WORKSPACES} workspaces reached. Delete an existing workspace first.`);
      }

      const newWs = {
        _id: `local_ws_${Date.now()}`,
        clerkId,
        workspaceName: workspaceData.workspaceName || 'Untitled Workspace',
        description: workspaceData.description || '',
        templateType: workspaceData.templateType || 'BLANK',
        sqlDraft: workspaceData.sqlDraft || '',
        schemaSnapshot: workspaceData.schemaSnapshot || { tables: [] },
        binaryDbBase64: workspaceData.binaryDbBase64 || '',
        queryHistory: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      local.unshift(newWs);
      saveLocalWorkspaces(local);
      return newWs;
    }
  },

  /**
   * Update an existing workspace
   */
  async updateWorkspace(id, updateData, clerkId = 'usr_guest') {
    try {
      const res = await apiRequest(`/sql-workspaces/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...updateData, clerkId }),
      });
      return res.data;
    } catch (err) {
      console.warn('Updating workspace in localStorage:', err.message);
      const local = getLocalWorkspaces();
      const index = local.findIndex((w) => w._id === id);
      if (index === -1) throw new Error('Workspace not found.');

      const ws = local[index];
      if (updateData.workspaceName !== undefined) ws.workspaceName = updateData.workspaceName;
      if (updateData.description !== undefined) ws.description = updateData.description;
      if (updateData.sqlDraft !== undefined) ws.sqlDraft = updateData.sqlDraft;
      if (updateData.schemaSnapshot !== undefined) ws.schemaSnapshot = updateData.schemaSnapshot;
      if (updateData.binaryDbBase64 !== undefined) ws.binaryDbBase64 = updateData.binaryDbBase64;

      if (updateData.newHistoryItem) {
        if (!ws.queryHistory) ws.queryHistory = [];
        ws.queryHistory.unshift({
          ...updateData.newHistoryItem,
          timestamp: new Date().toISOString(),
        });
        if (ws.queryHistory.length > 50) ws.queryHistory = ws.queryHistory.slice(0, 50);
      }

      ws.updatedAt = new Date().toISOString();
      local[index] = ws;
      saveLocalWorkspaces(local);
      return ws;
    }
  },

  /**
   * Delete a workspace
   */
  async deleteWorkspace(id, clerkId = 'usr_guest') {
    try {
      const res = await apiRequest(`/sql-workspaces/${id}?clerkId=${encodeURIComponent(clerkId)}`, {
        method: 'DELETE',
      });
      return res;
    } catch (err) {
      console.warn('Deleting workspace in localStorage:', err.message);
      let local = getLocalWorkspaces();
      local = local.filter((w) => w._id !== id);
      saveLocalWorkspaces(local);
      return { success: true, remainingCount: local.length };
    }
  },
};
