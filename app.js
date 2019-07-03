//==============================================
// import library
console.log('Begin app.js');
const express   =   require('express'),
      app       =   express(),
      mongoose  =   require('mongoose'),      
      bodyParser =  require('body-parser');
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//==============================================
// setup database
const Campground = require('./models/campgrounds');

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
  console.log('Route_index app.get(/campgrounds)');
  Campground.find({}, function(err, allCamps){
    if (err) {
      console.log(err);
    } else {
      console.log(' mongoose find successfully, render to route_index.ejs');
      res.render('route_index', {campgrounds: allCamps})
    }
  });
})

// NEW route (/campgrounds/new GET): to add campground, use post /campgrounds
app.get('/campgrounds/new', function(req, res){
  console.log('Route_new app.get(/campgrounds/new)');
  res.render('route_new');
})

// CREATE route (/campgrounds POST): to insert data, redirect to get /campgrounds GET
app.post('/campgrounds', function(req, res){
  console.log('Route_create app.post(/campgrounds)');
  const newCamp = {name: req.body.name, image: req.body.image, description: req.body.description};
  Campground.create(newCamp, function(err, campAdd){
    if (err) {
      console.log(err);
    } else {
      console.log(' mongoose.create successfully, redirect to /campgrounds');
      res.redirect('/campgrounds');
    }
  });
})

// SHOW	route (/campgrounds/:id	GET)
app.get('/campgrounds/:id',function(req, res){
  console.log('Route_show app.get(/campgrounds/:id)');
  var idToBeFound = req.params.id;
  Campground.find({'_id':idToBeFound}, function(err, foundCamp){
    if (err) {
      console.log(err);
    } else {
      console.log(' mongoose.find success, render to route_show.ejs');
      console.log(foundCamp);
      res.render("route_show", {camp: foundCamp});
    }
  })
});