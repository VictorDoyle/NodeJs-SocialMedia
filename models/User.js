const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        userName: { type: String },
        description: { type: String },
        posts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        picture: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        savedPosts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        //Put in accessibility under user as we decide specifics.
    }
)