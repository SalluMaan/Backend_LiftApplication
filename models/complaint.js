const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const complaintScheema = new mongoose.Schema({
  issueTitle: {
    type: String,
  },
  issueDescription: {
    type: String,
  },
  rideID: {
    type: ObjectId,
    ref: "Ride",
  },
  issueImage: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoose.model("Complaint", complaintScheema);
