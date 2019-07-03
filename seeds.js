console.log('Begin seeds.js');

//-------------------------------------
// package include
const mongoose = require('mongoose');

//-------------------------------------
// setup db
Campground = require('./models/campground');
Comment = require('./models/comment');


//-------------------------------------
// fake data
data = [
  {
    name:'Slough Creek Campground',
    image: 'https://www.fodors.com/wp-content/uploads/2019/02/fruita--975x650.jpg',
    description: 'Located at Yellowstone National Park, Wyoming'
  }, {
    name: 'Fruita Campground',
    image: 'https://www.fodors.com/wp-content/uploads/2019/02/wonder-lake--768x512.jpg',
    description: 'Located at Capitol Reef National Park, Utah'
  }, {
    name: 'Wonder Lake Campground',
    image: 'https://www.fodors.com/wp-content/uploads/2019/02/pinon-flats--768x512.jpg',
    description: 'Located at Denali National Park, Alaska'
  }
];

//-------------------------------------
// put fake data in collections
function seedDb() {
  // delete campmgrounds
  Campground.remove({}, function(err){
    if (err) {
      console.log('Cannot delete records in campgrounds collections');
    } else {
      console.log('Deleted all records of campgrounds collections');
      // delete comments
      Comment.remove({}, function(err){
        if (err) {
          console.log('Cannot delete records in comments collections');
        } else {
          console.log('Deleted all records in comments collections');
          // add data to campgrounds
          data.forEach(function(seed) {
            Campground.create(seed, function(err, createdCamp){
              if (err) {
                console.log('Cannot add to campgrounds collection');
              } else {
                console.log(`Added ${createdCamp.name} to campgrounds collection`);
                // add comment to campground
                Comment.create({
                  author: 'Nghia Nguyen',
                  text: 'This place is great but I wish it had Wifi here'
                },function(err, createdComment){
                  if (err) {
                    console.log('Cannot add to comment collection');
                  } else {
                    console.log('Added to comment collection');
                    // save the new comment to camp using reference
                    createdCamp.comments.push(createdComment);
                    createdCamp.save(function(err, updatedCamp){
                      if (err) {
                        console.log('Cannot refer comment to campground');
                      } else {
                        console.log('Success refer comment to campground');
                      }
                    })
                  }
                });
              }
            });
          });


        }
      });
    }
  });
}

module.exports = seedDb;



console.log('End seeds.js');