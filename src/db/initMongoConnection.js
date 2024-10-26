// mongodb+srv://Serhii:<db_password>@cluster0.7ask1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import { env } from '../utils/env.js';
import mongoose from 'mongoose';

export const initMongoDB = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0
import { env } from '../utils/env';`);
    console.log('MongoDB connection successfully ');
  } catch (error) {
    console.log(`Error connect database with message ${error.message}`);
    throw error;
  }
};
