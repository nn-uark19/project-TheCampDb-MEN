//==============================================
// import library
console.log('Begin app.js');
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//==============================================
// setup database
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
const Campground = mongoose.model('Campgrounds', campgroundSchema); 
/*
Campground.create({
  name:'Slough Creek Campground',
  image: 'https://www.fodors.com/wp-content/uploads/2019/02/fruita--975x650.jpg',
  description: 'Located at Yellowstone National Park, Wyoming'
}, function(err, campAdd){
  if (err){
    console.log(err);
  } else {
    console.log(campAdd);
  }
});
*/

//==============================================
// global variable

//==============================================
// listener server
app.listen(3000, function() {
  console.log('app.js is listeninig');
});
console.log('End app.js');

//==============================================
// (route 1): home page
app.get('/', function(req, res) {
  console.log('Route app.get(/)');
  res.render('landing');
})

// INDEX route (/campgrounds GET): index get
app.get('/campgrounds', function(req, res){
  console.log('Route app.get(/campgrounds)');
  Campground.find({}, function(err, allCamps){
    if (err) {
      console.log(err);
    } else {
      console.log(' Get data from mongoose successfully, render to campgrounds');
      res.render('index', {campgrounds: allCamps})
    }
  });
})

// NEW route (/campgrounds/new GET): to add campground, use post /campgrounds
app.get('/campgrounds/new', function(req, res){
  console.log('Route app.get(/campgrounds/new)');
  res.render('addCamp');
})

// CREATE route (/campgrounds POST): to insert data, redirect to get /campgrounds GET
app.post('/campgrounds', function(req, res){
  console.log('Route app.post(/campgrounds)');
  const newCamp = {name: req.body.name, image: req.body.image, description: req.body.description};
  Campground.create(newCamp, function(err, campAdd){
    if (err) {
      console.log(err);
    } else {
      console.log(' Add data to mongoose successfully, redirect');
      console.log(campAdd);
    }
  });
  res.redirect('/campgrounds');
})

// SHOW	route (/campgrounds/:id	GET)
app.get('/campgrounds/:id',function(req, res){
  console.log('Route app.get(/campgrounds/:id)');
  var idToBeFound = req.params.id;
  Campground.find({'_id':idToBeFound}, function(err, foundCamp){
    if (err) {
      console.log(err);
    } else {
      console.log(' Found campground with id, render to campgrounds');
      console.log(foundCamp);
      res.render("campgrounds", {camp: foundCamp});
    }
  })
});