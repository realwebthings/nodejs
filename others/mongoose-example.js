import mongoose from 'mongoose';

// Connect
await mongoose.connect('mongodb://localhost:27017/testdb');

// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  email: { type: String, unique: true }
});

// Model
const User = mongoose.model('User', userSchema);

// Create
const user = new User({ name: 'John', age: 30, email: 'john@test.com' });
await user.save();

// Find
const users = await User.find({ age: { $gte: 18 } });
console.log(users);

// Update
await User.updateOne({ name: 'John' }, { age: 31 });

// Delete
await User.deleteOne({ name: 'John' });

mongoose.disconnect();