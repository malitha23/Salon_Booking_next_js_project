// Example of how to handle the API request for user data in your backend
import { NextResponse } from 'next/server';
import { UserModel } from '../../../db/models/user';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'saloon_booking@123';

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
      return NextResponse.json({ message: 'Token not provided' }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };

    // Get user data using the ID from the token
    const userbookings = await UserModel.getUserBookingsById(decoded.id);
    if (!userbookings) {
      return NextResponse.json({ message: 'User Bookings not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ userbookings });
  } catch (error) {
    console.error('Error fetching user booking data:', error);
    return NextResponse.json({ message: 'Error fetching user booking data' }, { status: 500 });
  }
}
