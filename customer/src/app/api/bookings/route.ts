import { NextResponse } from 'next/server'; // Import NextResponse for app directory
import { BookingModel } from '../../../db/models/booking'; // Import the BookingModel
import jwt from 'jsonwebtoken'; // Assuming you're using JWT for user authentication

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'saloon_booking@123';

export async function POST(req: Request) {
  try {
    // Extract user data from the Authorization token
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized: Token not provided' }, { status: 401 });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };
    } catch (err) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const userId = decoded.id;

    // Extract booking data from the request body
    const {
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
    } = await req.json();

    // Use the BookingModel to create a new booking
    try {
      const bookingId = await BookingModel.createBooking(
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
        closeTime
      );

      // Return a success response with the created booking ID
      return NextResponse.json(
        { message: 'Booking successfully created', bookingId },
        { status: 201 }
      );
    } catch (err: any) {
      if (err.statusCode === 401) {
        // If the BookingModel throws a 401 Unauthorized error, handle it here
        return NextResponse.json({ message: err.message }, { status: 401 });
      }

      // For other errors, respond with a 500 Internal Server Error
      console.error('Error creating booking:', err);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
