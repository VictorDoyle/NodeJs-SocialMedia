// External Code
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
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
/* access internal modules for custom CSS styling and app.js in public folder */
app.use(express.static(__dirname +'/public'));

//Logger
app.use(function (request, response, next) {
	console.log(request.url, request.method);
	next();
});

/* Session Middleware + User authentication */

app.use(
	session(
	  {
		// set the store to the MongoStore we required
		store: new MongoStore({
		  url: "mongodb://localhost:27017/Insta"
		}),
		// our secret is a signature in our sessions to verify that it is valid
		secret: "Make custom password here",
		resave: false,
		saveUninitialized: false,
		cookie: {
		  maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
		}
	  }
	)
  );
  // user authentication
  app.use(function (request, response, next) {
	  response.locals.user = request.session.currentUser; 
	  console.log(session);
	  next();
  });

  // querying user information
  /* app.use(function (request, response, next) {
	response.locals.user = request.session.currentUser; 
	console.log(session);
	next();
}) */



//Controllers
app.use("/",  controllers.auth);
app.use("/users", controllers.users);
// app.use("/comments", authRequired, controller.comments); //Uncomment after testing
app.use("/posts",  controllers.posts);/*
app.use("/images", authRequired,  controller.images); */

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