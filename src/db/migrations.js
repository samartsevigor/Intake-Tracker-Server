const pg = require('pg');
const db = require('./db');

const pool = new pg.Pool(db.config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

const createTables = async () => {
  const userTable = `CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )`;

  const medicationTable = `CREATE TABLE IF NOT EXISTS Medication (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255),
      count INT DEFAULT 0,
      destination_count INT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      user_id INT REFERENCES "user"(id) ON DELETE CASCADE NOT NULL
    )`;

  try {
    await pool.query(userTable);
    console.log('User table created successfully');

    await pool.query(medicationTable);
    console.log('Medication table created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    pool.end();
  }
};

createTables();
