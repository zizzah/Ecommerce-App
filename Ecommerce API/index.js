/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./route/user");
const authRoute = require("./route/Auth");
const productRoute = require("./route/product");
const cartRoute = require("./route/cart");
const orderRoute = require("./route/order");

const cors = require("cors");

dotenv.config();
mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB conneted successfuly "))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log("backend server");
});

app.use(cors());
app.use("/api", router);
app.use("/app/product", productRoute);
app.use("/app/cart", cartRoute);
app.use("/api/auth", authRoute);
app.use("/api/order", orderRoute);
