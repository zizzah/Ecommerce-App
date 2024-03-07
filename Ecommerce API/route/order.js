/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const { verifyToken, verifyTokenAndAdmin } = require("./verify");
const router = express.Router();
const Order = require("../model/Order");

// POST ORDER
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update Cart

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delet ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted .... ");
  } catch (error) {
    res.status.json(error);
  }
});

// get A PARTICULAR  ORDER

router.get("/find/:userId", async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });

    res.status(200).json(order);
  } catch (error) {
    res.status.json(error);
  }
});

// GET ALL ORDER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    res.status.json(error);
  }
});

// GET STATS

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previusMonth = new Date(date.setMonth(lastMonth.getMonth() - 1)); // Corrected line
  try {
    const income = Order.aggregate([
      { $match: { createdAt: { $gte: previusMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } }, // Fixed field name
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to calculate all orders each month
router.get("/monthly", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Get all orders from the database
    const allOrders = await Order.find();

    // Initialize an object to store monthly order totals
    const monthlyTotals = {};

    // Iterate over each order
    allOrders.forEach((order) => {
      const orderDate = order.createdAt;
      const monthYear = `${
        orderDate.getMonth() + 1
      }-${orderDate.getFullYear()}`;

      // If the month is not in the monthlyTotals object, initialize it
      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = { totalAmount: 0, orderCount: 0 };
      }

      // Add the order amount to the monthly total
      monthlyTotals[monthYear].totalAmount += order.amount;
      monthlyTotals[monthYear].orderCount++;
    });

    // Send the monthly totals as a JSON response
    res.json(monthlyTotals);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/orders/monthly", async (req, res) => {
  try {
    // Get all orders from the database
    const allOrders = await Order.find();

    // Calculate monthly totals and order counts using reduce
    const monthlyData = allOrders.reduce((data, order) => {
      const orderDate = order.createdAt;
      const monthYear = `${
        orderDate.getMonth() + 1
      }-${orderDate.getFullYear()}`;

      // If the month is not in the data object, initialize it
      if (!data[monthYear]) {
        data[monthYear] = { totalAmount: 0, orderCount: 0 };
      }

      // Add the order amount to the monthly total
      data[monthYear].totalAmount += order.amount;

      // Increment the order count for the month
      data[monthYear].orderCount++;

      return data;
    }, {});

    // Send the monthly data as a JSON response
    res.json(monthlyData);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
