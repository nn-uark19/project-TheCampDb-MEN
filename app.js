//==============================================
// import library
require('dotenv').config()
console.log('Begin app.js');
const express         = require('express'),
      bodyParser      = require('body-parser'),
      ejs             = require('ejs'),
      mongoose        = require('mongoose'),
      expressSession  = require('express-session'),
      passport        = require('passport'),
      LocalStrategy   = require('passport-local'),
      methodOverride  = require('method-override'),
      flash           = require('connect-flash'),
      app             = express();
// body-parser
app.use(bodyParser.urlencoded({extended: true}));
// ejs
app.set('view engine', 'ejs'); 
// custom css file
app.use(express.static(__dirname + '/public'));
// method-override
app.use(methodOverride('_method'));
// connect-flash
app.use(flash());
// moment js for time
app.locals.moment = require('moment');

//==============================================
// setup database. db model Campground, Comment was already declared in seeds.js
const Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  User = require('./models/user');
const dbUrl = process.env.DATABASEURL || 'mongodb://localhost:27017/yelp_camp';
mongoose.connect(dbUrl, {useNewUrlParser: true});
// const seedDb = require('./seeds');
// seedDb();

// ==============================================
// setup authentication
// setup express-session and passport
app.use(expressSession({
  secret: 'this string is used to encode/decode password',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// setup passport-local and passport Serialization to encode/decode
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==============================================
// global variable

//==============================================
// middleware for authentication, and flash message
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.msgError = req.flash('error');
  res.locals.msgSuccess = req.flash('success');
  next();
});

//==============================================
// listener server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log('app.js is listeninig');
});
console.log('End app.js');

//==============================================
// routes
// landing route
app.get('/', function (req, res) {
  console.log('Route app.get(/)');
  res.render('landing');
})
// camgrounds routes
const campgroudRoutes = require('./routes/campgroundRoutes');
app.use('/campgrounds', campgroudRoutes);
// comment routes
const commentRoutes = require('./routes/commentRoutes');
app.use('/campgrounds/:id/comments', commentRoutes);
// user routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

// routes in test
