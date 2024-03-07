/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: "string", required: true },
    products: [
      {
        productID: { type: "string" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
