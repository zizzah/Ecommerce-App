/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: "string", required: true },
    products: [
      {
        productID: { type: "string" },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, reqired: true },
    status: { type: "string", default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
