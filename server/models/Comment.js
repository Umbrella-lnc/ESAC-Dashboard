const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        poster: {
            type: String,
            required: true,
        },
        dateposted: {
            type: Date,
            required: true,
        },
    },
    { collection: "Comments" }
);

module.exports = Comment = mongoose.model("Comments", commentSchema);
