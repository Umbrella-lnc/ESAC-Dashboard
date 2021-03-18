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

const Comment = mongoose.model("Comments", commentSchema);
module.exports = commentSchema;
