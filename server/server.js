const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/api/users");
const dotenv = require("dotenv");
const path = require("path");

// Configure Environment Vars

process.env.NODE_ENV =
    process.env.NODE_ENV === "production" ? "production" : "development";

dotenv.config();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI.replace("mode", process.env.NODE_ENV);

// Create Express Server
const app = express();

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
    });
}

//Info
console.log(
    "Running in " + process.env.NODE_ENV + " mode at databse url: ",
    URI
);

//For printing directory/file when debugging
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//console.log(__dirname);

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", userRoutes);

// Database Connection
mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //Start listening AFTER establishing database connection
        app.listen(PORT, () => {
            console.log(`Running on port: ${PORT}`);
        });
    });

const conn = mongoose.connection;

conn.once("open", () => {
    console.log("Database connection established.");
});

mongoose.set("useFindAndModify", false);
