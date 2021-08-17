const { BAD_REQUEST } = require("../utils/HTTP_Code");

exports.complaintsAddValidator = (req, res, next) => {
  req.check("issueTitle", "Kindly Specify Issue in 2 or 3 Words.").notEmpty();
  req
    .check("issueDescription", "Kindly Briefly Explain Your Queries.")
    .notEmpty();
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
