import pool from "../config/database";
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class BookingModel {
  // Method to create a new booking
  static async createBooking(
    userId: number,
    eventId: number,
    bookingDate: string,
    imageUrl: string,
    title: string,
    description: string,
    location: string,
    contactNo: string,
    startingPrice: number,
    openTime: string,
    closeTime: string
  ) {
    // Check if userId exists in the users table
    const [userExists]: [RowDataPacket[], any] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [userId]
    );

    if (!userExists.length) {
      const error = new Error('Unauthorized: User does not exist');
      (error as any).statusCode = 401;
      throw error;
    }

    // Proceed to insert the booking if userId is valid
    const query = `
      INSERT INTO bookings 
      (user_id, event_id, booking_date, image_url, title, description, location, contact_no, starting_price, open_time, close_time, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `;
    const [result]: [ResultSetHeader, any] = await pool.execute(query, [
      userId,
      eventId,
      bookingDate,
      imageUrl,
      title,
      description,
      location,
      contactNo,
      startingPrice,
      openTime,
      closeTime,
    ]);

    // Return the result, including the insertId of the created booking
    return result.insertId;
  }
}
