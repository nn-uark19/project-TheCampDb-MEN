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
    description: 'Located at Yellowstone National Park, Wyoming, Slough Creek, a popular Yellowstone fishing spot, is where you’ll find the park’s best campground. Slough Creek Campground is small—there are just 16 sites, only 14 of which are large enough to accommodate an RV—but it’s located in the heart of the Lamary Valley, one of the best places for viewing wildlife in the park. The most primitive of Yellowstone’s campgrounds and sites, the accommodations are distributed among the banks of the stream, meadowland, and forest. Space is available on a first-come first serve basis from May to October. When the sun goes down, listen closely—you may be able to hear Slough Creek’s wolf pack baying.'
  }, {
    name: 'Fruita Campground',
    image: 'https://www.fodors.com/wp-content/uploads/2019/02/wonder-lake--768x512.jpg',
    description: 'Located at Capitol Reef National Park, Utah, Capitol Reef National Park is known for its cliffs and canyons of red rock, which makes Fruita Campground something of an anomaly. Fed by the Fremont River, which rolls along the campground’s edge, Fruita is literally an oasis in the desert, surrounded by the cool, green shade of historic orchards. During the peak season, most of the 64-tent/RV sites and seven walk-in sites, complete with flushing toilets, running water, and fire pits or grills, can be reserved; during off-season they switch to a first-come first-serve system.'
  }, {
    name: 'Wonder Lake Campground',
    image: 'https://www.fodors.com/wp-content/uploads/2019/02/pinon-flats--768x512.jpg',
    description: 'Located at Denali National Park, Alaska, The shadow of Denali National Park’s namesake, the Denali peak (AKA Mount McKinley), looms over this lakeside campground. Wonder Lake Campground is wholly primitive; flush toilets and potable water are only available in the summer when the mosquitos are at their most fierce. The rest of the year, vault toilets and bear boxes are the only amenities available and fires are never allowed. But the views from Wonder Lake Campground are truly unbeatable, from the waterfowl that call the lake home and the moose that occasionally pass through, to North America’s highest peak—so close you feel you can almost reach out and touch it.'
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
                // Comment.create({
                //   author: 'Nghia Nguyen',
                //   text: 'This place is great but I wish it had Wifi here'
                // },function(err, createdComment){
                //   if (err) {
                //     console.log('Cannot add to comment collection');
                //   } else {
                //     console.log('Added to comment collection');
                //     // save the new comment to camp using reference
                //     createdCamp.comments.push(createdComment);
                //     createdCamp.save(function(err, updatedCamp){
                //       if (err) {
                //         console.log('Cannot refer comment to campground');
                //       } else {
                //         console.log('Success refer comment to campground');
                //       }
                //     })
                //   }
                // });
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