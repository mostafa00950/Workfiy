const express = require("express");
const path = require("path");
const mongoose = require("mongoose");


mongoose
  .connect("mongodb://127.0.0.1:27017/workfiyDB")
  .then(() => {
    console.log("MongoDB Connected Sucssfuly(: ");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json()); // Read As JSON

//===================USER API=====================
const User = require("./models/User");
app.post("/users", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    specialty: req.body.specialty,
    password: req.body.password,
  });

  await newUser.save();

  res.json(newUser);
});
//===================job API=====================
const Job = require("./models/Job");
app.post("/jobs", async (req, res) => {
  const newJob = new Job({
    title: req.body.title,
    companyName: req.body.companyName,
    salary: req.body.salary,
    shift: req.body.shift,
    location: req.body.location,
  });
  await newJob.save();
  res.json(newJob);
});
//===================internship API=====================
const Internship = require("./models/Internship");
app.post("/internship", async (req, res) => {
  const newInternship = new Internship({
    title: req.body.title,
    companyName: req.body.companyName,
    duration: req.body.duration,
    paid: req.body.paid,
    location: req.body.location,
    skillsRequired: req.body.skillsRequired,
  });

  await newInternship.save();
  res.json(newInternship);
});

//  static files from public 
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "index.html"));
});

app.get("/jobs", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "jobs.html"));
});

app.get("/internships", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "internship.html"));
});


app.listen(3000, () => {
  console.log("Workfiy server running on http://localhost:3000");
});
