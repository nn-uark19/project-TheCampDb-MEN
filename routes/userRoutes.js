const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

//==============================================
// for user
// NEW route
router.get('/register', function(req, res){
  console.log('Route app.get(/register)');
  res.render('./profile/route_register');
});

// CREATE route
router.post('/register', function(req, res){
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
router.get('/login', function(req, res){
  console.log('Route app.get(/login)');
  res.render('./profile/route_login');
});

// login route- check
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function(req, res){
  console.log('Route app.post(/login)');
  res.send('login post route');
});

// logout route
router.get('/logout', function(req, res){
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

module.exports = router;