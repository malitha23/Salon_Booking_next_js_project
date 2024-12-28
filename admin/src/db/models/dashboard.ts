import pool from "../config/database";
import { RowDataPacket } from "mysql2";

export const getDashboardCounts = async (adminId: number) => {
  try {
    // Fetch admin details, including saloonId, using the adminId
    const [[admin]]: [RowDataPacket[], any] = await pool.query(`
      SELECT 
        id, name, email, phone, bussinessName, saloonId, password, created_at 
      FROM 
        admin 
      WHERE 
        id = ?
    `, [adminId]);

    if (!admin) {
      throw new Error('Admin not found');
    }

    // Fetch the count of bookings with different status values
    const [[bookingCounts]]: [RowDataPacket[], any] = await pool.query(`
      SELECT 
        COUNT(*) AS totalBookings,
        SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS status_0_count,
        SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS status_1_count,
        SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) AS status_2_count
      FROM 
        bookings 
      WHERE 
        event_id = ?
    `, [admin.saloonId]);  // Assuming you want to bind saloonId and event_id for the same admin

    // Return the counts based on different statuses and total bookings
    return {
      totalBookings: bookingCounts.totalBookings,
      status_0_count: bookingCounts.status_0_count,
      status_1_count: bookingCounts.status_1_count,
      status_2_count: bookingCounts.status_2_count
    };
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    throw new Error("Internal Server Error");
  }
};
