// using express
const express = require("express");
// setting up router
const router = express.Router();

// database setup
const db = require('../models');
// New Post route
router.post("/post/upload", function(request,response){
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
