import { NextResponse } from 'next/server';
import { UserModel } from '../../../db/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OkPacket } from 'mysql2';  // Import OkPacket type

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'saloon_booking@123'; // Ensure the secret key is available from environment variables

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Check if the user exists in the database
    const existingUser = await UserModel.getUserByEmail(email);
    if (!existingUser) {
      return NextResponse.json(
        { message: 'Invalid email' },
        { status: 400 } // Bad Request
      );
    }

    // Compare the hashed password with the one stored in the database
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 400 } // Bad Request
      );
    }

    // Create a JWT token for the user
    const token = jwt.sign(
      { id: existingUser.id, name: existingUser.name, email: existingUser.email }, // Payload: You can add more user info here
      JWT_SECRET_KEY
    );

    return NextResponse.json({
      message: 'User logged in successfully',
      data: { id: existingUser.id, name: existingUser.name, email: existingUser.email, phone: existingUser.phone, token }, // Send the token in the response
    });
  } catch (error: unknown) {
    const e = error as Error;
    console.error('Error logging in user:', e.message);
    return NextResponse.json({ message: 'Error logging in user', error: e.message });
  }
}
