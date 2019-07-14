# yelpCamp

---------------------------------------------
Notice: 
- (git) if we make a change in branch2, but not stage/commit or already commit but not push, you will lose all the changes if you switch to other branches
- (mongoose) Cat.find returns array, whereas Cat.findById return 1 object
- (git) fastforward. seems like the master branch got fast forward due to no changes between merges. happens during v4. commit c2212c1..8baf3ef (8baf3efc44d94f08bfde541c0b794d5a7941558e)
- (req.user vs currentUser) 
	+ the ejs files {like /view/partials/header.ejs or views/campgrounds/show.ejs} can access currentUser but not req.user
	+ Vice versa, the js routes/files (like /routes/campgroundRoutes.js) can access req.user but not currentUser
- useful redirect: res.redirect('back');
- notice the EDIT/UPDATE route (name in form needs to match the schema of the mongoose db that needs to be updated)
---------------------------------------------
TECHNIQUES
	* flash message (connect-flash) using express-session
	* authorization using middleware, hiding buttons, refactor middleware
	* authentication using express-session, passportjs, passport-local, passport-local-mongoose (register, login, logout)
 	* mongoose (schema, connect mongodb, refactor, seed file seeds.js), data associations(change schema, req.user, save author’s name to a campground, comment automactically)
	* RESTful routes (INDEX, NEW, CREATE, SHOW, EDIT, UPDATE, DESTROY)
	* nodejs, expressjs routes (sub-route /campgrounds/comments), expressjs template ejs, expressjs partials template (header.ejs, footer.ejs), expressjs refactor routes
	* html, css (bootstrap)
---------------
	* refactor middleware, flash message (connect-flash) (v11)
	* campgrounds and comment RESTful routes (EDIT, UPDATE, DESTROY), authorization using middleware, hiding buttons (v10)
	* data associations between users and campgrounds (change schema, req.user, save author’s name to a campgroundautomactically) (v9)
	* data associations between users and comments (change schema, req.user, save author’s name to a comment automactically) (v8)
	* refactor routes (comments, camgrounds, user) (v7)
	* user schema, user RESTful routes (NEW, CREATE), passpord (register, login, logout) (v6)
	* style with bootstrap (v5)
	* comment RESTful NESTED routes (NEW, CREATE), expressjs partials template (header.ejs, footer.ejs) (v4)
	* refactor db (mongoose), seed file seeds.js, comment schema (v3)
	* campground RESTful routes(NEW, CREATE, SHOW), mongoose (schema, connect mongodb) (v2)
	* bootstrap, nodejs, expressjs routes, ejs, RESTful INDEX (v1)


---------------------------------------------
version 12
- branch: master (merge from v11flaskUi)
- new techniques:
- 4 terminals: mongod, nodemon, mongo for debug database, and 1 free terminal
---------------



