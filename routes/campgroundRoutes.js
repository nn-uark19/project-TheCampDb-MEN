const express = require('express');
// const router = express.Router({mergeParams: true});
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');
const NodeGeocoder = require('node-geocoder');

//==============================================
// setup node-geocoder
var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

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
  console.log(process.env.GEOCODER_API_KEY);
})

// NEW route (/campgrounds/new GET): to add campground, use post /campgrounds
router.get('/new', middleware.isLoggedIn, function (req, res) {
  console.log('Route_new app.get(/campgrounds/new)');
  res.render('./campgrounds/route_new');
})

// CREATE route (/campgrounds POST): to insert data, redirect to get /campgrounds GET
router.post('/', middleware.isLoggedIn, function (req, res) {
  console.log('Route_create app.post(/campgrounds)');
  // build newCamp object to insert to db
  const newCamp = req.body.newCamp;
  newCamp.author = {
    id: req.user._id,
    username: req.user.username
  };
  geocoder.geocode(req.body.newCamp.location, function(err, campLocation){
    if (err || !campLocation.length) {
      req.flash('error', 'Invalid Address');
      console.log(err.message);
      res.redirect('back');
    } else {
      newCamp.lat = campLocation[0].latitude;
      newCamp.lng = campLocation[0].longitude;
      newCamp.location = campLocation[0].formattedAddress;
      Campground.create(newCamp, function (err, newCamp) {
        if (err) {
          console.log(err);
        } else {
          console.log(' mongoose.create successfully, redirect to app.get(/campgrounds)');
          req.flash('success', 'Your campground has been successfully created!')
          res.redirect('/campgrounds');
        }
      });
    }
  })

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
router.get('/:id/edit', middleware.checkCampgroundOwner, function(req, res){
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
router.put('/:id', middleware.checkCampgroundOwner, function(req, res){
  console.log('Route app.put(/campgrounds/:id)');
  // find and update 
  Campground.findByIdAndUpdate(req.params.id, req.body.newCamp, function(err, updateCamp){
    if (err) {
      console.log('cannot find and update campground');
    } else {
      // redirect
      req.flash('success', 'Your Campground Has Been Updated!');
      res.redirect('/campgrounds/' + req.params.id);
    }
  })
})

// DESTROY route
router.delete('/:id', middleware.checkCampgroundOwner, function(req, res){
  console.log('Route app.delete(/campgrounds/:id)');
  Campground.findByIdAndRemove(req.params.id, function(err, removedCamp){
    if (err) {
      console.log(' cannot find and remove camp');
    } else {
      // remove related comments
      Comment.deleteMany({_id: {$in: removedCamp.comments}}, function(err, removedComment){
        if (err) {
          console.log(' cannot delete Many comments related to campground');
        } else {
          // redirect
          req.flash('success', 'Your Campground Has Been Deleted!');
          res.redirect('/campgrounds');
        }
      });
    }
  })
})

module.exports = router;