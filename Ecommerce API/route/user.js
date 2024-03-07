/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const { verifyTokenAuthorizetion, verifyTokenAndAdmin } = require("./verify");
const router = express.Router();
const User = require("../model/Users");
const cryptoJs = require("crypto-js");

router.put("/:id", verifyTokenAuthorizetion, async (req, res) => {
  if (req.body.passwod) {
    req.body.passwod = cryptoJs
      .AES(req.body.password, process.env.PASSORD_SEC)
      .toString();
  }
  try {
    const updatedCostomer = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCostomer);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE USER
router.delete("/:id", verifyTokenAuthorizetion, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted .... ");
  } catch (error) {
    res.status.json(error);
  }
});

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status.json(error);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status.json(error);
  }
});

// STATS

// Assuming verifyTokenAndAdmin middleware is correctly implemented
router.get("/stats", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);

    res.status(200).json(data);
  } catch (error) {
    // Pass the error to the global error handler
    next(error);
  }
});

module.exports = router;
