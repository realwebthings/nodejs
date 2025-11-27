import User from '../models/User.js';
import {
    formatUserResponse,
    formatUsersListResponse,
    formatErrorResponse,
    formatSuccessResponse
} from '../views/userView.js';

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        const formattedResponse = formatUsersListResponse(users);
        res.json(formatSuccessResponse(formattedResponse, 'Users retrieved successfully'));
    } catch (error) {
        res.status(500).json(formatErrorResponse(error, 500));
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json(formatErrorResponse(new Error('User not found'), 404));
        }
        const formattedUser = formatUserResponse(user);
        res.json(formatSuccessResponse(formattedUser, 'User retrieved successfully'));
    } catch (error) {
        res.status(500).json(formatErrorResponse(error, 500));
    }
};

// Create new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        
        const formattedUser = formatUserResponse(user);
        res.status(201).json(formatSuccessResponse(formattedUser, 'User created successfully'));
    } catch (error) {
        res.status(400).json(formatErrorResponse(error, 400));
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};