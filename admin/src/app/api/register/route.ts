import { NextResponse } from 'next/server';
import { AdminModel } from '../../../db/models/admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OkPacket } from 'mysql2'; // Import OkPacket type

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'saloon_booking@123'; // Ensure the secret key is available from environment variables

export async function POST(req: Request) {
  const { name, email, password, phone, bussinessName } = await req.json();

  try {
    // Check if the Admin already exists
    const existingAdmin = await AdminModel.getAdminByEmail(email);
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin with this email already exists' },
        { status: 400 } // Bad Request
      );
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = await AdminModel.createAdmin(
      name,
      email,
      hashedPassword,
      phone,
      bussinessName
    );

    // Create a JWT token for the new Admin
    const token = jwt.sign(
      { id: newAdmin.id, name: newAdmin.name, email: newAdmin.email }, // Payload
      JWT_SECRET_KEY
    );

    return NextResponse.json({
      message: 'Admin created successfully',
      data: { id: newAdmin.id, name: newAdmin.name, email: newAdmin.email, phone: newAdmin.phone, bussinessName: newAdmin.bussinessName, token }, // Include the token
    });
  } catch (error: unknown) {
    const e = error as Error;
    console.error('Error creating Admin:', e.message);
    return NextResponse.json({ message: 'Error creating Admin', error: e.message });
  }
}
