const mongoose = require("mongoose");

mongoURL = "mongodb://localhost:27017/Insta"

mongoose.connect(mongoURL, {
    //This following part of code I was confused about and just copied directly from express fruits
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

mongoose.connection.on("connected", function(){
    console.log("MongoDB is now Connected");
  });
  
  mongoose.connection.on("disconnected", function(){
    console.log("MongoDB is now disconnected");
  });
  
  mongoose.connection.on("error", function(error){
    console.log("There is a Database error", error);
  });
  module.exports = {
      User: require("./User"),
     /*  Post: require("./Post"),
      Image: require("./Image"),
      Comment: require("./Comment"), */
  }