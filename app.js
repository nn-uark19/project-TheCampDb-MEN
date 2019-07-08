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
  // passportLocalMongoose = require('passport-local-mongoose'),
  app = express();
// body-parser
app.use(bodyParser.urlencoded({ 
  extended: true
}));
// ejs
app.set('view engine', 'ejs'); 
// custom css file
app.use(express.static(__dirname + '/public'));

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
// (route 1): home page
app.get('/', function (req, res) {
  console.log('Route app.get(/)');
  res.render('landing');
})

//==============================================
// for campgrounds
// INDEX route (/campgrounds GET): index get
app.get('/campgrounds', function (req, res) {
  console.log('Route_index app.get(/campgrounds)');
  Campground.find({}, function (err, allCamps) {
    if (err) {
      console.log(' cannot find/connect database campgrounds');
    } else {
      res.render('./campgrounds/route_index', {
        campgrounds: allCamps
      })
    }
  });
})

// NEW route (/campgrounds/new GET): to add campground, use post /campgrounds
app.get('/campgrounds/new', function (req, res) {
  console.log('Route_new app.get(/campgrounds/new)');
  res.render('./campgrounds/route_new');
})

// CREATE route (/campgrounds POST): to insert data, redirect to get /campgrounds GET
app.post('/campgrounds', function (req, res) {
  console.log('Route_create app.post(/campgrounds)');
  const newCamp = req.body.newCamp;
  Campground.create(newCamp, function (err, campAdd) {
    if (err) {
      console.log(err);
    } else {
      console.log(' mongoose.create successfully, redirect to /campgrounds');
      res.redirect('/campgrounds');
    }
  });
})

// SHOW	route (/campgrounds/:id	GET)
app.get('/campgrounds/:id', function (req, res) {
  console.log('Route_show app.get(/campgrounds/:id)');
  var idToBeFound = req.params.id;
  Campground.findById({
      '_id': idToBeFound
    }).populate('comments')
    .exec(function (err, foundCamp) {
      if (err) {
        console.log(err);
      } else {
        console.log(' mongoose.find success, render to route_show.ejs');
        res.render("./campgrounds/route_show", {
          camp: foundCamp
        });
      }
    });
});

//==============================================
// for comments
// NEW route
app.get('/campgrounds/:id/comments/new', isLoggedIn, function (req, res) {
  console.log(req);
  console.log('Route app.get(/campgrouds/:id/comments/new)');
  Campground.findById(req.params.id, function (err, foundCamp) {
    if (err) {
      console.log('Cannot find camp');
    } else {
      res.render('./comments/route_new', {
        camp: foundCamp
      });
    }
  })
});

// CREATE route
app.post('/campgrounds/:id/comments', isLoggedIn, function (req, res) {
  console.log('Route app.post(/campgrouds/:id/comments/)');
  // get comment
  Comment.create(req.body.newComment, function (err, newComment) {
    if (err) {
      console.log('Cannot create comment from form');
    } else {
      // find the campground
      Campground.findById(req.params.id, function (err, foundCamp) {
        if (err) {
          console.log('Cannot find camp');
        } else {
          // associate comment with camp
          foundCamp.comments.push(newComment);
          foundCamp.save(function (err, updatedCamp) {
            if (err) {
              console.log('Cannot save comment to campground');
            } else {
              // redirect
              console.log('Comment added successfully, redirect to /campgrounds/:id');
              res.redirect('/campgrounds/' + updatedCamp._id);
            }
          });
        }
      })
    }
  })
});

//==============================================
// for user
// NEW route
app.get('/register', function(req, res){
  console.log('Route app.get(/register)');
  res.render('./profile/route_register');
});

// CREATE route
app.post('/register', function(req, res){
  console.log('Route app.post(/register)');
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, newUser){
    if (err) {
      console.log('Cannot create new User');
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/campgrounds');
    });
  });
});

// login route- show
app.get('/login', function(req, res){
  console.log('Route app.get(/login)');
  res.render('./profile/route_login');
});

// login route- check
app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function(req, res){
  console.log('Route app.post(/login)');
  res.send('login post route');
});

// logout route
app.get('/logout', function(req, res){
  console.log('Route app.get(/logout)');
  req.logOut();
  res.redirect('/campgrounds');
});

// middleware function, check if login
function isLoggedIn(req, res, next){
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};