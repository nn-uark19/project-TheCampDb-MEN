# yelpCamp

version 8
- branch: master (merge from v8commentUser)
- new technology: data associations (save author’s name to a comment automactically)
- technology: 
	* refactor routes (comments, camgrounds, user)
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


---------------------------------------------
version 7
- branch: master (merge from v7refactorRoutes)
- new technology: refactor routes
- technology: 
	* authentication (express-session, passportjs, passport-local, passport-local-mongoose), 
	* mongoose (mongodb, module.exports,  seeds), 
	* RESTful routes, bootstrap, nodejs, expressjs
- 4 terminals: mongod, nodemon, mongo for debug database, and 1 free terminal
---------------
YelpCamp: Refactoring Routes	Refactor the routes
- use pexress router to reorganize all routes {/routes/index.js…campgrounds.js…comments.js, pass params in comments.js}


---------------------------------------------
version 6
branch: v6auth
new technology: auth (express-session, passportjs, passport-local, passport-local-mongoose)
technology: mongoose (mongodb, module.exports,  seeds), RESTful, bootstrap, nodejs, expressjs
4 terminals: mongod, nodemon, mongo for debug database, and 1 free terminal
---------------
YelpCamp: Adding Auth Pt 1	Add User Model
- install all packages needed for auth {sess, passport, passport-local, passport-local-mognoose, include in app.js}
- define user model {models/user.js has username-password, add passport-local-mongoose }

YelpCamp: Adding Auth Pt 2	Register
- configure passport 
- add register routes {app.get(/register)…app.post(/register) }
- add register template {register.ejs, build form }

YelpCamp: Adding Auth Pt 3	Login
- add login routes {app.get(/login)…app.post(/login) }
- add login template {app.post(/login), build form }

YelpCamp: Adding Auth Pt 4	Logout/ Navbar
- add logout route {app.get(/logout) }
- add links to navbar {for login, sign up, logout }
- prevent user from adding a comment if not signed in {build middleware function, protect 2 routes for comments}

YelpCamp: Adding Auth Pt 5	Show/ Hide Links
- show/hide auth links in navbar correctly


---------------------------------------------
version 5
branch: master (merge from v5styleShowPage)
new technology: custom css file
technology: public/stylesheets/main.css, mongoose (mongodb, module.exports,  seeds), RESTful, bootstrap, nodejs, expressjs
---------------
YelpCamp: Styling Comments Pt1.	Style Show Page
- add sidebar to show page {bootstrap grid 3-9, comment well}
- display comments nicely
- customize photo

YelpCamp: Styling Comments Pt2
- include stylesheet css file {:mainProject/public/stylesheets/main.css…app.js…header.js}
- in show page, image padding and width


---------------------------------------------
version 4
this prevent from master to fast forward
branch: master (merge from v4comments)
new technology: nested routes
technology: mongoose (mongodb, module.exports,  seeds), RESTful, bootstrap, nodejs, expressjs
4 terminals: mongod, nodemon, mongo for debug database, and 1 free terminal
---------------
YelpCamp: Creating Comments Pt1	Comment New/Create. Start of v4
- discuss nested routes
	NEW	/campgrounds/:id/comments/new	GET
	CREATE	/campgrounds/:id/comments		 POST

- add the comment new routes {
	* Have 2 folders now views/campgrounds and comments. Change files location
	* Update app.js render, header/footer for route files 
	* build new route app.get(/campgrounds/:id/commentes/new…comments/new.ejs}
- add the new comment form (update form action, method)

YelpCamp: Creating Comments Pt2	
- add the Create route {lookup campground using id, create new comment, connect comment to campground, redirect campgrounds show page, app.post(/campgrounds/:id/comments), build button connection}


---------------------------------------------
version 3
branch: master (merge from v3seeds)
new technology: mongoose exports,  mongoose seeds
technology: mongoose (connect mongodb), RESTful, bootstrap, nodejs, expressjs
4 terminals: mongod, nodemon, mongo for debug database, and 1 free terminal
---------------
YelpCamp: Refactoring App.js	
- create a models directory {:mainProject/models/campgrounds.js}
- use module.exports
- require everything correctly!

YelpCamp: Seeding the Database. Add Seeds File
- add a seeds.js files {seeds.js}
- run the seeds file every time the server starts {remove all camps- remove all comments- hardcode add camps- add comments, Referencing data }

YelpCamp: Comment Model.	Add the Comment model
- make our errors go away! {make Comment model comment.js with text-author, add comment property to campground db, Referencing data }
- display comments on campground show page {update app.get(/campgrounds/:id) to populate the comments, Referencing data }


---------------------------------------------
version 2
branch: master (merge from v2mongoose)
new technology: mongoose, RESTful 
technology: mongoose, RESTful, bootstrap, nodejs, expressjs
---------------
YelpCamp: Adding Mongoose	
- install and configure mongoose {localhost/yelp_camp}
- setup campground model {schema, model}
- use campground model inside of our routes {app.get(‘/campgrounds), app.post(‘/campgrounds) }

YelpCamp: Campground Show Page
- add mongoose db to yelpcamp
- define the RESTful api {
1. INDEX	/index  		GET
2. NEW   	/camgrounds/new	GET
3. CREATE	/camgrounds		POST
4. SHOW	/campgrounds/:id	GET
}
- add description to our campground model {campgroundSchema, recreate collection}
- add a show route/template {app.get(/camgrounds/:id)…rename to campgrounds.ejs, button on index.ejs, build campgrounds.ejs, update new.ejs}


---------------------------------------------
version 1
branch: master
technology: bootstrap, nodejs, expressjs
---------------
YelpCamp: Initial Routes	
- add landing page {app.get(‘/’), … landing.ejs}
- add campgrounds page that lists all campgrounds {app.get(‘/campgrounds), …campgrounds.ejs}

YelpCamp: Layout	
- create our header and footer partials
- add in bootstrap

YelpCamp: Creating Campgrounds	
- setup new campground POST route {app.post(‘/campgrounds), …campgrounds.ejs, app.get(/campgrounds/new)…new.ejs}
- add in body-parser
- setup route to show form
- add basic unstyled form

YelpCamp: Styling Campgrounds	
- add a better header/title {campgrounds.ejs, jumpbotron}
- make campgrounds display in a grid

YelpCamp: Styling Nav and Forms	
- add a navbar to all templates