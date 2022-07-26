const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const cors = require("cors");
const { verifyAccessToken } = require("./helpers/jwt_helper");

require("dotenv").config();
require("./helpers/init_mongodb");

const AuthRoutes = require("./Routes/Auth.route");
const UserRoutes = require("./Routes/User.route");

const app = express();

// app.use(morgan(dev));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res, next) => {
  res.send("Pong");
});

app.use("/auth", AuthRoutes);
app.use("/user", verifyAccessToken, UserRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: err.status || 500,
    message: err.message,
  });
});

// const PORT = process.env.PORT || 3100;

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on the port ${PORT}`);
});
