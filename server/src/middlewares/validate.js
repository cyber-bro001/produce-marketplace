const { validationResult } = require("express-validator");

/**
 * Reads the result of express-validator checks on the request.
 * If any fail, returns 422 with a structured error list so the
 * client knows exactly which field is wrong and why.
 * If all pass, hands off to the next middleware/controller.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  next();
};

module.exports = validate;
