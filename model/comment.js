var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  added: Date,
  text: String,
  user: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Comment', schema);