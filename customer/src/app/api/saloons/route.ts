import { NextResponse } from 'next/server'; // Import NextResponse for app directory
import { SaloonModel } from '../../../db/models/saloon'; // Adjust this path to your actual Saloon model

export async function POST(req: Request) {
    try {
        // Extract location and priceRange from the request body
        const { location, priceRange } = await req.json();

        // Call the SaloonModel's getAllSaloons method with the filters
        const saloons = await SaloonModel.getAllSaloons({ location, priceRange });

        // Return the results as a JSON response using NextResponse
        return NextResponse.json(saloons, { status: 200 });
    } catch (error) {
        console.error('Error fetching saloons:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
