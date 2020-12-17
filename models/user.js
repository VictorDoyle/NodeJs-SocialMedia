const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required:true, minLength: 1 },
        lastName: { type: String, required:true, minLength: 1  },
        userName: { type: String, required:true, minLength: 1  },
        description: { type: String },
        posts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        picture: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required:true },
        savedPosts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        //Put in accessibility under user as we decide specifics.
    }
)

/* Added Model Export */

const User = mongoose.model("User", UsersSchema);
module.exports = User;