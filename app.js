require("express-async-errors");
const winston = require("winston");
const express = require("express");
const session = require("express-session");
require("winston-mongodb");
require("cookie-parser");
require("express-async-errors");
const app = express();
require("./middlawere/prod")(app);
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const coursesRoutes = require("./routes/courses");
const availabilityRoutes = require("./routes/availabilities");
const accountRoute = require("./routes/account");
const dateRoute = require("./routes/booking");
const users = require("./routes/users");
const auth = require("./routes/auth");
const bookinRoute = require("./routes/bookingCourse");
const shopRoute = require("./routes/shop");
const successRoute = require("./routes/successfullPayment");
const ordersRoute = require("./routes/orders");
const isAuthRoute = require("./routes/isAuth");
const error = require("./middlawere/error");
const cookieParser = require("cookie-parser");
const passwordReset = require("./routes/passwordReset");
const orderSummaryRoute = require("./routes/orderSummary");
process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});
process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});
winston.add(
  new winston.transports.MongoDB({
    db: process.env.MONGODB_URI,
    collection: "log",
    level: "info",
  })
);
app.use(cookieParser());
const PORT = process.env.PORT;
dotenv.config({ path: "./config.env" });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(`App running on Port ${PORT}`);
mongoose.connection.on("connected", () => {
  console.log("mongoose is connected");
});
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://stark-escarpment-40731.herokuapp.com"
    //"http://localhost:3000"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  app.use(cors({ credentials: true, origin: true }));
  next();
});

app.use("/setDate", dateRoute);
app.use("/users", users);
app.use("/courses", coursesRoutes);
app.use("/availability", availabilityRoutes);
app.use("/auth", auth);
app.use("/shop", shopRoute);
app.use("/checkout", bookinRoute);
app.use("/success", successRoute);
app.use("/orders", ordersRoute);
app.use("/isAuth", isAuthRoute);
app.use("/password-reset", passwordReset);
app.use("/ordersSummary", orderSummaryRoute);
app.use("/account", accountRoute);
app.use(error);
app.listen(PORT);
