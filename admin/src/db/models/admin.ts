// src/db/models/user.ts
import pool from "../config/database";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2"; // Import ResultSetHeader type


// UserModel class
export class AdminModel {

  static async createAdmin(
    name: string,
    email: string,
    password: string,
    phone: string,
    bussinessName: string // Include the missing parameter
  ) {
    const connection = await pool.getConnection();
    try {
      // Insert the new admin into the database
      const [result]: [ResultSetHeader, any] = await connection.execute(
        'INSERT INTO admin (name, email, password, phone, bussinessName) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, phone, bussinessName] // Include bussinessName in the query
      );

      // Return the ID of the newly created admin
      return {
        id: result.insertId,
        name,
        email,
        phone,
        bussinessName,
      };
    } finally {
      connection.release();
    }
  }


  // Method to check if a user exists by email
  static async getAdminByEmail(email: string) {
    const query = 'SELECT * FROM admin WHERE email = ?';

    try {
      const [rows]: [RowDataPacket[], any] = await pool.query(query, [email]);

      // If rows are returned, that means the email already exists
      if (rows.length > 0) {
        return rows[0]; // Return the first matching user
      }
      return null; // No user found
    } catch (error) {
      console.error('Error checking email:', error);
      throw new Error('Database error while checking email.');
    }
  }

  static async getUserById(id: number) {
    try {
      // Query to get user data by ID
      const [rows]: [RowDataPacket[], any] = await pool.execute(
        'SELECT id, name, email, phone, bussinessName FROM users WHERE id = ?',
        [id]
      );

      if (rows.length > 0) {
        return rows[0]; // Return the first matching user
      }
      return null; // No user foun
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Database error while fetching user');
    }
  }

  static async updateUserById(id: number, name: string, email: string, phone: string) {
    const connection = await pool.getConnection();
    try {
      // Query to update user details by ID
      const [result]: [ResultSetHeader, any] = await connection.execute(
        'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
        [name, email, phone, id]
      );

      // Check affected rows to ensure the update was successful
      if (result.affectedRows === 0) {
        return null; // No user updated
      }

      // Query the updated user data
      const [rows]: [RowDataPacket[], any] = await connection.execute(
        'SELECT id, name, email, phone FROM users WHERE id = ?',
        [id]
      );

      return rows[0]; // Return the updated user data
    } finally {
      connection.release();
    }
  }
}
