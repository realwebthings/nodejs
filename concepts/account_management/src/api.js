const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const validator = require("validator");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/myApp");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});



const User = mongoose.model("User", userSchema);

mongoose.connection.once('open', async () => {
  try {
    await User.collection.dropIndexes();
  } catch (err) {
    // Ignore if indexes don't exist
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Invalid username" });
    }
    
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

app.get("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

app.put("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;
    
    if (username !== undefined && (!username || username.trim() === "")) {
      return res.status(400).json({ message: "Invalid username" });
    }
    
    if (password !== undefined && (!password || password.length < 6)) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    if (email !== undefined && !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    
    const updates = {};
    if (username !== undefined) updates.username = username;
    if (password !== undefined) updates.password = password;
    if (email !== undefined) updates.email = email;
    
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

app.delete("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(404).json({ message: "User not found" });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: "User already exists" });
  }
  res.status(500).json({ error: err.message });
});

module.exports = { app, User };
