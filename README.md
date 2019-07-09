# yelpCamp

version 7
branch: v7refactorRoutes
new technology: refactor routes
technology: authentication (express-session, passportjs, passport-local, passport-local-mongoose), mongoose (mongodb, module.exports,  seeds), RESTful, bootstrap, nodejs, expressjs
4 terminals: mongod, nodemon, mongo for debug database, and 1 free terminal
---------------
Note: 
- (git) if we make a change in branch2, but not stage/commit, you will lose all the changes if you switch to other branches
- (mongoose) Cat.find returns array, whereas Cat.findById return 1 object
- (git) fastforward. seems like the master branch got fast forward due to no changes between merges. happens during v4. commit c2212c1..8baf3ef (8baf3efc44d94f08bfde541c0b794d5a7941558e)
---------------
YelpCamp: Refactoring Routes	Refactor the routes
- use pexress router to reorganize all routes {/routes/index.js…campgrounds.js…comments.js, pass params in comments.js}
