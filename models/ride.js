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
    name: {
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
    name: {
      type: String,
    },
  },

  pickupPoints: [
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
      fare: {
        type: String,
        required: true,
      },
      description: {
        type: String,
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
  seatAvailable: {
    type: Number,
  },
  isSeatAvailable: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
  seatFor: {
    type: String,
    default: "both",
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
