import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
import "path";

// Configure Environment Vars
dotenv.config();

// Create Express Server
const app = express();
const ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
}
app.use(express.static("../client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

// Middleware
app.use("/posts", postRoutes);
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// mongoose.connect(ATLAS_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const conn = mongoose.connection;
// conn.once("open", () => {
//   console.log("Database connection established.");
// });

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});

// mongoose.set("useFindAndModify", false);
