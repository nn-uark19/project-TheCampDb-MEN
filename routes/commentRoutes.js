const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Campground = require('../models/campground')

//==============================================
// for comments
// NEW route
router.get('/new', isLoggedIn, function (req, res) {
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
router.post('/', isLoggedIn, function (req, res) {
  console.log('Route app.post(/campgrouds/:id/comments/)');
  // get comment and associate comment with user
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  const newComment = {
    text: req.body.newComment,
    author: author
  }
  // create comment
  Comment.create(newComment, function (err, newComment) {
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

// middleware function, check if login
function isLoggedIn(req, res, next){
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

module.exports = router;