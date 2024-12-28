import pool from '../config/database'; // Adjust path to your database config
import { RowDataPacket, OkPacket  } from "mysql2";

export const BookingModel = {
  async getAllBookings(adminId: number) {
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

      // Construct the query to join bookings with users
      const query = `
        SELECT 
          bookings.id AS booking_id,
          bookings.status,
          bookings.created_at AS booking_created_at,
          users.id AS user_id,
          users.name AS user_name,
          users.email AS user_email,
          users.phone AS user_phone
        FROM 
          bookings
        INNER JOIN 
          users ON bookings.user_id = users.id
        WHERE 
          bookings.event_id = ?
        ORDER BY 
          bookings.status ASC,  -- First, order by status (0 comes before 1)
          bookings.created_at DESC;  -- Then, order by booking_created_at in descending order (latest first)
      `;

      // Execute the query with the saloonId
      const [rows]: [RowDataPacket[], any] = await pool.query(query, [admin.saloonId]);

      // Check if rows is an array and has content
      if (Array.isArray(rows) && rows.length > 0) {
        return rows; // Return the rows containing booking and user data
      } else {
        return []; // Return an empty array if no bookings are found
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error; // Rethrow the error to be caught in the handler
    }
  },

  // Method to update booking status
  async setBookingAction(adminId: number, bookingId: number, status: number) {
    try {

      // Update the booking's status
      const [updateResult]: [OkPacket, any] = await pool.query(`
        UPDATE bookings
        SET status = ?
        WHERE id = ?
      `, [status, bookingId]);

      if (updateResult.affectedRows === 0) {
        throw new Error('Booking status update failed');
      }

      return { message: 'Booking status updated successfully' };
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error; // Rethrow the error to be caught in the handler
    }
  }
};
