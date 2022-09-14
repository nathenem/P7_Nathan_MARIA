require("dotenv").config();

const express = require("express");
const cors = require("cors");

const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

const path = require("path");

const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongodb ok");
  })
  .catch(() => {
    console.log("mongodb pas ok");
  });

app.use("/images", express.static(path.join(__dirname + "/../images")));

app.use(express.json());
app.use(cors());

app.use("/api/posts", postRoutes);

app.use("/api/auth", userRoutes);

module.exports = app;
