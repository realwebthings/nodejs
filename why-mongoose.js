// MONGOOSE ADVANTAGES

// 1. MIDDLEWARE & HOOKS
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

// Pre-save hook (hash password)
userSchema.pre('save', function() {
  if (this.isModified('password')) {
    this.password = hashPassword(this.password);
  }
});

// 2. VIRTUAL FIELDS
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// 3. INSTANCE METHODS
userSchema.methods.comparePassword = function(password) {
  return compareHash(password, this.password);
};

// 4. STATIC METHODS
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

// 5. QUERY HELPERS
userSchema.query.byAge = function(age) {
  return this.where({ age: { $gte: age } });
};

const User = mongoose.model('User', userSchema);

// Usage is much cleaner
const user = new User({ name: 'John', email: 'john@test.com' });
await user.save(); // Triggers pre-save hook

const adults = await User.find().byAge(18); // Query helper