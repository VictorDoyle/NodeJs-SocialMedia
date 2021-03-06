// using express
const express = require("express");
// setting up router
const router = express.Router();
// database setup
const db = require('../models');
// Rest Routes
/* 
  * Index - GET - Presentational - all images
  * New - GET  - Presentational Form - not applicable - image is created through post new
  * Show - GET  - Presentational - show your image or other images one by one
  * Create - Post - Functional - data receiving for route to create new image
  * Edit - GET  - Presentational Form - edit image type - connected to post edit
  * Update - PUT  - Functional - update image with changes
  * Delete - DELETE - Functional - Deletes image
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
