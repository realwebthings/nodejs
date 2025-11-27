import { MongoClient } from 'mongodb';

// BAD: Connect/close per request
async function getUser(id) {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect(); // Slow!
  
  const user = await client.db('test').collection('users').findOne({ _id: id });
  
  await client.close(); // Unnecessary!
  return user;
}

// This creates new connections every time - SLOW!