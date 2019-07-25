const mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  // basic information
  username: String,
  password: String,

  // profile
  // firstname: String,
  // lastname: String,
  // email: String,
  // avatar: String,

  // user data
  campByUser: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campground'
  }],
  commentByUser: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  // admin
  isAdmin: {
    type: Boolean,
    default: false
  }
});
userSchema.plugin(passportLocalMongoose);

User = mongoose.model('User', userSchema);
module.exports = User;