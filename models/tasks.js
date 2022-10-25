const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,
  date: String,
  time: String,
  urgency: Number
})

const tasks = mongoose.model('tasks', taskSchema);

module.exports = tasks;