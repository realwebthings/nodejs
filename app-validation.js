import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('test');
const users = db.collection('users');

// Simple validation function
function validateUser(user) {
  const errors = [];
  
  if (!user.name || user.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!user.email || !user.email.includes('@')) {
    errors.push('Valid email required');
  }
  
  if (!user.age || user.age < 0 || user.age > 120) {
    errors.push('Age must be between 0 and 120');
  }
  
  return errors;
}

// Create user with validation
async function createUser(userData) {
  const errors = validateUser(userData);
  
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`);
  }
  
  return await users.insertOne(userData);
}

// Test
try {
  await createUser({ name: 'John', email: 'john@test.com', age: 30 });
  console.log('✅ User created');
} catch (error) {
  console.log('❌', error.message);
}

await client.close();