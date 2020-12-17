// External Code
const express = require("express");
const methodOverride = require("method-override");

//Internal Code
const db = require("./models");
const controllers = require("./controllers");

const app = express();
const PORT = 4000;
//App Configure
app.set("view engine", "ejs");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//Logger
app.use(function (request, response, next) {
	console.log(request.url, request.method);
	next();
});
// user authentication middleware for easy callback to currentUser
/* app.use(function(request, response, next){
	app.locals.user = request.session.currentUser;
	next();
}); */

/* check if user is present in session. if not redirect to login page */
/* const authRequired = function(request, response, next){
	if(request.session.currentUser) {
		next();
	} else {
		response.redirect("/login");
	};
}; */


//Controllers
app.use("/users", controllers.users);
/* app.use("/comments", authRequired, controller.comments); //Uncomment after testing
app.use("/posts", authRequired,  controller.posts);
app.use("/images", authRequired,  controller.images); */
/* adding authentication and authorization controllers */
app.use("/",  controllers.auth)

//Routes

//Home Routes FIXME: change context
app.get("/", function (request, response) {
	response.render("home");
});
// 404 route
app.get(function (request, response){
	response.send("404 the page is not found")
})
app.listen(PORT, function () {
	console.log(`Server is live at http://localhost:${PORT}/`);
});