const express = require("express");

const {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, sellerOnly, buyerOnly } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { createOrderRules } = require("../validators/orderValidators");

const router = express.Router();

router.post("/",              protect, buyerOnly, createOrderRules, validate, createOrder);
router.get("/my-orders",      protect, getMyOrders);
router.get("/seller-orders",  protect, sellerOnly, getSellerOrders);
router.put("/:id/status",     protect, sellerOnly, updateOrderStatus);

module.exports = router;
