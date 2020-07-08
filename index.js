const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv/config");

// Imports Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

// DB connection
mongoose.connect(
  process.env.AUTH_DB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("successfull connected to DB....!")
);

// middleware
app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => console.log("Server is up and running"));
