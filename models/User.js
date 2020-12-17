const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: [true, "You must provide a first name"]},
        lastName: { type: String, required: [true, "You must provide a last name"] },
        userName: { type: String, required: [true, "You must provide a username"] },
        description: { type: String, required: [true, "You must provide a profile bio"] },
        posts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        picture: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        savedPosts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        //Put in accessibility under user as we decide specifics.
    }
)

/* Added Model Export */

const User = mongoose.model("User", UsersSchema);
module.exports = User;