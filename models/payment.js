const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const paymentScheema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "pending",
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoose.model("Payment", paymentScheema);
