const express = require("express");

const {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, sellerOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/seller-orders", protect, sellerOnly, getSellerOrders);

router.put("/:id/status", protect, sellerOnly, updateOrderStatus);

module.exports = router;
