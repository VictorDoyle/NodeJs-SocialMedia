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
        // The following code we used to randomize the profile pictures. These are not chosen by the user but would be if we had time.
        picture: { type: String},
        /* savedPosts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, */ 
        // uncomment savedPosts after mvp
        //Put in accessibility under user as we decide specifics.
    }
)

const User = mongoose.model("User", UsersSchema);
module.exports = User;