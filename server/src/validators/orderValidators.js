const { body } = require("express-validator");

const createOrderRules = [
  body("productId")
    .notEmpty().withMessage("Product ID is required.")
    .isMongoId().withMessage("Product ID must be a valid ID."),

  body("quantity")
    .notEmpty().withMessage("Quantity is required.")
    .isInt({ min: 1 }).withMessage("Quantity must be a positive integer."),
];

module.exports = { createOrderRules };
