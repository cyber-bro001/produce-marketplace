const express = require("express");
const rateLimit = require("express-rate-limit");

const { register, login } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { registerRules, loginRules } = require("../validators/authValidators");

const router = express.Router();

// 10 attempts per 15 minutes per IP — blocks credential-stuffing without
// affecting legitimate users who rarely hit this more than once or twice.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again in 15 minutes.",
  },
});

router.post("/register", authLimiter, registerRules, validate, register);
router.post("/login",    authLimiter, loginRules,    validate, login);

router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
