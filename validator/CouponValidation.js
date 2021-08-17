const { BAD_REQUEST } = require("../utils/HTTP_Code");

exports.couponAddValidator = (req, res, next) => {
  req
    .check("title", "Title is Require.Kindly Write Title for Coupon.")
    .notEmpty();
  req
    .check("code", "Code is Require.Kindly Write Unique Code for Coupon.")
    .notEmpty();
  req.check("from", "Departure Location is Required.").notEmpty();
  req.check("to", "Arrival Location is Required.").notEmpty();
  //check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    // console.log("ERROR 1st:".firstError)
    return res.status(BAD_REQUEST).json({ error: firstError });
  }

  //proceed to next middleware
  next();
};
