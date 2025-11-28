import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
app.use(express.json());

mongoose.connect(MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    loginCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// POST HOOK - Runs AFTER saving (create/save)
userSchema.post('save', function(doc, next) {
    console.log('Post save hook triggered for user:', doc.name);
    
    // Log user creation
    console.log(`New user created: ${doc.name} (${doc.email})`);
    
    // Send welcome email (simulation)
    console.log(`Sending welcome email to ${doc.email}`);
    
    // Update analytics (simulation)
    console.log('Updating user analytics...');
    
    next();
});

// POST HOOK - Runs AFTER finding documents
userSchema.post('find', function(docs, next) {
    console.log(`Post find hook triggered - Found ${docs.length} users`);
    
    // Log search activity
    console.log('Logging search activity...');
    
    next();
});

// POST HOOK - Runs AFTER updating documents
userSchema.post('findOneAndUpdate', function(doc, next) {
    console.log('Post update hook triggered for user:', doc?.name);
    
    if (doc) {
        // Log update activity
        console.log(`User updated: ${doc.name} at ${new Date()}`);
        
        // Send notification (simulation)
        console.log(`Sending update notification to ${doc.email}`);
    }
    
    next();
});

// POST HOOK - Runs AFTER deleting documents
userSchema.post('findOneAndDelete', function(doc, next) {
    console.log('Post delete hook triggered');
    
    if (doc) {
        // Log deletion
        console.log(`User deleted: ${doc.name} (${doc.email})`);
        
        // Cleanup related data (simulation)
        console.log('Cleaning up user related data...');
        
        // Send goodbye email (simulation)
        console.log(`Sending account deletion confirmation to ${doc.email}`);
    }
    
    next();
});

// POST HOOK with error handling
userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        console.log('Duplicate email error handled in post hook');
        next(new Error('Email already exists'));
    } else {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

// Routes to test post hooks
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // This will trigger the 'save' post hook
        const user = new User({ name, email, password });
        await user.save();
        
        res.json({ message: 'User created', user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        // This will trigger the 'find' post hook
        const users = await User.find({});
        res.json(users.map(user => ({ ...user.toObject(), password: undefined })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        // This will trigger the 'findOneAndUpdate' post hook
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json({ message: 'User updated', user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        // This will trigger the 'findOneAndDelete' post hook
        const user = await User.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'User deleted', user: user ? { ...user.toObject(), password: undefined } : null });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
    console.log('Post hooks example ready!');
});