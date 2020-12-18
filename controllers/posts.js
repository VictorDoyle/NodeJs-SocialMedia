// using express
const express = require("express");
// setting up router
const router = express.Router();
// database setup
const db = require('../models');
// Rest Routes
/* 
  * Index - GET - /users  - Presentational - all users
  * New - GET - /users/new  - Presentational Form - user signup page
  * Show - GET - /users/:id  - Presentational - show your user page or other user profiles
  * Create - Post - /users  - Functional - data receiving for route to create new user
  * Edit - GET - /users/:id/edit  - Presentational Form - edit user profile with previous filled data
  * Update - PUT - /users/:id  - Functional - update user profile with new changes
  * Delete - DELETE - /users/:id  - Functional - Deletes user profile by id from request (FIXME: Make sure to make delete only available to your own profile)
*/

/* ======== INDEX PAGE ======== */
router.get("/posts", function(request, response){
    db.Post.find({}, function(error, allPosts){
        if(error) return response.send(error);
        const context = {users: allPosts};
        return response.render("posts/index", context);
    });
});
// New Post route
router.get("/new", function(request,response){
    response.render("posts/new");
});
//Create/Upload post route
router.post("/upload", function(request,response){
    db.Post.create(request.body, function(error, createdPost){
        if (error) return response.send(error);
        db.User.findById(createdPost.user).exec(function(error, foundUser){
            foundUser.posts.push(createdPost);
            foundUser.save();
        })
    });
    db.Image.create(request.body, function(error, createdImage){
        if (error) return response.send(error);
        db.Post.findById(createdImage.post).exec(function(error, foundPost){
            foundPost.image.push(createdImage);
            foundImage.save();
                
            return response.redirect("/home");
        })
    });
});
//Edit route
router.get("/:id/edit", function(request,response){
    db.Post.findById(request.params.id, function(error, foundUser){
        if(error) {
            return response.render(error);
        } else {
            const context = {users: foundUser};
            return response.render("posts/edit", context);
        }
    });
});
//Update route
router.put("/:id", function(request,response){
    db.Post.findByIdAndUpdate(
        request.params.id,
        {
            $set: {
                ...request.body
            }
        },
        { new: true},
        function(error,updatedUser){
            if(error) {
                return response.send(error);
            } else {
                return response.redirect(`/users/${updatedUser._id}`);
            }
        }
    );
});
//Delete route
router.delete("/:id", function(request,response){
    db.Post.findByIdAndDelete(request.params.id, function(error, deletedPost){
        if(error) {
            return response.send(error);
        } else {
            return response.redirect("/posts");
        }
    });
});
module.exports = router;
