# yelpCamp

version 8
- branch: v8commentUser
- new technology: data associations (refer user inside comment)
- technology: 
	* authentication (express-session, passportjs, passport-local, passport-local-mongoose), 
	* mongoose (mongodb, module.exports,  seeds), 
	* RESTful routes, bootstrap, nodejs, expressjs
- 4 terminals: mongod, nodemon, mongo for debug database, and 1 free terminal
---------------
Note: 
- (git) if we make a change in branch2, but not stage/commit, you will lose all the changes if you switch to other branches
- (mongoose) Cat.find returns array, whereas Cat.findById return 1 object
- (git) fastforward. seems like the master branch got fast forward due to no changes between merges. happens during v4. commit c2212c1..8baf3ef (8baf3efc44d94f08bfde541c0b794d5a7941558e)
---------------
YelpCamp: User Associations: Comment. Users + Comments
- associate users and comments {
 + change commentSchema…author has id- Referencing data and username
 + change comment route router.post(/)
 + remove author field from the form /views/comments/new.ejs}
- save author’s name to a comment automactically
