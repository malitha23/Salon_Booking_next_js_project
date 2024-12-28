import { NextResponse } from 'next/server';
import { BookingModel } from '../../../db/models/booking';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'saloon_booking@123'; // Secret key for token verification

interface CustomJwtPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    // Extract Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized: Missing or invalid authorization token' },
        { status: 401 }
      );
    }

    // Extract and verify the JWT token
    const token = authHeader.split(' ')[1];
    let decoded: CustomJwtPayload;

    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY) as CustomJwtPayload;
    } catch (err) {
      return NextResponse.json(
        { message: 'Unauthorized: Invalid or expired token' },
        { status: 401 }
      );
    }

    if (!decoded.id) {
      return NextResponse.json(
        { message: 'Bad Request: Token payload missing expected fields' },
        { status: 400 }
      );
    }

    const adminId = decoded.id;

    // Get the request body
    const { bookingId, status } = await req.json();

    if (!bookingId || status === undefined) {
      return NextResponse.json(
        { message: 'Bad Request: Missing bookingId or status' },
        { status: 400 }
      );
    }

    // Call the BookingModel's setBookingAction method to update the booking
    const updatedBooking = await BookingModel.setBookingAction(adminId, bookingId, status);

    if (!updatedBooking) {
      return NextResponse.json(
        { message: 'Error: Could not update the booking' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Booking status updated successfully', data: updatedBooking },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
