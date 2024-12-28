// src/app/api/update-user/route.ts
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

    // Parse the incoming JSON body
    const { name, email, phone } = await req.json();

    // Update the user data
    const updatedUser = await UserModel.updateUserById(decoded.id, name, email, phone);
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found or update failed' }, { status: 404 });
    }

    // Return the updated user data
    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ message: 'Error updating user data' }, { status: 500 });
  }
}
