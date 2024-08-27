const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    experience: {
      type: Number,
      min: 0,
      max: 60,
    },
    specialisation: {
      type: String,
    },
    description: {
      type: String,
    },
    workExperience: [
      {
        type: String,
      },
    ],
    education: [
      {
        type: String,
      },
    ],
    OPDTiming: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
