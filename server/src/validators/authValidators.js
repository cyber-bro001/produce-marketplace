const { body } = require("express-validator");

const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required."),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Must be a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required.")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone number is required."),

  body("role")
    .notEmpty().withMessage("Role is required.")
    .isIn(["buyer", "seller"]).withMessage("Role must be 'buyer' or 'seller'."),
];

const loginRules = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Must be a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required."),
];

module.exports = { registerRules, loginRules };
