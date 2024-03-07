/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const { verifyTokenAndAdmin } = require("./verify");
const router = express.Router();
const Product = require("../model/Product");

// upload product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update product

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delet product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been deleted .... ");
  } catch (error) {
    res.status.json(error);
  }
});

// get

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status.json(error);
  }
});

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let product;
    if (qNew) {
      product = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      product = await Product.find({ category: { $in: [qCategory] } });
    } else {
      product = await Product.find();
    }

    res.status(200).json(product);
  } catch (error) {
    res.status.json(error);
  }
});

module.exports = router;
