const mongoose = require('mongoose');

const queenSchema = new mongoose.Schema({
  simpleInfo: String,
  preview: String,
  location: String,
  price: Number,
  area: String,
  detail: [{
    type: Number,
    content: String
  }],
  comments: [String]
});

module.exports = mongoose.model('Queen', queenSchema);
