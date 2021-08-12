const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const rideScheema = new mongoose.Schema({
  pickup: {
    Longitude: {
      type: String,
    },
    Latitude: {
      type: String,
    },
  },
  dropoff: {
    Longitude: {
      type: String,
    },
    Latitude: {
      type: String,
    },
  },

  //   bestRoute: { Location },
  addStop: [
    {
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
    },
  ],
  departureDate: {
    type: Date,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  farePerTicket: {
    type: String,
    required: true,
  },
  seatCapacity: {
    type: Number,
    required: true,
  },
  isMiddleSeatAvailable: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  status: {
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

module.exports = mongoose.model("Ride", rideScheema);
