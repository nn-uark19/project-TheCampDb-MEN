//==============================================
// import library
console.log('Begin app.js');
const express = require('express'),
  bodyParser = require('body-parser'),
  ejs = require('ejs'),
  mongoose = require('mongoose'),
  expressSession = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  app = express();
// body-parser
app.use(bodyParser.urlencoded({ 
  extended: true
}));
// ejs
app.set('view engine', 'ejs'); 
// custom css file
app.use(express.static(__dirname + '/public'));
// method-override
app.use(methodOverride('_method'));

//==============================================
// setup database. db model Campground, Comment was already declared in seeds.js
const Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  User = require('./models/user');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true
});
// const seedDb = require('./seeds');
// seedDb();

// ==============================================
// setup authentication
// setup express-session and passport
app.use(expressSession({
  secret: 'this string is used to encode/decode password',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// setup passport-local and passport Serialization to encode/decode
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==============================================
// global variable

//==============================================
// middleware for authentication
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//==============================================
// listener server
app.listen(3000, function () {
  console.log('app.js is listeninig');
});
console.log('End app.js');

//==============================================
// landing route
app.get('/', function (req, res) {
  console.log('Route app.get(/)');
  res.render('landing');
})
// camgrounds routes
const campgroudRoutes = require('./routes/campgroundRoutes');
app.use('/campgrounds', campgroudRoutes);
// comment routes
const commentRoutes = require('./routes/commentRoutes');
app.use('/campgrounds/:id/comments', commentRoutes);
// user routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

// routes in test
// EDIT route
app.get('/campgrounds/:id/edit', function(req, res){
  console.log('Route app.get(/campgrounds/:id/edit)');
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(' cannot find campgrounds');
    } else {
      res.render('./campgrounds/route_edit', {camp: foundCampground});
    }
  });
})
// UPDATE route
app.put('/campgrounds/:id', function(req, res){
  console.log('Route app.put(/campgrounds/:id)');
  // find and update 
  Campground.findByIdAndUpdate(req.params.id, req.body.newCamp, function(err, updateCamp){
    if (err) {
      console.log('cannot find and update campground');
    } else {
      // redirect
      res.redirect('/campgrounds/' + req.params.id);
    }
  })
})

// DESTROY route
app.delete('/campgrounds/:id', function(req, res){
  console.log('Route app.delete(/campgrounds/:id)');
  res.send('destroy campground');
})