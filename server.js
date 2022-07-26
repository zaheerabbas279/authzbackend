// const express = require("express");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const createError = require("http-errors");
// const cors = require("cors");
// const { verifyAccessToken } = require("./helpers/jwt_helper");

// require("dotenv").config();
// require("./helpers/init_mongodb");

// const AuthRoutes = require("./Routes/Auth.route");
// const UserRoutes = require("./Routes/User.route");

// const app = express();

// // app.use(morgan(dev));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(cors());
// app.use(express.urlencoded({ limit: "30mb", extended: true }));

// app.get("/", (req, res, next) => {
//   res.send("Pong");
// });

// app.use("/auth", AuthRoutes);
// app.use("/user", verifyAccessToken, UserRoutes);

// // app.use((err, req, res, next) => {
// //   res.status(err.status || 500);
// //   res.send({
// //     error: err.status || 500,
// //     message: err.message,
// //   });
// // });

// // const PORT = process.env.PORT || 3100;

// app.listen(process.env.PORT || 4000, () => {
//   console.log(`Server running on the port process.env.PORT`);
// });

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const AuthRoutes = require("./Routes/Auth.route");
const UserRoutes = require("./Routes/User.route");
const { verifyAccessToken } = require("./helpers/jwt_helper");

// const config = require("./config/auth_config/index");
// const { verifyAuthToken } = require("./config/auth_middleware");

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//mong
mongoose
  .connect(
    "mongodb+srv://ZaheerDBUser:zahir%40216@cluster0.gnt9x.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "AuthDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("========> app starterd success <============");
    });
  })
  .catch((err) => {
    console.log("err in connection", err);
  });
app.get("/", (req, res) => {
  res.send("pong");
});
app.use("/auth", AuthRoutes);
app.use("/user", verifyAccessToken, UserRoutes);
