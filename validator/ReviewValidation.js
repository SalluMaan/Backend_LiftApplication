const { isLength } = require("lodash");
const { BAD_REQUEST } = require("../utils/HTTP_Code");

exports.reviewAddValidator = (req, res, next) => {
  req
    .check("rating", "Rating is Required.")
    .notEmpty()
    .isInt({ min: 0, max: 5 })
    .withMessage("Rating must be greater than 0 and max is 5.");
  req
    .check(
      "comment",
      "Comment is Required.Kindly Write Some Words for the Ride."
    )
    .notEmpty();
  req.check("rideID", "Ride ID is Required.").notEmpty();

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
