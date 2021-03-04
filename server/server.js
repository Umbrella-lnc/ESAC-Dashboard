import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'

// Configure Environment Vars
dotenv.config();
const PORT = process.env.PORT || 5001;
const ATLAS_URI = process.env.ATLAS_URI;

// Create Express Server
const app = express();


// Middleware
app.use('/posts', postRoutes);
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Database Connection
mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

conn.once('open', () => {
        console.log("Database connection established.");
})

app.listen(PORT, () => {
                console.log(`Running on port: ${PORT}`);
})


mongoose.set('useFindAndModify', false);