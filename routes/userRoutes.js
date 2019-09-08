const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const ADMIN_CODE = 'secretCode';

//==============================================
// for user
// NEW route
router.get('/register', function(req, res){
  console.log('Route app.get(/register)');
  res.render('./profile/route_register', {page: 'register'});
});

// CREATE route
router.post('/register', function(req, res){
  console.log('Route app.post(/register)');
  var newUser = new User(req.body.newUser);
  if (req.body.adminCheck === ADMIN_CODE) {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function(err, newUser){    
    if (err) {
      console.log('Cannot create new User');
      req.flash('error', err.message);
      res.redirect('/register');
    }
    req.login(newUser, function(err){
      if (err) {
        console.log('Cannot create new User');
        req.flash('error', err.message);
        return res.redirect('back');
      }
      req.flash('success', 'Your Account Has Been Created! Welcome to TheCampDB '+ newUser.username);
      res.redirect('/campgrounds');
    });
  });
});


// login route- show
router.get('/login', function(req, res){
  console.log('Route app.get(/login)');
  res.render('./profile/route_login', {page: 'login'});
});

// login route- check
router.post('/login', passport.authenticate('local', {
  successFlash: 'Welcome back! You have successfully log in!',
  failureFlash: 'Invalid username or password.',
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