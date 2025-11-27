// WHAT MONGODB NATIVE CAN'T DO

import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const users = client.db('test').collection('users');

// ❌ No automatic password hashing
await users.insertOne({
  name: 'John',
  password: 'plaintext123' // Oops! Not hashed
});

// ❌ No virtual fields
const user = await users.findOne({ name: 'John' });
// user.fullName doesn't exist

// ❌ No instance methods
// user.comparePassword() doesn't exist

// ❌ Manual population (relationships)
const posts = await client.db('test').collection('posts').find({ userId: user._id }).toArray();
// Must manually join data

// ❌ No automatic timestamps
await users.insertOne({
  name: 'Jane'
  // Must manually add createdAt, updatedAt
});

// ❌ Complex validation logic
// MongoDB schema validation is limited to basic rules
// No custom validation functions

await client.close();