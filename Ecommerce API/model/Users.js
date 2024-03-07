/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: "string", required: true, unique: true },
    email: { type: "string", required: true, unique: true },

    password: {
      type: "string",
      required: true,
    },
    isAdmin: {
      type: "boolean",
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", userSchema);
