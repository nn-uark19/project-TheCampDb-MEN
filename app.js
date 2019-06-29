// import library
console.log('Begin app.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// global variable
var camps = [
  {name: 'Slough Creek Campground', image: 'https://www.fodors.com/wp-content/uploads/2019/02/fruita--975x650.jpg'},
  {name: 'Fruita Campground', image: 'https://www.fodors.com/wp-content/uploads/2019/02/wonder-lake--975x650.jpg'},
  {name: 'Wonder Lake Campground', image: 'https://www.fodors.com/wp-content/uploads/2019/02/pinon-flats--975x650.jpg'},
  {name: 'Slough Creek Campground', image: 'https://www.fodors.com/wp-content/uploads/2019/02/fruita--975x650.jpg'},
  {name: 'Fruita Campground', image: 'https://www.fodors.com/wp-content/uploads/2019/02/wonder-lake--975x650.jpg'},
  {name: 'Wonder Lake Campground', image: 'https://www.fodors.com/wp-content/uploads/2019/02/pinon-flats--975x650.jpg'},{name: 'Slough Creek Campground', image: 'https://www.fodors.com/wp-content/uploads/2019/02/fruita--975x650.jpg'},
  {name: 'Fruita Campground', image: 'https://www.fodors.com/wp-content/uploads/2019/02/wonder-lake--975x650.jpg'},
  {name: 'Wonder Lake Campground', image: 'https://www.fodors.com/wp-content/uploads/2019/02/pinon-flats--975x650.jpg'}
]

// route 1: home page
app.get('/', function(req, res) {
  console.log('Route app.get(/)');
  res.render('landing');
})

// route 2: campgrounds get
app.get('/campgrounds', function(req, res){
  console.log('Route app.get(/campgrounds)');
  res.render('campgrounds', {campgrounds: camps});
})

// route 3: campgrounds post, to insert data, redirect to get /campgrounds
app.post('/campgrounds', function(req, res){
  console.log('Route app.post(/campgrounds)');
  const newCamp = {name: req.body.name, image: req.body.image};
  camps.push(newCamp);
  res.redirect('/campgrounds');
})

// route 4: to add campground, use post /campgrounds
app.get('/campgrounds/new', function(req, res){
  console.log('Route app.get(/campgrounds/new)');
  res.render('addCamp');
})

// listener server
app.listen(3000, function() {
  console.log('app.js is listeninig');
});
console.log('End app.js');