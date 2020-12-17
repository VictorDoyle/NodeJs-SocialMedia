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
//Controllers
app.use("/users", controllers.users);
/* app.use("/comments", controller.comments); //Uncomment after testing
app.use("/posts", controller.posts);
app.use("/images", controller.images); */
/* adding authentication and authorization controllers */
app.use("/", controllers.auth)

//Routes

//Home Routes
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