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

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

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
mongoose
  .connect(process.env.MongoURI, { useNewUrlParser: true })
  .then((d) => console.log("db Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB Connection Error ${err.message}`);
});

// app.use(express.json())
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors());
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!invalid token..." });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("A Node JS API is listening on PORT:", port);
});
