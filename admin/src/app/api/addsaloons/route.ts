import { NextResponse, NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import path, { join } from 'path';
import sharp from 'sharp';
import multer from 'multer';
import pool from '../../../db/config/database'; // Assuming your database connection pool
import { RowDataPacket } from "mysql2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "saloon_booking@123"; // Secret key for token verification


interface CustomJwtPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
}

// Configure multer to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads'); // Save to public/uploads folder
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
});

// Disable Next.js body parser to handle file upload manually
export const config = {
  api: {
    bodyParser: false,
  },
};



export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
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
    const formData = await request.formData();

    // Extract form data with null checks
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const contactNo = formData.get('contactNo') as string;
    const startingPrice = formData.get('startingPrice') as string;
    const openTime = formData.get('openTime') as string;
    const closeTime = formData.get('closeTime') as string;

    if (!title || !description || !location || !contactNo || !startingPrice || !openTime || !closeTime || !adminId) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const ext = path.extname(file.name);
    const filename = `${Date.now()}${ext}`;
    const imagePath = `./public/uploads/${filename}`;

    // Save the uploaded file
    await writeFile(imagePath, buffer);

    try {
      // Convert image to WebP format using sharp
      await sharp(imagePath)
        .webp()
        .toFile(imagePath.replace(ext, '.webp'));

      // Delete the original file after conversion
      fs.unlinkSync(imagePath);

      // Create saloon object with sanitized data
      const newSaloon = {
        title,
        description,
        location,
        contactNo,
        startingPrice,
        openTime,
        closeTime,
        imageUrl: `/uploads/${filename.replace(ext, '.webp')}`,
      };

      // Execute database query using prepared statement (replace with your actual table structure)
      const [result]: [ResultSetHeader, any] = await pool.execute(
        'INSERT INTO saloons (title, description, location, contactNo, startingPrice, openTime, closeTime, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [newSaloon.title, newSaloon.description, newSaloon.location, newSaloon.contactNo, newSaloon.startingPrice, newSaloon.openTime, newSaloon.closeTime, newSaloon.imageUrl]
      );

      await pool.execute(
        'UPDATE admin SET saloonId = ? WHERE id = ?',
        [result.insertId, adminId] // Replace with the actual admin ID
      );
      return NextResponse.json({ message: 'Saloon added successfully', saloon: newSaloon }, { status: 200 });


    } catch (error) {
      console.error('Error converting image:', error);
      return NextResponse.json({ message: 'Error converting image' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}