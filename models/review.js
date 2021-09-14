const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    rideID: {
      type: ObjectId,
      ref: "Ride",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
