const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  // 💥 IMPORTANT: Added the 'user' field to link a Todo to a User
  user: {
    type: mongoose.Schema.Types.ObjectId, // This specifies it's a MongoDB ObjectId
    ref: 'User', // This tells Mongoose that this ObjectId refers to the 'User' model
    required: true // Ensures that every todo must belong to a user
  }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);