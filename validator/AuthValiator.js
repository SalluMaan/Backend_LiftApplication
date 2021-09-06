const { BAD_REQUEST } = require("../utils/HTTP_Code");

exports.userSignUpValidator = (req, res, next) => {
  req.check("name", "Name is Require.Kindly Write Your Name!Thanks").notEmpty();
  req
    .check("email", "Email is Require.Kindly Write Your Valid Email ID!Thanks")
    .notEmpty();
  req.check("password", "Password is Required.Write Your Password").notEmpty();
  req
    .check("phoneNumber", "Phone Number is Required.Write Your Phone Number")
    .notEmpty();
  req
    .check("dateOfBirth", "Date Of Birth is Required.Write Your Date Of Birth.")
    .notEmpty();
  // req
  //   .check("OTPCode", "OTP Code is Required.We'll verify your Phone Number.")
  //   .notEmpty();

  // req
  //   .check("OTPCode", "OTPCode must be 4 Digits Number.")
  //   .isLength({ min: 4, max: 4 })
  //   .withMessage("OTPCode must contain at least 4 charcter.")
  //   .matches(/\d/)
  //   .withMessage("Password must contain a number.");

  req
    .check("email", "Email must be 3 to 32 chracters.")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @.")
    .isLength({
      min: 4,
      max: 2000,
    });

  req
    .check(
      "password",
      "Password must be greater than 6 charcter and max is 10 chracter."
    )
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 charcter.")
    .matches(/\d/)
    .withMessage("Password must contain a number.");

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

exports.userSignInValidator = (req, res, next) => {
  req
    .check("email", "Email is Require.Kindly Write Your Valid Email ID!Thanks")
    .notEmpty();

  req.check("password", "Password is Required.Write Your Password").notEmpty();
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

exports.userResetPasswordValidator = (req, res, next) => {
  req.check("id", "id(User ID) is Require.").notEmpty();
  req
    .check(
      "resetToken",
      "Reset Token(resetToken) is Require.Check your Inbox!Thanks"
    )
    .notEmpty();

  req.check("password", "Password is Required.Write Your Password").notEmpty();
  req
    .check(
      "password",
      "Password must be greater than 6 charcter and max is 10 chracter."
    )
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 charcter.")
    .matches(/\d/)
    .withMessage("Password must contain a number.");

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

exports.userFogotPasswordValidator = (req, res, next) => {
  req
    .check("email", "Email is Require.Kindly Write Your Valid Email ID!Thanks")
    .notEmpty()
    .isEmail()
    .withMessage("invalid email format");

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
