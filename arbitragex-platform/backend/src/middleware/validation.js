const { body, validationResult } = require('express-validator');

const validationRules = {
  executeArbitrage: [
    body('dexA').notEmpty().withMessage('DEX A is required'),
    body('dexB').notEmpty().withMessage('DEX B is required'),
    body('tokenPair').notEmpty().withMessage('Token pair is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
  ],
};

exports.validate = (ruleName) => {
  return async (req, res, next) => {
    const rules = validationRules[ruleName];

    if (!rules) {
      return next();
    }

    await Promise.all(rules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  };
};
