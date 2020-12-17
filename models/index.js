const mongoose = require("mongoose");

mongoURL = "mongodb://localhost27017/Insta"

mongoose.connect(mongoURL, {
    //This following part of code I was confused about and just copied directly from express fruits
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
      User: require("./users"),
      Post: require("./posts"),
      Image: require("./images"),
      Comment: require("./comments"),
  }