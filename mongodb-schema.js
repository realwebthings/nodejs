import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('test');

// Create collection with schema validation
await db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'age'],
      properties: {
        name: {
          bsonType: 'string',
          minLength: 2,
          maxLength: 50
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        },
        age: {
          bsonType: 'int',
          minimum: 0,
          maximum: 120
        }
      }
    }
  },
  validationAction: 'error' // or 'warn'
});

const users = db.collection('users');

// Valid insert
try {
  await users.insertOne({
    name: 'John',
    email: 'john@test.com',
    age: 30
  });
  console.log('✅ Valid user inserted');
} catch (error) {
  console.log('❌ Validation failed:', error.message);
}

// Invalid insert (will fail)
try {
  await users.insertOne({
    name: 'A', // Too short
    email: 'invalid-email',
    age: -5 // Invalid age
  });
} catch (error) {
  console.log('❌ Validation failed:', error.message);
}

await client.close();