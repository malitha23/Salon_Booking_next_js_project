import { NextResponse } from 'next/server';
import { AdminModel } from '../../../db/models/admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OkPacket } from 'mysql2';  // Import OkPacket type

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'saloon_booking@123'; // Ensure the secret key is available from environment variables

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Check if the Admin exists in the database
    const existingAdmin = await AdminModel.getAdminByEmail(email);
    if (!existingAdmin) {
      return NextResponse.json(
        { message: 'Invalid email' },
        { status: 400 } // Bad Request
      );
    }

    // Compare the hashed password with the one stored in the database
    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 400 } // Bad Request
      );
    }

    // Create a JWT token for the Admin
    const token = jwt.sign(
      { id: existingAdmin.id, name: existingAdmin.name, email: existingAdmin.email }, // Payload: You can add more Admin info here
      JWT_SECRET_KEY
    );

    return NextResponse.json({
      message: 'Admin logged in successfully',
      data: { id: existingAdmin.id, name: existingAdmin.name, email: existingAdmin.email, phone: existingAdmin.phone, token }, // Send the token in the response
    });
  } catch (error: unknown) {
    const e = error as Error;
    console.error('Error logging in Admin:', e.message);
    return NextResponse.json({ message: 'Error logging in Admin', error: e.message });
  }
}
