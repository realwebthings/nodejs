import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const DB_URL = "mongodb+srv://mukeshkumar_db_user:4evJMFMyPS5SAkc5@learning-mongo.3zwstou.mongodb.net/prehooksdb";

const app = express();
app.use(express.json());

mongoose.connect(DB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// PRE HOOK - Runs BEFORE saving (create/save)
userSchema.pre('save', async function(next) {
    console.log('Pre save hook triggered');
    
    // METHOD 1: Throw error directly (stops execution)
    if (this.name && this.name.toLowerCase() === 'admin') {
        throw new Error('Cannot create user with name "admin"');
    }
    
    // METHOD 2: Pass error to next() callback
    if (this.password && this.password.length < 6) {
        return next(new Error('Password must be at least 6 characters'));
    }
    
    // METHOD 3: Create custom validation error
    if (this.email && !this.email.includes('@')) {
        const error = new Error('Invalid email format');
        error.name = 'ValidationError';
        return next(error);
    }
    
    // Hash password if it's modified
    if (this.isModified('password')) {
        console.log('Hashing password...');
        this.password = await bcrypt.hash(this.password, 10);
    }
    
    // Update timestamp
    this.updatedAt = new Date();
    next();
});

// PRE HOOK - Runs BEFORE finding documents
userSchema.pre('find', function() {
    console.log('Pre find hook triggered');
    // Add default sorting
    this.sort({ createdAt: -1 });
});

// PRE HOOK - Runs BEFORE updating documents
userSchema.pre('findOneAndUpdate', function() {
    console.log('Pre update hook triggered');
    
    // METHOD 4: Throw error in update hook
    const update = this.getUpdate();
    if (update.name === 'admin') {
        throw new Error('Cannot update name to "admin"');
    }
    
    // Auto-update the updatedAt field
    this.set({ updatedAt: new Date() });
});

// PRE HOOK - Runs BEFORE deleting documents
userSchema.pre('findOneAndDelete', function() {
    console.log('Pre delete hook triggered - User being deleted');
});

const User = mongoose.model('User', userSchema);

// Routes to test pre hooks
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // This will trigger the 'save' pre hook
        const user = new User({ name, email, password });
        await user.save();
        
        res.json({ message: 'User created', user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        // This will trigger the 'find' pre hook
        const users = await User.find({});
        res.json(users.map(user => ({ ...user.toObject(), password: undefined })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        // This will trigger the 'findOneAndUpdate' pre hook
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
        // This will trigger the 'findOneAndDelete' pre hook
        const user = await User.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'User deleted', user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
    console.log('Pre hooks example ready!');
});