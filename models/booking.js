const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookingScheema = new mongoose.Schema({
  status: {
    type: String,
    default: "pending",
  },
  rideID: {
    type: ObjectId,
    required: true,
    ref: "Ride",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  pickupID: {
    type: ObjectId,
    required: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoose.model("Booking", bookingScheema);
