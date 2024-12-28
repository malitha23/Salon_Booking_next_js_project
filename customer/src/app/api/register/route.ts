import { NextResponse } from 'next/server';
import { UserModel } from '../../../db/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OkPacket } from 'mysql2';  // Import OkPacket type

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'saloon_booking@123'; // Ensure the secret key is available from environment variables

export async function POST(req: Request) {
  const { name, email, password, phone } = await req.json();

  try {

    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 } // Bad Request
      );
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const result = await UserModel.createUser(name, email, hashedPassword, phone);

    // Type assertion to access 'insertId' (the correct result type is OkPacket)
    const userId = (result as OkPacket).insertId;

    // Create a JWT token for the user
    const token = jwt.sign(
      { id: userId, name, email }, // Payload: You can add more user info here
      JWT_SECRET_KEY
    );

    return NextResponse.json({
      message: 'User registered successfully',
      data: { id: userId, name, email, phone, token }, // Send the token in the response
    });
  } catch (error: unknown) {
    const e = error as Error;
    console.error('Error registering user:', e.message);
    return NextResponse.json({ message: 'Error registering user', error: e.message });
  }
}
