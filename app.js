// import library
console.log('Begin app.js');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

// route 1: home page
app.get('/', function(req, res) {
  res.render('landing');
})

// route 2: campgrounds
app.get('/campgrounds', function(req, res){
  res.render('campgrounds');
})

// listener server
app.listen(3000, function() {
  console.log('app.js is listeninig');
});
console.log('End app.js');