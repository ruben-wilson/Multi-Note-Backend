const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
  description: String,
  done: Boolean,
})

const goals = mongoose.model('goals', goalsSchema);

module.exports = goals;