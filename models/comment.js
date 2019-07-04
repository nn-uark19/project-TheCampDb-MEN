const mongoose = require('mongoose');

commentSchema = new mongoose.Schema({
  author: String,
  text: String
});

Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

