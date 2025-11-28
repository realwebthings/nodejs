const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your-secret-key';
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password';

// POST /login - User authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check credentials
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // Generate JWT with username as payload
        const token = jwt.sign({ username }, SECRET_KEY);
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// GET /secret - Protected route
app.get('/secret', (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    
    try {
        // Verify JWT with secret key
        const decoded = jwt.verify(token, SECRET_KEY);
        res.send('Welcome to the secret area');
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`JWT Auth server running on port ${PORT}`);
});