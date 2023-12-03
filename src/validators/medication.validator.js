const {body} = require('express-validator');
const requestValidator = require('../middleware/validator');

const medicationValidator = requestValidator([
  body('name', 'Name is empty').not().isEmpty(),
  body('description', 'Description is empty').not().isEmpty(),
  body('count', 'Count should be a number').optional().isInt().custom((value) => {
    if (value < 0) {
      throw new Error('Count should be greater than or equal to zero');
    }
    return true;
  }),
  body('destinationCount', 'Destination Count should be a number').optional().isInt().custom((value) => {
    if (value < 0) {
      throw new Error('Destination Count should be greater than or equal to zero');
    }
    return true;
  }),
]);

const medicationValidatorForPut = requestValidator([
  body('name', 'Name is empty').optional().notEmpty(),
  body('description', 'Description is empty').optional().notEmpty(),
  body('count', 'Count should be a number').optional().isInt().custom((value) => {
    if (value < 0) {
      throw new Error('Count should be greater than or equal to zero');
    }
    return true;
  }),
  body('destinationCount', 'Destination Count should be a number').optional().isInt().custom((value) => {
    if (value < 0) {
      throw new Error('Destination Count should be greater than or equal to zero');
    }
    return true;
  }),
]);

module.exports = {medicationValidator, medicationValidatorForPut};
