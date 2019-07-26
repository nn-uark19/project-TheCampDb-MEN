const mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  // basic
  username: String,
  password: String,
  // profile
  firstname: String,
  lastname: String,
  email: String,
  avatar: String,
  // admin
  isAdmin: {
    type: Boolean,
    default: false
  }
});
userSchema.plugin(passportLocalMongoose);

User = mongoose.model('User', userSchema);
module.exports = User;