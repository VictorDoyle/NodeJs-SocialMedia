const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
    {
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true}, //Used for post/profile image assosciation (will help with versatility)
        image: { data: Buffer, type: String}, //In this case the string is the image path, I am storing the image in Buffer for the usability since the image is stored in binary. .
    }
)

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
