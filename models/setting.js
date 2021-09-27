const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const settingScheema = new mongoose.Schema({
  nameOfApp: {
    type: String,
  },
  baseUrl: {
    type: String,
  },
  city: {
    type: String,
  },
  baseUrl: {
    type: String,
  },
  logo: {
    type: String,
  },
  chatLink: {
    type: String,
  },
  colorList: [
    {
      type: String,
    },
  ],
  adminShare: {
    type: Number,
  },
  firebaseID: {
    type: String,
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

module.exports = mongoose.model("Setting", settingScheema);
