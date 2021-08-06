const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const vehicleScheema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  numberPlate: {
    type: String,
    required: true,
    trim: true,
  },
  modalYear: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  Colour: {
    type: String,
    required: true,
  },
  seatCapacity: {
    type: Number,
    required: true,
  },
  isAC: {
    type: Boolean,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  vehicleImage: {
    type: String,
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

module.exports = mongoose.model("Vehicle", vehicleScheema);
