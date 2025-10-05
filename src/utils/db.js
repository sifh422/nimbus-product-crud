import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw Object.assign(new Error('MONGODB_URI is not set in environment'), { statusCode: 500 });
  }

  // Align with Mongoose 8 defaults
  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    // options are mostly defaults in v8; keeping explicit for clarity
    autoIndex: true,
  });

  isConnected = true;
  console.log('MongoDB connected');
  return mongoose.connection;
}


