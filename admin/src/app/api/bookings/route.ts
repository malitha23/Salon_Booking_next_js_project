import { NextResponse } from 'next/server'; // Import NextResponse for app directory
import { BookingModel } from '../../../db/models/booking';
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "saloon_booking@123"; // Secret key for token verification

interface CustomJwtPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
}


export async function POST(req: Request) {
  try {
    // Extract Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 } // Unauthorized
      );
    }

    // Extract and verify the JWT token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as CustomJwtPayload;

    if (!decoded.id) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 400 } // Bad Request
      );
    }

    const adminId = decoded.id;

    // Call the SaloonModel's getAllSaloons method with the filters
    const saloons = await BookingModel.getAllBookings(adminId);

    // Return the results as a JSON response using NextResponse
    return NextResponse.json(saloons, { status: 200 });
  } catch (error) {
    console.error("Error fetching saloons:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
