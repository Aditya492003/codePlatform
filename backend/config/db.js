import mongoose from 'mongoose';

/**
 * Connects to MongoDB Atlas using Mongoose
 */
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoUri, {
      // Modern mongoose defaults are optimal; connection pool and timeout settings can be added here
      serverSelectionTimeoutMS: 10000,
    });

    console.log(` MongoDB Atlas Connected: ${conn.connection.host} [DB: ${conn.connection.name}]`);

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Attempting reconnection...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected successfully');
    });

    return conn;
  } catch (error) {
    console.error(`❌ Failed to connect to MongoDB Atlas: ${error.message}`);
    process.exit(1);
  }
};
