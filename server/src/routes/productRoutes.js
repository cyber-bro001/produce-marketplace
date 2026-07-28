const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, sellerOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, sellerOnly, createProduct);

router.put("/:id", protect, sellerOnly, updateProduct);

router.delete("/:id", protect, sellerOnly, deleteProduct);

module.exports = router;
