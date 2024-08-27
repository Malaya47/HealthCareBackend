const express = require("express");
const app = express();

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
};

const { intializeDatabase } = require("./db.connect");
const Doctor = require("./models/doctorsInfo.models");

app.use(express.json());
app.use(cors(corsOptions));

intializeDatabase();

app.get("/", (req, res) => {
  res.send("Express server is live");
});

// creating data and posting it
app.post("/addDoctor", async (req, res) => {
  try {
    const createDoctor = new Doctor(req.body);
    const saveDoctor = await createDoctor.save();

    if (saveDoctor) {
      res.status(201).json({
        message: "Data created successfully",
        createDoctor: createDoctor,
      });
    } else {
      res.status(401).json({ message: "An error occured while adding data" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occured while creating data" });
  }
});

// To get all doctors
app.get("/doctors", async (req, res) => {
  try {
    const allDoctors = await Doctor.find();
    if (allDoctors.length > 0) {
      res
        .status(200)
        .json({ message: "Doctors found", allDoctors: allDoctors });
    } else {
      res.status(404).json({ message: "Doctors are not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch events." });
  }
});

// To get doctors on the basis of name
app.get("/doctor/:doctorName", async (req, res) => {
  try {
    const foundDoctor = await Doctor.findOne({ name: req.params.doctorName });
    // console.log(foundDoctor);
    if (foundDoctor) {
      res.status(200).json({
        message: "Doctor found successfully",
        foundDoctor: foundDoctor,
      });
    } else {
      res.status(404).json({
        message: "Doctor not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get Doctors data" });
  }
});

const PORT = 3000;
app.listen(() => {
  console.log(`Server is running on PORT ${PORT}`);
});
