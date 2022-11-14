const mongoose = require('mongoose');

const defaultsSchema = {
  time: String,
  type: String,
  description: String
}

const defaults = mongoose.model('defaults', defaultsSchema)

module.exports = defaults