const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressValidator = require("express-validator");
var cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const cors = require("cors");
dotenv.config();
// const stripe = require("stripe")(process.env.SECRET_KEY);

const path = require("path");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const vehicleRoutes = require("./routes/vehicle");
const rideRoutes = require("./routes/ride");
const couponRoutes = require("./routes/coupon");
const settingRoutes = require("./routes/setting");
const complaintRoutes = require("./routes/complaint");
const paymentRoutes = require("./routes/payment");
const bookingRoutes = require("./routes/booking");
const faqRoutes = require("./routes/faq");
const reviewRoutes = require("./routes/review");

mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((d) => console.log("db Connected"))
  .catch((err) => console.log("Error:", err));

mongoose.connection.on("error", (err) => {
  console.log(`DB Connection Error ${err.message}`);
});

// app.use(express.json())
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static("uploads"));

app.use(cors());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", vehicleRoutes);
app.use("/", rideRoutes);
app.use("/", couponRoutes);
app.use("/", settingRoutes);
app.use("/", complaintRoutes);
app.use("/", paymentRoutes);
app.use("/", bookingRoutes);
app.use("/", faqRoutes);
app.use("/", reviewRoutes);

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "./views")));

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!invalid token..." });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("A Node JS API is listening on PORT:", port);
});

var Publishable_Key =
  "pk_test_51HQydyBQy6XzSUHh6BD33DNt0jvs3RsYs3v3M2Es6fr5g31pKzk2oVsEsO5uK3YIaCaXQRucApnxYUco3DkOflRK009KLys9Mz";
var Secret_Key =
  "sk_test_51HQydyBQy6XzSUHhniSsWWsfUJ6iLLvRwktWHvmp1A1KywHhmRytS6tWybaeYIJFSgwXu7oia5B3Q7pP4bplckyt00mNBm9emn";
const stripe = require("stripe")(Secret_Key);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/stripe-pay/:amount", function (req, res) {
  res.locals.url = req.originalUrl;
  var amount = res.locals.url;
  amount = amount.split("/stripe-pay/");
  console.log("URL=>", amount[1], typeof amount[1]);
  res.render("Home", {
    key: Publishable_Key,
    amount: Number(amount[1]),
  });
});

app.post("/stripe-pay/payment", function (req, res) {
  // Moreover you can take more details from user
  // like Address, Name, etc from form
  console.log("End Request =>", req.body);
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "John Doe",
      address: {
        line1: "TC 9/4 Old MES colony",
        postal_code: "110092",
        city: "New Delhi",
        state: "Delhi",
        country: "India",
      },
    })
    .then((customer) => {
      console.log("First Then=>", customer);
      return stripe.charges.create({
        amount: req.body.amount, // Charing Rs 25
        description: "Payment Liftick App",
        currency: "USD",
        customer: customer.id,
      });
    })
    .then((charge) => {
      console.log("Second Then=>", charge);
      // res.send("Success"); // If no error occurs receipt_url
      res.render("complete");
    })
    .catch((err) => {
      res.send(err); // If some error occurs
    });
});

// const options = {
//   autoIndex: false, // Don't build indexes
//   reconnectTries: 30, // Retry up to 30 times
//   reconnectInterval: 500, // Reconnect every 500ms
//   poolSize: 10, // Maintain up to 10 socket connections
//   // If not connected, return errors immediately rather than waiting for reconnect
//   bufferMaxEntries: 0,
// };

// const connectWithRetry = () => {
//   console.log("MongoDB connection with retry");
//   mongoose
//     .connect("mongodb://localhost:27017/nodeapi", options)
//     .then(() => {
//       console.log("MongoDB is connected");
//     })
//     .catch((err) => {
//       console.log("MongoDB connection unsuccessful, retry after 5 seconds.");
//       setTimeout(connectWithRetry, 5000);
//     });
// };

// connectWithRetry();
