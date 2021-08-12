const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponScheema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
  },
  from: {
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
  },
  to: {
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoose.model("Coupon", couponScheema);
