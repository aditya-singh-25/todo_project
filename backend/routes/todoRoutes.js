const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const protect = require('../middleware/authMiddleware');

// Get all todos for the logged-in user
router.get('/', protect, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});

// Create a new todo for the logged-in user
router.post('/', protect, async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text, user: req.user.id });
  const saved = await todo.save();
  res.status(201).json(saved);
});

// Toggle todo completion status
router.patch('/:id', protect, async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
  if (!todo) return res.status(404).json({ error: 'Todo not found or not authorized' });
  todo.completed = !todo.completed;
  const updated = await todo.save();
  res.json(updated);
});

// Delete a todo
router.delete('/:id', protect, async (req, res) => {
  const deleted = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!deleted) return res.status(404).json({ error: 'Todo not found or not authorized' });
  res.json({ message: 'Deleted successfully' });
});

// Removed router.put('/:id') for editing
// Removed router.delete('/completed') for clearing completed

module.exports = router;