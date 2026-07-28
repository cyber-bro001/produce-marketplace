const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product and quantity are required.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available.",
      });
    }

    const totalPrice = quantity * product.price;

    const order = await Order.create({
      buyer: req.user._id,
      seller: product.seller,
      product: product._id,
      quantity,
      totalPrice,
    });

    product.quantity -= quantity;

    if (product.quantity === 0) {
      product.availability = false;
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than zero.",
      });
    }

    if (!product.availability) {
      return res.status(400).json({
        success: false,
        message: "Product is unavailable.",
      });
    }

    await product.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyer: req.user._id,
    })
      .populate("product")
      .populate("seller", "name phone email");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      seller: req.user._id,
    })
      .populate("buyer", "name phone email")
      .populate("product");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const allowedStatus = ["Pending", "Confirmed", "Completed", "Cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    if (order.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
};
