import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * Health check endpoint showing server status and database connectivity
 * GET /api/health
 */
router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  const isHealthy = dbState === 1;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'degraded',
    service: 'CodePlatform Backend API',
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatusMap[dbState] || 'Unknown',
      connected: isHealthy,
      databaseName: mongoose.connection.name || 'None',
    },
    uptime: process.uptime(),
  });
});

export default router;
