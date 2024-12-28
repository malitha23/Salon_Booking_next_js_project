import { NextResponse } from 'next/server';
import { UserModel } from '../../../db/models/user';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'saloon_booking@123';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
      return NextResponse.json({ message: 'Token not provided' }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };

    // Parse the bookingId from the request body
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });
    }

    // Call the cancel method (ensure this method cancels the booking based on the user's ID and bookingId)
    const cancellationResult = await UserModel.CancelBookingsById(decoded.id, bookingId);

    if (!cancellationResult) {
      return NextResponse.json({ message: 'Booking not found or already cancelled' }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ message: 'Booking successfully cancelled' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json({ message: 'Error cancelling booking' }, { status: 500 });
  }
}
