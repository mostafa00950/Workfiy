const express = require("express")
const app = express()
app.use(express.json());

// Database connection ya zangi anta w hwa
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/workfiyDB")
.then(() => {
  console.log("Connected to Workfiy Success")
})
.catch(() => {
  console.log("Can't connect to Workfiy database")
})

//============================================================//
// Schemas //
const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  email: String,
  gender: String,
  specialist: String
});
const User = mongoose.model("user", userSchema);

const jobSchema = new mongoose.Schema({
  jobId: Number,
  title: String,
  description: String,
  type: String,
  salary: Number
});
const job = mongoose.model("job", jobSchema);

const scholarshipSchema = new mongoose.Schema({
  scholarshipId: Number,
  title: String,
  description: String,
  details: String
});
const scholarship = mongoose.model("scholarship", scholarshipSchema);


//============================================================//
// User Apis // 
// Get all users api
app.get("/api/user", async(req, res) => {

  try {
    const users = await User.find()
    res.json(users)
  }

  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

// Get single user by ID
app.get("/api/user/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const foundUser = await User.findOne({ userId: userId });

    if (!foundUser) {
      return res.status(404).json({ msg: "Can't find this user" });
    }

    res.json(foundUser);

  } catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
});

// delete User Api
app.delete("/api/user/:userId", async (req, res) => {
  try {
    const deletedUserId = Number(req.params.userId)
    const deletedUser = await User.deleteOne({ userId : deletedUserId})
    if(deletedUser.deletedCount === 0)
      return res.status(404).json({ msg: "User isn't found" });
    console.log(deletedUser)
    res.json("User Deleted Success")
  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

// Add User Api
app.post("/api/user", async(req, res) =>{
  try {
    const {userId, name, email, gender, specialist} = req.body
    const newUser = new User({
      userId,
      name,
      email,
      gender,
      specialist
    });
    await newUser.save()
    res.status(201).json({
      msg: "User Added Success",
      data: newUser
    })
  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

// Update User Api
app.patch("/api/user/:userId", async(req, res) => {
  try {
    const updatedUserId = Number(req.params.userId);
    const updatedUser = await User.findOneAndUpdate({userId : updatedUserId},
      req.body,
      {new: true}
    )
    if(!updatedUserId)
      return res.status(404).json({msg: "User Not Found"})
    res.status(200).json({
      msg: "User Updated Success",
      data: updatedUser
    })
  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

//============================================================//
// Jobs Api //
// Get all Jobs Api
app.get("/api/jobs", async(req, res) => {

  try {
    const allJobs = await job.find()
    res.json(allJobs)
  }

  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

// Get Single Job Api
app.get("/api/jobs/:jobId", async (req, res) => {
  try {
    const jobId = Number(req.params.jobId);

    const foundJob = await job.findOne({ jobId: jobId });

    if (!foundJob) {
      return res.status(404).json({ msg: "Can't find this user" });
    }

    res.json(foundJob);

  } catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
});

// delete Job Api
app.delete("/api/jobs/:userId", async (req, res) => {
  try {
    const deletedJobId = Number(req.params.userId)
    const deletedJob = await job.deleteOne({ jobId : deletedJobId})
    if(deletedJob.deletedCount === 0)
      return res.status(404).json({ msg: "User isn't found" });
    console.log(deletedJob)
    res.json("Job Deleted Success")
  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

// Add Job Api
app.post("/api/jobs", async(req, res) => {
  try {
    const {jobId, title, description, type, salary} = req.body
    const newJob = new job({
      jobId,
      title,
      description,
      type,
      salary
    })
    await newJob.save()
    res.status(201).json({
      msg: "Job Added Success",
      data: newJob
    })
  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

// Update Job Api
app.patch("/api/jobs/:jobId", async(req, res) => {
  try {
    const updatedJobId = Number(req.params.jobId)
    const updatedJob = await job.findOneAndUpdate({jobId : updatedJobId},
      req.body,
      {new: "true"}
    )
    if(!updatedJobId)
      return res.status(404).json({msg: "Job Not Found"})
    res.status(200).json({
      msg: "Job Updated Success",
      data: updatedJob
    })
  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

//============================================================//
// Scholarship Api //
// Get all scholarships Api
app.get("/api/scholarships", async(req, res) => {
  try {
    const allScholars = await scholarship.find()
    res.json(allScholars)
  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }

})

// Get Single Scholarship Api 
app.get("/api/scholarships/:scholarId", async (req, res) =>{
  try {
    const scholarId = Number(req.params.scholarId)
    const foundScholar = await scholarship.findOne({ scholarshipId : scholarId})
    if(!foundScholar)
      return res.status(404).json({msg: "Scholarship doesn't found"})
    res.json(foundScholar)
  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

// Delete scholarship Api
app.delete("/api/scholarships/:scholarId", async (req, res) => {
  try {
    const deletedId = Number(req.params.scholarId)
    const deletedScholarship = await scholarship.deleteOne({scholarshipId : deletedId})
    if(scholarship.deletedCount === 0)
      return res.status(404).json("Scholarship Not Founded")
    console.log(deletedScholarship)
    res.json("Scholarship Deleted Success")

  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

// Add scholarship Api
app.post("/api/scholarships", async(req, res) => {
  try {
    const {scholarshipId, title, description, details} = req.body
    const newScholarship = new scholarship({
      scholarshipId,
      title,
      description,
      details
    })
    await newScholarship.save()
    res.status(201).json({
      msg: "Scholarship added Success",
      data: newScholarship
    })
  }
  catch(error){
    console.log(error)
    res.status(500).json({ msg: "Server Error" });
  }
})

// Update Scholarship Api
app.patch("/api/scholarships/:scholarshipId", async(req, res) => {
  const updatedScholarshipId = Number(req.params.scholarshipId)
  const updatedScholarship = await scholarship.findOneAndUpdate({scholarshipId : updatedScholarshipId},
    req.body,
    {new: "true"}
  )
  if(!updatedScholarshipId)
    return res.status(404).json({msg: "Scholarship Not Found"})
    res.status(200).json({
      msg: "Scholarship Updated Success",
      data: updatedScholarship
    })
})

//============================================================//
// run al port 3la 3000
app.listen (3000, () => {
  console.log("Workfiy Run on 3000")
})