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
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function(){
      req.flash('success', 'Your Account Has Been Created! Welcome to YelpCamp '+ newUser.username);
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
  req.flash('success', 'You successfully logged out!');
  res.redirect('/campgrounds');
});

module.exports = router;