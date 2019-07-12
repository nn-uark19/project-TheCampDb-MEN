const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Campground = require('../models/campground');
const middleware = require('../middleware');

//==============================================
// NEW route
router.get('/new', middleware.isLoggedIn, function (req, res) {
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
router.post('/', middleware.isLoggedIn, function (req, res) {
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
              req.flash('success', 'Your Comment Has Been Created!');
              res.redirect('/campgrounds/' + updatedCamp._id);
            }
          });
        }
      })
    }
  })
});

//==============================================
// edit - show form
router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
  console.log('Route app.get(/campgrounds/:id/comments/:comment_id/edit)');
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if (err) {
        console.log(' cannot find comment');
        res.redirect('back');
      } else {        
        res.render('comments/route_edit', {comment: foundComment, campId: req.params.id});
      }
    });
});
// update
router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
  console.log('Route app.put(/campgrounds/:id/comments/:comment_id)');
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.newComment, function(err, updatedComment){
    if (err) {
      console.log(' cannot find and update comment');
      res.redirect('back');
    } else {
      req.flash('success', 'Your Comment Has Been Updated!');
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

//==============================================
// delete
router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
  console.log('Route app.delete(/campgrounds/:id/comments/:comment_id');
  // remove equivalent comment in campground db
  Campground.findById(req.params.id, function(err, foundCamp){
    if (err) {
      console.log(' cannot find campground having the equivalent comment');
      res.redirect('back');
    } else {
      var commentIdex = foundCamp.comments.indexOf(req.params.comment_id);
      foundCamp.comments.splice(commentIdex, 1);
      foundCamp.save();
    }
  });
    // remove comment
    Comment.findByIdAndRemove(req.params.comment_id, function(err, removedComment){
      if (err) {
        console.log(' cannot find by id and remove comment');
        res.redirect('back');
      } else {
        req.flash('success', 'Your Comment Has Been Deleted!');
        res.redirect('/campgrounds/' + req.params.id);
      }
    });
});

module.exports = router;