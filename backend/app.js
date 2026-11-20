const bufferMod = require("buffer");
if (!bufferMod.SlowBuffer) {
  bufferMod.SlowBuffer = bufferMod.Buffer;
}

const express = require("express");
const path = require("path");
const logger = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const connectToDatabase = require("./utils/db");
const mongoose = require("mongoose");
const { corsOptions } = require("./routes/cors");

mongoose.set("useCreateIndex", true);
mongoose.set("strictQuery", false);
mongoose.set("bufferCommands", false);

const index = require("./routes/index");
const users = require("./routes/users");
const cloth = require("./routes/clothesRouter");
const order = require("./routes/orderRouter");
const voucher = require("./routes/voucherRouter");
const mail = require("./routes/mailRouter");

const app = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// Ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error("Error connecting to DB:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

app.use("/", index);
app.use("/users", users);
app.use("/clothes", cloth);
app.use("/orders", order);
app.use("/mail", mail);
app.use("/voucher", voucher);
app.use(express.static(path.join(__dirname, "public")));

// Catch 404
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// JSON-safe error handler so CORS headers remain intact on 4xx/5xx responses
app.use(function (err, req, res, next) {
  console.error(err.stack || err.message);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
});

// Start server (used locally only — not needed for Vercel)
if (!process.env.VERCEL) {
  const http = require("http");
  const server = http.createServer(app);
  server.setTimeout(10000);
  server.listen(process.env.PORT || 9000, () => {
    console.log("Server listening on port", process.env.PORT || 9000);
  });
}

module.exports = app;
