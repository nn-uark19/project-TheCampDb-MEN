//==============================================
// import library
console.log('Begin app.js');
const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  seedDb = require('./seeds');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//==============================================
// setup database. db model Campground, Comment was already declared in seeds.js
// seedDb();

//==============================================
// global variable

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

// INDEX route (/campgrounds GET): index get
app.get('/campgrounds', function (req, res) {
  console.log('Route_index app.get(/campgrounds)');
  Campground.find({}, function (err, allCamps) {
    if (err) {
      console.log(err);
    } else {
      console.log(' mongoose find successfully, render to route_index.ejs');
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
// (for comments)
app.get('/campgrounds/:id/comments/new', function (req, res) {
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

app.post('/campgrounds/:id/comments', function (req, res) {
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