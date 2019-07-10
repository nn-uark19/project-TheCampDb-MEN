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

// middleware function, check if login
function isLoggedIn(req, res, next){
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

module.exports = router;