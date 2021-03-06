const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pickupPointScheema = new mongoose.Schema({
  name: {
    type: String,
  },
  Longitude: {
    type: String,
  },
  Latitude: {
    type: String,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  fare: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ride: {
    type: ObjectId,
    ref: "Ride",
  },
});

module.exports = mongoose.model("PickupPoint", pickupPointScheema);
