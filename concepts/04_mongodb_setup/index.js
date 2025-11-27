import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://mukeshkumar_db_user:4evJMFMyPS5SAkc5@learning-mongo.3zwstou.mongodb.net/?appName=learning-mongo";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        await client.db("admin").command({ ping: 1 });
        res.send('Connected to MongoDB!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Database connection failed');
    }
});

// Get all documents from a collection
app.get('/users', async (req, res) => {
    try {
        const db = client.db('myappdb');
        const users = await db.collection('users').find({}).toArray();
        console.log(users);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get one document by ID
app.get('/users/:id', async (req, res) => {
    try {
        const db = client.db('myappdb');
        const user = await db.collection('users').findOne({ _id: req.params.id });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new document
app.post('/users', async (req, res) => {
    try {
        const db = client.db('myappdb');
        const result = await db.collection('users').insertOne(req.body);
        res.json({ insertedId: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a document
app.put('/users/:id', async (req, res) => {
    try {
        const db = client.db('myapp');
        const result = await db.collection('users').updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.json({ modifiedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a document
app.delete('/users/:id', async (req, res) => {
    try {
        const db = client.db('myapp');
        const result = await db.collection('users').deleteOne({ _id: req.params.id });
        res.json({ deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        
        app.listen(4000, () => {
            console.log('Server running on port 4000');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();
