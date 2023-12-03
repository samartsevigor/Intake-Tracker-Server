const {Pool} = require('pg');
const {
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = require('../constants/constants');

const config = {
  user: DATABASE_USER,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  max: 10,
  idleTimeoutMillis: 15000,
};

const pool = new Pool(config);

module.exports = {pool};
