const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
app.use(express.json()); // Read As JSON

mongoose
  .connect("mongodb://127.0.0.1:27017/workfiyDB")
  .then(() => {
    console.log("MongoDB Connected Sucssfuly(: ");
  })
  .catch((err) => {
    console.log(err);
  });