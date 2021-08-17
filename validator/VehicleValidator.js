const { BAD_REQUEST } = require("../utils/HTTP_Code");

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
    return res.status(BAD_REQUEST).json({ error: firstError });
  }

  //proceed to next middleware
  next();
};
