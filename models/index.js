const mongoose = require("mongoose");
require("dotenv").config();
mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017/Insta"

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

mongoose.connection.on("connected", function(){
    console.log("Database Connected");
  });
  
  mongoose.connection.on("disconnected", function(){
    console.log("Database disconnected");
  });
  
  mongoose.connection.on("error", function(error){
    console.log("MongoDB error", error);
  });
  module.exports = {
      User: require("./User"),
      Post: require("./Post"),
      Image: require("./Image"),
      Comment: require("./Comment"), 
  }
