// using express
const express = require("express");
// setting up router
const router = express.Router();
// database setup
const db = require('../models');
// multer setup
const upload = require("multer")({dest: "./upload/"});
// Rest Routes
/* 
  * Index - GETs  - Presentational - all posts (feed)
  * New - GET  - Presentational Form - post creation page
  * Show - GET  - Presentational - show post "card"
  * Create - Post  - Functional - data receiving for route to create new post
  * Edit - GET  - Presentational Form - edit or delete post
  * Update - PUT  - Functional - update postwith new changes
  * Delete - DELETE  - Functional - Deletes post by id from request
*/

/* ======== INDEX PAGE ======== */
router.get("/", function(request, response){
    db.Post.find({}, function(error, allPosts){
        if(error) return response.send(error);
        const context = {posts: allPosts};
        return response.render("posts/index", context);
    });
});
// New Post route
router.get("/new", function(request,response){
    response.render("posts/new");
});
//Create/Upload post route
router.post("/:id/upload", upload.single("image"), function(request,response){
    console.log(request.file);
    console.log(request.body);
    request.body.user = request.params.id;
    db.Post.create(request.body, function(err, createdPost){
        if (err) return response.send(err);
        db.User.findById(createdPost.user).exec(function(err, foundUser){
            if (err) return response.send(err);
            foundUser.posts.push(createdPost);
            createdPost.user = foundUser;
            foundUser.save();
        })
        const imageData = {
            post: createdPost,
            image: request.file.path, 
            //Check if working
        };
        db.Image.create(imageData, function(err, createdImage){
                if (err) return response.send(err);
                createdPost.image = createdImage;
                createdPost.save();
                    
                return response.redirect("/");
            })
        });
    });
//Edit route
router.get("/:id/edit", function(request,response){
    db.Post.findById(request.params.id, function(error, foundPost){
        if(error) {
            return response.render(error);
        } else {
            const context = {card: foundPost};
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
        function(error,updatedPost){
            if(error) {
                return response.send(error);
            } else {
                return response.redirect('/');
            }
        }
    );
});
//Show route
router.get("/:id", function(request,response){
    db.Post.findById(request.param.id, function(error, foundPost){
        if(error) {
            return response.render(error);
        } else {
            const context = {card: foundPost};
            return response.render("posts/show", context);
        }
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

/* Updating Post Likes Route */
/* router.put("/:id", function(request,response){
    db.Post.findByIdAndUpdate(
        request.params.id,
        {
            $set: {
                ...request.body.likes
            }
        },
        { new: true},
        function(error){
            if(error) {
                return response.send(error);
            } else {
                return response.redirect("/");
            }
        }
    );
});
 */
module.exports = router;
