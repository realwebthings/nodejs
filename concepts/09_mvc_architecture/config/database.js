import mongoose from 'mongoose';

const DB_URL = "mongodb+srv://mukeshkumar_db_user:4evJMFMyPS5SAkc5@learning-mongo.3zwstou.mongodb.net/mvcdb";

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};