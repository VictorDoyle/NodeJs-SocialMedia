const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        description: {type: String, required: true, minLength: 1 },
        // audio: { } Just placeholder for if audio content is added after MVP
        likes: {type: Number, required: true, default: 0},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    },
    {timestamps: true} 
)

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
