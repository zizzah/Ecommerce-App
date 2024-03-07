/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: "string", required: true },
    desc: { type: "string", required: true },

    img: {
      type: "string",
      required: true,
    },

    category: {
      type: "array",
    },

    size: {
      type: "string",
    },

    price: { type: Number, required: true },

    color: {
      type: "string",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
