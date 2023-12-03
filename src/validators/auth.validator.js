const {body} = require('express-validator');
const requestValidator = require('../middleware/validator');

const authValidator = requestValidator([
  body('email', 'Email is empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 8 characters').isLength({min: 8}),
]);

module.exports = {authValidator};
