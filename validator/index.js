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
  req
    .check("OTPCode", "OTP Code is Required.We'll verify your Phone Number.")
    .notEmpty();

  req
    .check("OTPCode", "OTPCode must be 4 Digits Number.")
    .isLength({ min: 4, max: 4 })
    .withMessage("OTPCode must contain at least 4 charcter.")
    .matches(/\d/)
    .withMessage("Password must contain a number.");

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
    return res.status(400).json({ error: firstError });
  }

  //proceed to next middleware
  next();
};

exports.vehicleAddValidator = (req, res, next) => {
  req
    .check("name", "Name is Require.Kindly Write Your Vehicle Name.")
    .notEmpty();
  req
    .check(
      "numberPlate",
      "Number Plate is Require.Kindly Write Your Vehicle Valid Number Plate."
    )
    .notEmpty();
  req
    .check("modalYear", "Modal Year is Required.Write Your Vehicle Modal Year.")
    .notEmpty();
  req
    .check("brandName", "Brand Name is Required.Write Your Vehicle Brand Name.")
    .notEmpty();
  req
    .check("Colour", "Colour is Required.Write Your Vehicle Colour.")
    .notEmpty();
  req
    .check(
      "seatCapacity",
      "Seat Capacity is Required.Enter the number of Seats."
    )
    .notEmpty();

  req
    .check(
      "isAC",
      "AC is Required.Please Let us Know You have AC in your Vehicle."
    )
    .notEmpty();
  //check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    // console.log("ERROR 1st:".firstError)
    return res.status(400).json({ error: firstError });
  }

  //proceed to next middleware
  next();
};

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
    return res.status(400).json({ error: firstError });
  }

  //proceed to next middleware
  next();
};
