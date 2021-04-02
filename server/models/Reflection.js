const mongoose = require("mongoose");
const commentSchema = require("./Comment");

const reflectionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        post: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        poster: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        comments: {
            type: [commentSchema],
            required: true,
        },
    },
    { collection: "Reflections" }
);

module.exports = Reflection = mongoose.model("Reflections", reflectionSchema);
