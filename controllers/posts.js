// using express
const express = require("express");
// setting up router
const router = express.Router();
// database setup
const db = require('../models');
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