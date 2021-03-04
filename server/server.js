const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const userRoutes = require('./routes/api/users');
const path = require('path');

// Configure Environment Vars
//dotenv.config();
const PORT = process.env.PORT || 5000;
//const ATLAS_URI = process.env.ATLAS_URI;

// Create Express Server
const app = express();

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
}

//For printing directory/file when debugging
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//console.log(__dirname);

// Middleware
app.use(express.static("../client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use('/api/users', userRoutes);

// Database Connection
const db = require("./config/keys").ATLAS_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

conn.once('open', () => {
        console.log("Database connection established.");
})

app.listen(PORT, () => {
                console.log(`Running on port: ${PORT}`);
})

mongoose.set('useFindAndModify', false);
