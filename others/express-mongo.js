import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());

// Connect once at startup
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('test');

// Routes reuse the connection
app.get('/users/:id', async (req, res) => {
  const user = await db.collection('users').findOne({ _id: req.params.id });
  res.json(user);
});

// Setup collection with validation
const setupValidation = async () => {
  try {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'email'],
          properties: {
            name: { bsonType: 'string', minLength: 2 },
            email: { bsonType: 'string', pattern: '^[^@]+@[^@]+\.[^@]+$' },
            age: { bsonType: 'int', minimum: 0 }
          }
        }
      }
    });
  } catch (error) {
    // Collection might already exist
  }
};

await setupValidation();

app.post('/users', async (req, res) => {
  try {
    const result = await db.collection('users').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running with persistent MongoDB connection');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});