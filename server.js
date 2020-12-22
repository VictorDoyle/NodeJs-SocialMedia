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

/* upload file access for photos */
app.use("/upload",express.static(__dirname +'/upload'));

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
	  console.log(request.session);
	  next();
  });

  // querying user information
  /* app.use(function (request, response, next) {
	response.locals.user = request.session.currentUser; 
	console.log(session);
	next();
}) */

// authRequired for later use
const authRequired = function(req,res,next){
	if(req.session.currentUser){
	  next();
	} else {
	  res.redirect("/login");
	}
  }

// cookie delete on user delete

//Controllers
app.use("/",  controllers.auth);
app.use("/users", authRequired, controllers.users);
// app.use("/comments", authRequired, controller.comments); //Uncomment after testing
app.use("/posts",  controllers.posts);/*
app.use("/images", authRequired,  controller.images); */

//Routes

//Home Routes FIXME: change context
app.get("/", async function (request, response) {
    try {
		const allPosts = await db.Post.find().populate({ path:"user image", options:{sort:"-createdAt"}} );
        const context = { card: allPosts};
        return response.render("posts/index", context);
	} catch (error) {
		return response.send(error);
	}
});
/* router.get("/:id", async function(request,response) {
    try {
        const foundUser = await db.User.findById(request.params.id).populate({path: "posts", populate: {path:"image"}, options: {sort:"-createdAt"}} );

        const context = { profile: foundUser};
        return response.render("users/show", context);
    } catch (error) {
        return response.send(error);
    }
});*/
// 404 route
app.get(function (request, response){
	response.send("404 the page is not found")
})
app.listen(PORT, function () {
	console.log(`Server is live at http://localhost:${PORT}/`);
});