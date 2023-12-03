const {validationResult} = require('express-validator');

const requestValidator = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const errorMessages = errors.array().map((e) => {
      return {
        message: e.msg,
        field: e?.path,
      };
    });

    res.status(400).json({errors: errorMessages});
  };
};

module.exports = requestValidator;
