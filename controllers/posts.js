// using express
const express = require("express");
// setting up router
const router = express.Router();

// database setup
const db = require('../models');
// New Post route
router.post("/post/upload", function(request,response){
    db.Post.create(request.body, function(error, createdPost){
        if(error) {
            return response.send(error);
        } else {
            return response.redirect("/users");
        }
    });
});
