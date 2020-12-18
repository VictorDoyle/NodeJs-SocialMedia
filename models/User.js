const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: [true, "You must provide a first name"]},
        lastName: { type: String, required: [true, "You must provide a last name"] },
        userName: { type: String, required: [true, "You must provide a username"], unique: true },
        email: {type: String, required: [true, "You must provide an email"], unique: true},
        password: {type: String, required: [true, "You must set a password"], minlength: 5},
        description: { type: String, required: [true, "You must provide a profile bio"], maxlength: [150, "You've exceeded the character limit! Bio's are up to 150 characters"]},
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        picture: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        /* savedPosts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, */ 
        // uncomment savedPosts after mvp
        //Put in accessibility under user as we decide specifics.
    }
)

// We can make a separate Model for User with login info requirements and then make another
// Model for "Profile" with description, posts, pictures, saved posts and accessibility.
/* Added Model Export */

const User = mongoose.model("User", UsersSchema);
module.exports = User;