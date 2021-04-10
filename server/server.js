const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/api/userRouter");
const usersManagementRoutes = require("./routes/api/usersManagementRouter");
const reflectionsRoutes = require("./routes/api/reflectionsRouter");
const emailRoutes = require("./routes/api/emailRouter");
const announcementRoutes = require("./routes/api/announcementsRouter");

const dotenv = require("dotenv");
const path = require("path");

// Configure Environment Vars
dotenv.config();
const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI.replace("mode", ENV);

// Create Express Server
const app = express();

// Serve static assets if in production
if (ENV === "production") {
    //Set static folder
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
    });
}

//Info
console.log("Running in " + ENV);

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

// Routes
app.use("/api/users", userRoutes);

// Protected Routes
app.use(
    "/api/usersManagement",
    passport.authenticate("jwt", { session: false }),
    usersManagementRoutes
);
app.use(
    "/api/reflections",
    passport.authenticate("jwt", { session: false }),
    reflectionsRoutes
);
app.use(
    "/api/emails",
    passport.authenticate("jwt", { session: false }),
    emailRoutes
);
app.use(
    "/api/announcements",
    passport.authenticate("jwt", { session:false }),
    announcementRoutes
);

// Database Connection
mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
