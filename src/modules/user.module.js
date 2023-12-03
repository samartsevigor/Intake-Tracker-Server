const db = require('../db/db');
const AuthService = require('../service/auth.service');

const getUserByEmail = async (email) => {
  try {
    const result = await db.pool.query('SELECT * FROM "user" WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      return result.rows[0];
    }
    console.log('User not found');
    return null;
  } catch (err) {
    console.error('Error querying user:', err);
    throw err;
  }
};

const createUser = async (email, password) => {
  try {
    const hash = await AuthService.hashPassword(password);
    const result = await db.pool.query(
      'INSERT INTO "user" (email, password, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *',
      [email, hash],
    );

    return result.rows[0];
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

const getUserById = async (userId) => {
  try {
    const query = 'SELECT id, email FROM "user" WHERE id = $1';
    const result = await db.pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

module.exports = {getUserByEmail, createUser, getUserById};
