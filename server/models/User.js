const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        accessLevel: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        },
        email_opt_out: {
            type: Boolean,
            required: true,
        },
        //image_data: {
        //    type:String,
        //    default: "",
        //    required: true
        //},
    },
    { collection: "Users" }
);

module.exports = User = mongoose.model("Users", userSchema);
