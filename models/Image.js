const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
    {
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true}, //Used for post/profile image assosciation (will help with versatility)
        image: {type: String, required: true, typekey: '$type'},
        name: {type: String, typekey: '$type'}
    }
)

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
