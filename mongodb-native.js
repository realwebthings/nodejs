import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'testdb';

// Connect and use
const client = new MongoClient(url);

async function run() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('users');

  // Insert
  await collection.insertOne({ name: 'John', age: 30 });
  
  // Find
  const users = await collection.find({ age: { $gte: 18 } }).toArray();
  console.log(users);
  
  // Update
  await collection.updateOne({ name: 'John' }, { $set: { age: 31 } });
  
  // Delete
  await collection.deleteOne({ name: 'John' });
  
  await client.close();
}

run();