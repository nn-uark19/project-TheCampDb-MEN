const Campground = require('../models/campground');

var middleware = {};

// isLoggedIn, used in campgroundsRoutes.js, commentRoutes.js
middleware.isLoggedIn = function(req, res, next){
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'Please Login First!');
  res.redirect('/login');
};

// checkCampgroundOwner, used in campgroundsRoutes.js
middleware.checkCampgroundOwner = function(req, res, next) {
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(' cannot find campgrounds');
    } else {
      // check if login 
      if (!req.isAuthenticated()) {
        req.flash('error', 'Please Login First!');
        return res.redirect('/login');
      } else {
        // check if logged-in user is the owner
        if (!foundCampground.author.id.equals(req.user._id)){
          console.log(' not owner of the campground - cannot edit/delete');
          req.flash('error', "You Don't Have The Authorization To Perform The Action!");
          res.redirect('back');
        } else {
          next();
        }
      }
    }
  });
}

// checkCommentOwner, used in commentRoutes.js
middleware.checkCommentOwner = function (req, res, next) {
  // check if login
  if (!req.isAuthenticated()) {
    console.log(' plz login');
    req.flash('error', 'Please Login First!');
    return res.redirect('back');
  } else {
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if (err) {
        console.log(' cannot find comment');
        res.redirect('back');
      } else {
        // check if own
        if (!foundComment.author.id.equals(req.user._id)) {
          console.log(' Comment is not owned by this user');
          req.flash('error', "You Don't Have The Authorization To Perform The Action!");
          res.redirect('back');
        } else {
          next();
        }
      }
    });
  }
};

module.exports = middleware;