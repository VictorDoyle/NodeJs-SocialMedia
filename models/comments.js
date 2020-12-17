const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        description: {type: String, required: true, minLength: 1 },
    }
)