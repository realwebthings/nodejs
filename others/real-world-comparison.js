// MONGOOSE - Clean & Feature-Rich
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

// Usage
const user = await User.findOne({ email: 'john@test.com' })
  .populate('posts')
  .select('-password');

// VS MONGODB NATIVE - More Code
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('test');

// Manual password hashing
const hashedPassword = await bcrypt.hash(password, 10);

// Manual insert with timestamps
await db.collection('users').insertOne({
  email: 'john@test.com',
  password: hashedPassword,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Manual population
const user = await db.collection('users').findOne({ email: 'john@test.com' });
const posts = await db.collection('posts').find({ userId: user._id }).toArray();
user.posts = posts;