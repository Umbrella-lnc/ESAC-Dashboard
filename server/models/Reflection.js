const mongoose = require("mongoose");
const commentSchema = require("./Comment")

const reflectionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        department: {
            type: String,
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
