  const express = require("express")
  const cors = require("cors")
  const path = require("path")
  const app = express()
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "Views")))
  app.use(cors({
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: true
  }));

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
    userId: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    specialist: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
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
  // Get with limit
  app.get("/api/jobHome", async(req, res) => {

    try {
      let limit = Number(req.query.limit)
      let jobs = await job.find().limit(limit)
      res.json(jobs)
    }

    catch(error){
      console.log(error)
      res.status(500).json({ msg: "Server Error" });
    }
  })
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
  // Get Scholars with limits 
  app.get("/api/scholarshipHome", async(req, res) => {

    try {
      let limit = Number(req.query.limit)
      let scholarshipH = await scholarship.find().limit(limit)
      res.json(scholarshipH)
    }

    catch(error){
      console.log(error)
      res.status(500).json({ msg: "Server Error" });
    }
  })
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

  //===============================================================//
  // Login Api
  app.post("/api/login", async (req, res) => {
    try {
      
      const { email, password } = req.body;

      // Admin Check
      if (email === "admin@gmail.com" && password === "1234") {
        return res.json({
          msg: "Admin Login Success",

          isAdmin: true,
        });
      }
      else {
        const foundUser = await User.findOne({ email });

      if (!foundUser) {
        return res.json({
          msg: "Email Not Found",
        });
      }
      if (foundUser.password !== password) {
        return res.json({
          msg: "Wrong Password",
        });
      }
      // Normal User
      res.json({
        msg: "Login Success",

        isAdmin: false,
      });  
      }
    } 
    catch (error) {
      console.log(error);

      res.status(500).json({
        msg: error.message,
      });
    }
  });

  // Register Api
  app.post("/api/register", async (req, res) => {
    try {
      const { name, email, gender, password, specialist } = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.json({
          msg: "User Already Exists",
        });
      }

      // Get last userId and increment it
      const lastUser = await User.findOne().sort({ userId: -1 });
      let newUserId = 1;
      if (lastUser) {
        newUserId = lastUser.userId + 1;
      }

      const newUser = new User({
        userId: newUserId,
        name,
        email,
        gender,
        password,
        specialist,
      });
      await newUser.save();
      console.log(newUser);
      res.json({
        msg: "Register Success",
        data: newUser,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  });

  // Admin Api
  app.get("/api/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "Views", "admin.html"));
  });


  // Upload CV Api
  const multer = require("multer")

// إعداد مكان حفظ الـ CV
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")  
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage })

// Apply Job Api
app.post("/api/applyJob", upload.single("cv"), (req, res) => {
    try {
        let jobId = req.body.jobId
        let cvFile = req.file

        if (!cvFile) {
            return res.status(400).json({ msg: "من فضلك ارفع الـ CV" })
        }

        console.log("Job ID:", jobId)
        console.log("CV File:", cvFile.filename)

        res.status(200).json({ msg: "تم إرسال طلبك بنجاح!" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server Error" })
    }
})

// Apply Scholarship Api
app.post("/api/applyScholarship", upload.single("cv"), (req, res) => {
    try {
        let scholarshipId = req.body.scholarshipId
        let cvFile = req.file

        if (!cvFile) {
            return res.status(400).json({ msg: "من فضلك ارفع الـ CV" })
        }

        console.log("Scholarship ID:", scholarshipId)
        console.log("CV File:", cvFile.filename)

        res.status(200).json({ msg: "تم إرسال طلبك بنجاح!" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server Error" })
    }
})
  //============================================================//
  // run al port 3la 3000
  app.listen (3000, () => {
    console.log("Workfiy Run on 3000")
  })