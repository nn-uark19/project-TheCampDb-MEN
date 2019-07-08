const mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
userSchema.plugin(passportLocalMongoose);

User = mongoose.model('User', userSchema);
module.exports = User;