const express = require('express');
// const router = express.Router({mergeParams: true});
const router = express.Router();
const Campground = require('../models/campground');

//==============================================
// for campgrounds
// INDEX route (/campgrounds GET): index get
router.get('/', function (req, res) {
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
router.get('/new', isLoggedIn, function (req, res) {
  console.log('Route_new app.get(/campgrounds/new)');
  res.render('./campgrounds/route_new');
})

// CREATE route (/campgrounds POST): to insert data, redirect to get /campgrounds GET
router.post('/', isLoggedIn, function (req, res) {
  console.log('Route_create app.post(/campgrounds)');
  const newCamp = req.body.newCamp;
  newCamp.author = {
    id: req.user._id,
    username: req.user.username
  };
  Campground.create(newCamp, function (err, newCamp) {
    if (err) {
      console.log(err);
    } else {
      console.log(' mongoose.create successfully, redirect to app.get(/campgrounds)');
      res.redirect('/campgrounds');
    }
  });
})

// SHOW	route (/campgrounds/:id	GET)
router.get('/:id', function (req, res) {
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

// EDIT route
router.get('/:id/edit', checkCampgroundOwner, function(req, res){
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
router.put('/:id', checkCampgroundOwner, function(req, res){
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
router.delete('/:id', checkCampgroundOwner, function(req, res){
  console.log('Route app.delete(/campgrounds/:id)');
  Campground.findByIdAndRemove(req.params.id, function(err, removedCamp){
    if (err) {
      console.log(' cannot find and remove camp');
    } else {
      // remove related comments
      Comment.deleteMany({_id: {$in: removedCamp.comments}}, function(err, removedComment){
        if (err) {
          console.log(' cannot deleteMany comments related to campground');
        } else {
          // redirect
          res.redirect('/campgrounds');
        }
      });
    }
  })
})

// middleware function, check if login
function isLoggedIn(req, res, next){
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

function checkCampgroundOwner(req, res, next) {
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(' cannot find campgrounds');
    } else {
      // check if login 
      if (!req.isAuthenticated()) {
        return res.redirect('/login');
      } else {
        // check if logged-in user is the owner
        if (!foundCampground.author.id.equals(req.user._id)){
          console.log(' not owner of the campground - cannot edit/delete');
          res.redirect('back');
        } else {
          next();
        }
      }
    }
  });
}

module.exports = router;