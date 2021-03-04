const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const users = require('./routes/api/users');

// Configure Environment Vars
//dotenv.config();
const PORT = process.env.PORT || 5000;
//const ATLAS_URI = process.env.ATLAS_URI;

// Create Express Server
const app = express();


// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(passport.initialize());

require("./config/passport")(passport);

app.use('./routes/api/users', users);

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