const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,
  urgency: Number,
})

const tasks = mongoose.model('tasks', taskSchema);

module.exports = tasks;