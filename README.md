# yelpCamp

Campground Edit and Update	Editing Campgrounds
- add method-override {install package}
- add edit route for campgrounds {app.get(‘/campgrounds/:id/edit’)… /views/campgrounds/route_edit.ejs…build route_edit.ejs }
- add update route {app.put(‘/campgrounds/:id’) }
- add link to edit page {/views/campgrounds/route_show.ejs }
- fix $set problem
Campground Destroy	Deleting Campgrounds
- add destroy route {app.delete(‘/campgrounds/:id’) }
- add delete button {/views/campgrounds/route_show.ejs }
- notice that we need to delete comments associated with the deleted campground link

Campground Authorization Part 1	Authorization Pt 1: Campgrounds
- user can only edit his/her campgrounds {
 + idea is to use both grounds 1.middleware for the route 2.hide buttons
 + modify /routes/campgroundRoutes.js routes app.get(/edit) first
 + build middleware function checkCampgroundOwner for both edit and delete }
- user can only delete his/her campgrounds
Campground Authorization Part 2	Authorization Pt 1b: Campgrounds
- hide/show edit and delete buttons {modify show views/campgrounds/route_show.ejs }
Comment Edit and Update	Editting Comments
- add edit route for comments {
 + define edit route app.get(/campgrounds/:id/comments/:comment_id/edit }
- add edit button {
 + /views/campgrounds/route_show.ejs 
 + new file /views/comments/route_edit.ejs, then build it }
- add update route {
 + define update route app.put(/campgrounds/:id/comments/:comment_id, then build it }
Comment Destroy	Deleteing Comments
- add destroy route {define route app.delete(/campgrounds/:id/comments/:comment_id) }
- add delete button {modify /views/campgrounds/route_show.ejs }
- notice that we need to delete in comments array within the campground link

Comment Authorization	Authorization Part 2: Comments
- user can only edit his/her comments {checkCommentOwnership in commentRoutes.js}
- user can only delete his/her comments
- hide/show edit and delete buttons {modify /campgrounds/comments/route_show.ejs }
