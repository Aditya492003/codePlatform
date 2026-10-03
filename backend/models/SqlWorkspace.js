import mongoose from 'mongoose';

const QueryHistoryItemSchema = new mongoose.Schema(
  {
    query: { type: String, required: true },
    executionTimeMs: { type: Number, default: 0 },
    rowsAffected: { type: Number, default: 0 },
    status: { type: String, enum: ['success', 'error'], default: 'success' },
    errorMessage: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const SqlWorkspaceSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      index: true,
    },
    workspaceName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    description: {
      type: String,
      default: '',
      maxlength: 200,
    },
    sqlDraft: {
      type: String,
      default: '',
    },
    templateType: {
      type: String,
      enum: ['BLANK', 'ECOMMERCE', 'UNIVERSITY', 'HOSPITAL', 'CUSTOM'],
      default: 'BLANK',
    },
    queryHistory: [QueryHistoryItemSchema],
    schemaSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({ tables: [] }),
    },
    binaryDbBase64: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

SqlWorkspaceSchema.index({ clerkId: 1, createdAt: -1 });

const SqlWorkspace = mongoose.model('SqlWorkspace', SqlWorkspaceSchema);

export default SqlWorkspace;
