import { MongoClient } from 'mongodb';

// GOOD: Single connection with pool
const client = new MongoClient('mongodb://localhost:27017');
await client.connect(); // Once at startup

const db = client.db('test');
const users = db.collection('users');

// Fast requests - reuse connection
async function getUser(id) {
  return await users.findOne({ _id: id });
}

async function createUser(userData) {
  return await users.insertOne(userData);
}

// Close only on app shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});