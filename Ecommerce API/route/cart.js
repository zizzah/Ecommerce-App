/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const {
  verifyToken,
  verifyTokenAuthorizetion,
  verifyTokenAndAdmin,
} = require("./verify");
const router = express.Router();
const Cart = require("../model/Cart");

// upload Cart
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update Cart

router.put("/:id", verifyTokenAuthorizetion, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delet Cart
router.delete("/:id", verifyTokenAuthorizetion, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted .... ");
  } catch (error) {
    res.status.json(error);
  }
});

// get Cart

router.get("/find/:userId", verifyTokenAuthorizetion, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart);
  } catch (error) {
    res.status.json(error);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (error) {
    res.status.json(error);
  }
});

module.exports = router;
