import express from 'express';
import { connectDB } from './config/database.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'MVC Architecture Example',
        endpoints: {
            'GET /api/users': 'Get all users',
            'GET /api/users/:id': 'Get user by ID',
            'POST /api/users': 'Create new user',
            'PUT /api/users/:id': 'Update user',
            'DELETE /api/users/:id': 'Delete user'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('MVC Architecture Example ready!');
});