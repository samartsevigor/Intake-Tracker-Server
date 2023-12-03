const express = require('express');
const AuthController = require('../controllers/auth.controller');
const AuthValidator = require('../validators/auth.validator');

const app = express.Router();

app.post('/signup', AuthValidator.authValidator, AuthController.signup);
app.post('/login', AuthValidator.authValidator, AuthController.login);

module.exports = app;
