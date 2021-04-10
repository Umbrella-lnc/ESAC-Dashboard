const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        post: {
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
    },
    { collection: "Announcements" }
);

module.exports = Announcement = mongoose.model("Announcements", announcementSchema);
