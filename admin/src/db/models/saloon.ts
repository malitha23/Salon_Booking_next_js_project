// db/models/saloon.ts
import pool from '../config/database'; // Adjust path to your database config
import { RowDataPacket } from "mysql2";

export const SaloonModel = {
  async getAllSaloons(adminId: number) {
    try {
      // Fetch admin details, including saloonId, using the adminId
      const [[admin]]: [RowDataPacket[], any] = await pool.query(`
        SELECT 
          id, name, email, phone, bussinessName, saloonId 
        FROM 
          admin 
        WHERE 
          id = ?
      `, [adminId]);

      if (!admin) {
        throw new Error('Admin not found');
      }

      // Construct the query with the fetched saloonId
      let query = 'SELECT * FROM saloons WHERE id = ?';

      // Execute the query with the saloonId
      const [rows] = await pool.query(query, [admin.saloonId]); 

      // Check if rows is an array and has content
      if (Array.isArray(rows) && rows.length > 0) {
        return rows; // Return the rows containing saloon data
      } else {
        return []; // Return an empty array if no saloons are found
      }
    } catch (error) {
      console.error('Error fetching saloons:', error);
      throw error; // Rethrow the error to be caught in the handler
    }
  },
};