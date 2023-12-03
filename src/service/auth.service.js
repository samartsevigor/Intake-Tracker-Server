const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {SECRET_KEY} = require('../constants/constants');

const generateAccessToken = (userId) => {
  const payload = {id: userId};
  return jwt.sign(payload, SECRET_KEY, {expiresIn: '7d'});
};

const formatUserWithNewToken = (user, token) => {
  delete user.password;
  return {user, token};
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const hashPassword = async (password) => {
  const saltRounds = 10;

  try {
    return bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
};

module.exports = {
  generateAccessToken, formatUserWithNewToken, hashPassword, comparePassword,
};
