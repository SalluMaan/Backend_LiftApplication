const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  hashed_password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  idCardNumber: {
    type: String,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  dateOfBirth: {
    type: String,
  },
  // OTPCode: {
  //   type: Number,
  //   default: true,
  // },
  wallet: {
    type: Number,
    default: 0,
  },
  userType: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isLicenseVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneNumberVerified: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    default: null,
  },
  drivingLicense: {
    type: String,
  },
  type: {
    type: String,
  },
  resetToken: {
    type: String,
    require: false,
  },
  updated: Date,
});

//virtual
userSchema
  .virtual("password")
  .set(function (password) {
    //create temp var _password
    this._password = password;
    //generate a timestamp
    this.salt = uuidv1();
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
