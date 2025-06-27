const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
}).catch(err => console.error('❌ MongoDB connection failed:', err))