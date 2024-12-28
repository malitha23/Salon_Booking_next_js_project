// src/db/models/user.ts
import pool from "../config/database";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2"; // Import ResultSetHeader type


// UserModel class
export class UserModel {
  static async createUser(name: string, email: string, password: string, phone: string) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
        [name, email, password, phone]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  // Method to check if a user exists by email
  static async getUserByEmail(email: string) {
    const query = 'SELECT * FROM users WHERE email = ?';

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
        'SELECT id, name, email, phone FROM users WHERE id = ?',
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

  static async getUserBookingsById(id: number) {
    try {
      // Query to get user data by ID
      const [rows]: [RowDataPacket[], any] = await pool.execute(
        `SELECT \`id\`, \`booking_date\`, \`image_url\`, \`title\`, \`location\`, \`contact_no\`, \`status\`, \`created_at\`
        FROM \`bookings\`
        WHERE \`user_id\` = ?
        ORDER BY 
          \`bookings\`.\`status\` ASC,  -- First, order by status (0 comes before 1)
          \`bookings\`.\`created_at\` DESC;  -- Then, order by booking_created_at in descending order (latest first)`,
        [id]
      );

      if (rows.length > 0) {
        return rows; // Return the first matching user
      }
      return null; // No user found
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Database error while fetching user');
    }
  }

  static async CancelBookingsById(userid: number, bookingid: number) {
    try {
      // Execute the DELETE query and expect the result to contain affectedRows
      const [result]: [any, any] = await pool.execute(
        'DELETE FROM `bookings` WHERE `user_id` = ? AND `id` = ?',
        [userid, bookingid]
      );
  
      // Check if any row was deleted
      if (result.affectedRows > 0) {
        return true; // Booking successfully deleted
      }
  
      return false; // No matching booking found to delete
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw new Error('Database error while deleting booking');
    }
  }
  

}
