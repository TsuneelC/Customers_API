const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//Middleware
app.use(cors());
app.use(bodyparser.json());

// importing routes
const postroutes = require("./routes/post");

app.use("/posts", postroutes);

//Routes
app.get("/", (req, res) => {
  res.send("this is home page");
});

mongoose.connect(process.env.DB_CONNEXTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection
  .once("open", () => console.log("DB conneted...!"))
  .on("error", error => console.log("error is ", error));

app.listen(5000);
