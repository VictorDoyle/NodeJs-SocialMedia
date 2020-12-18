// using express
const express = require("express");
// setting up router
const router = express.Router();
// database setup
const db = require('../models');
// Rest Routes
/* 
  * Index - GET - /users  - Presentational - all images
  * New - GET - /users/new  - Presentational Form - not applicable - image is created through post new
  * Show - GET - /users/:id  - Presentational - show your image or other images one by one
  * Create - Post - /users  - Functional - data receiving for route to create new image
  * Edit - GET - /users/:id/edit  - Presentational Form - edit image type - connected to post edit
  * Update - PUT - /users/:id  - Functional - update image with changes
  * Delete - DELETE - /users/:id  - Functional - Deletes image
*/

/* ======== INDEX PAGE ======== */
router.get("/images", function(request, response){
  db.Image.find({}, function(error, allImages){
      if(error) return response.send(error);
      const context = {users: allImages};
      return response.render("images/index", context);
  });
});
// New image route
router.get("images/new", function(request,response){
  response.render("images/new");
});
//Create/Upload image route - Commented out so that If I need I can call the image creation route from the post creation route
/* 
router.post("/upload", function(request,response){
  db.Image.create(request.body, function(err, createdImage){
      if (err) return response.send(err);
      db.Post.findById(createdImage.post).exec(function(err, foundPost){
          if (err) return response.send(err);
          foundPost.image.push(createdImage);
          createdImage.post.push(foundPost);
          foundPost.save();             
          return response.redirect("/");
      })
  });
}); */
router.put("/:id", function(request,response){
  db.Image.findByIdAndUpdate(
      request.params.id,
      {
          $set: {
              ...request.body
          }
      },
      { new: true},
      function(error,updatedImage){
          if(error) {
              return response.send(error);
          } else {
              return response.redirect(`/images/${updatedImage._id}`);
          }
      }
  );
});
//Delete route
router.delete("/:id", function(request,response){
  db.Image.findByIdAndDelete(request.params.id, function(error, deletedPost){
      if(error) {
          return response.send(error);
      } else {
          return response.redirect("/images");
      }
  });
});
module.exports = router;
