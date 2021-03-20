const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    dateposted: {
        type: Date,
        required: true,
    },
});

//module.exports = Comment = mongoose.model("Comments", commentSchema);
module.exports = commentSchema;
