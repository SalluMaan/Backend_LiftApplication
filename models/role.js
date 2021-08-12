const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const roleScheema = new mongoose.Schema({
  roleType: {
    type: String,
    required: true,
  },
  roleID: {
    type: Number,
    required: true,
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

module.exports = mongoose.model("Role", roleScheema);
