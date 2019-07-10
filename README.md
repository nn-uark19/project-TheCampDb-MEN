# yelpCamp

version 10
- branch: v10updateDestroy
- new technology: 
- 4 terminals: mongod, nodemon, mongo for debug database, and 1 free terminal
---------------
Campground Edit and Update	Editing Campgrounds
- add method-override {install package}
- add edit route for campgrounds {app.get(‘/campgrounds/:id/edit’)…/views/campgrounds/route_edit.ejs…build route_edit.ejs }
- add update route {app.put(‘/campgrounds/:id’) }
- add link to edit page {/views/campgrounds/route_show.ejs }
- fix $set problem

Campground Destroy	Deleting Campgrounds
- add destroy route {app.delete(‘/campgrounds/:id’) }
- add delete button {/views/campgrounds/route_show.ejs }
- notice that we need to delete comments associated with the deleted campground link


