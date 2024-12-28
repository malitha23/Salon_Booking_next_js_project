import mysql from 'mysql2/promise';

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Use the DB_HOST from the .env file
  user: process.env.DB_USER,       // Use the DB_USER from the .env file
  password: process.env.DB_PASSWORD,  // Use the DB_PASSWORD from the .env file
  database: process.env.DB_NAME,   // Use the DB_NAME from the .env file
});

export default pool;
