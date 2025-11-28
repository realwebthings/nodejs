import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const MONGODB_URL = process.env.MONGODB_URL;
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};