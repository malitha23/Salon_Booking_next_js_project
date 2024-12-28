// db/models/saloon.ts
import db from '../config/database'; // Adjust path to your database config

export const SaloonModel = {
  async getAllSaloons(filters: { location?: string, priceRange?: string }) {
    try {
      let query = 'SELECT * FROM saloons';
      let params: (string | number)[] = [];  // Allow both string and number types

      // Check if location filter exists
      if (filters.location) {
        query += ' WHERE location = ?';
        params.push(filters.location);
      }

      // Check if priceRange filter exists
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
        
        if (params.length === 0) {
          query += ' WHERE startingPrice BETWEEN ? AND ?';
        } else {
          query += ' AND startingPrice BETWEEN ? AND ?';
        }

        // Cast numbers to strings if needed
        params.push(minPrice, maxPrice);
      }

      // Execute the query
      const [rows] = await db.query(query, params);

      // Check if rows is an array and has content
      if (Array.isArray(rows) && rows.length > 0) {
        return rows; // Return the rows containing saloon data
      } else {
        return []; // Return an empty array if no saloons are found
      }
    } catch (error) {
      console.error('Error fetching saloons:', error);
      throw error; // Rethrow the error to be caught in the handler
    }
  },
};
