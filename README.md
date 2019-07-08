# yelpCamp

version 6
branch: v6auth
new technology: auth (express-session, passportjs, passport-local, passport-local-mongoose)
technology: mongoose (mongodb, module.exports,  seeds), RESTful, bootstrap, nodejs, expressjs
4 terminals: mongod, nodemon, mongo for debug database, and 1 free terminal
---------------
Note: 
- (git) if we make a change in branch2, but not stage/commit, you will lose all the changes if you switch to other branches
- (mongoose) Cat.find returns array, whereas Cat.findById return 1 object
- (git) fastforward. seems like the master branch got fast forward due to no changes between merges. happens during v4. commit c2212c1..8baf3ef (8baf3efc44d94f08bfde541c0b794d5a7941558e)
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
