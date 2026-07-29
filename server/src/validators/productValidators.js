const { body } = require("express-validator");

const productRules = [
  body("name").trim().notEmpty().withMessage("Name is required."),

  body("description").trim().notEmpty().withMessage("Description is required."),

  body("category").trim().notEmpty().withMessage("Category is required."),

  body("price")
    .notEmpty().withMessage("Price is required.")
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number."),

  body("unit").trim().notEmpty().withMessage("Unit is required."),

  body("quantity")
    .notEmpty().withMessage("Quantity is required.")
    .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer."),
];

// For updates, every field is optional — only validate the ones that are present.
const updateProductRules = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty."),

  body("description").optional().trim().notEmpty().withMessage("Description cannot be empty."),

  body("category").optional().trim().notEmpty().withMessage("Category cannot be empty."),

  body("price")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number."),

  body("quantity")
    .optional()
    .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer."),

  body("unit").optional().trim().notEmpty().withMessage("Unit cannot be empty."),

  body("availability")
    .optional()
    .isBoolean().withMessage("Availability must be true or false."),
];

module.exports = { productRules, updateProductRules };
