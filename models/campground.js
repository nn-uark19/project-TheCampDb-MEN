const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  lat: Number,
  lng: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
});

const Campground = mongoose.model('Campgrounds', campgroundSchema); 
module.exports = Campground;