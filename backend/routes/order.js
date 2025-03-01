import Order from "../models/Order.js";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken.js";
import express from "express";

const router = express.Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ORDERS BY SPECIFIC DATE (with status and total sales)
router.get("/day/:date", verifyTokenAndAdmin, async (req, res) => {
  const { date } = req.params; // Expected format: 'YYYY-MM-DD'
  const { status } = req.query; // Optional query to filter by status ('pending', 'completed', etc.)

  try {
    // Convert the date to a JavaScript Date object
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1); // Set to the next day for range comparison

    // Find orders within that date range
    let query = { createdAt: { $gte: startDate, $lt: endDate } };

    if (status) {
      query.status = status; // Add status filter if provided
    }

    const orders = await Order.find(query);

    // Calculate total sales
    const totalSales = orders.reduce((acc, order) => acc + order.amount, 0);

    // Count orders by status
    const statusCount = {
      pending: orders.filter(order => order.status === 'pending').length,
      completed: orders.filter(order => order.status === 'completed').length,
      // Add other statuses as necessary
    };

    // Return the results
    res.status(200).json({
      orders,
      totalSales,
      statusCount,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;
