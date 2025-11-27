// MONGODB NATIVE - Direct queries
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const collection = client.db('test').collection('users');

await collection.insertOne({ 
  name: 'Alice', 
  age: 25, 
  tags: ['developer', 'nodejs'] 
});

// MONGOOSE - Schema-based
import mongoose from 'mongoose';

await mongoose.connect('mongodb://localhost:27017/test');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  tags: [String]
});

const User = mongoose.model('User', userSchema);

await User.create({ 
  name: 'Bob', 
  age: 28, 
  tags: ['designer', 'react'] 
});

console.log('Both approaches work!');