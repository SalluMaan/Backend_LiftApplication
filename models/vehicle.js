const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

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
  vehicleImage: {
    type: String,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoose.model("Vehicle", vehicleScheema);
