import { NextResponse } from "next/server";
import { getDashboardCounts } from "../../../db/models/dashboard"; // Import the model
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "saloon_booking@123"; // Secret key for token verification


interface CustomJwtPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 } // Unauthorized
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify the token and cast it to your custom type
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as CustomJwtPayload;

    if (!decoded.id) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 400 } // Bad Request
      );
    }

    const adminId = decoded.id;

    // Fetch dashboard counts using the admin ID
    const counts = await getDashboardCounts(adminId);

    return NextResponse.json(counts, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
