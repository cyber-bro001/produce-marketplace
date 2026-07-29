const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, sellerOnly } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { productRules, updateProductRules } = require("../validators/productValidators");

const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/",            getProducts);
router.get("/my-products", protect, sellerOnly, getMyProducts);
router.get("/:id",         getProductById);

router.post(
  "/",
  protect,
  sellerOnly,
  upload.single("image"),
  productRules,
  validate,
  createProduct,
);

router.put(
  "/:id",
  protect,
  sellerOnly,
  upload.single("image"),
  updateProductRules,
  validate,
  updateProduct,
);

router.delete("/:id", protect, sellerOnly, deleteProduct);

module.exports = router;
