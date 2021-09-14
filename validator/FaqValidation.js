const { isLength } = require("lodash");
const { BAD_REQUEST } = require("../utils/HTTP_Code");

exports.faqAddValidator = (req, res, next) => {
  req.check("question", "Question is Required.").notEmpty();
  req.check("answer", "Answer is Required.").notEmpty();

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
