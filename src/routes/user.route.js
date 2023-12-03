const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

const app = express.Router();

app.get('/me', authMiddleware, UserController.getMe);

module.exports = app;
