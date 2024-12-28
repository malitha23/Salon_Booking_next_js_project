"use client";
import React, { useEffect, useState } from 'react';
import * as StyleX from "@stylexjs/stylex";
import Image from "next/image";
import sal1 from "../../../public/assets/sal1.jpg";
import sal2 from "../../../public/assets/sal2.jpg";
import sal3 from "../../../public/assets/sal3.jpg";
import sal4 from "../../../public/assets/sal4.jpg";
import sal5 from "../../../public/assets/sal5.jpg";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import FilterComponent from "../Filter/FilterComponent";


const x = StyleX.create({
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    padding: "30px 0",
  },
});

interface Event {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  location: string;
  contactNo: string;
  startingPrice: string;
  openTime: string;
  closeTime: string;
  createdAt: string;
}

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the values of the query parameters
  const location = searchParams.get('location'); // "location1"
  const priceRange = searchParams.get('priceRange'); // "0-100"
  const [events, setEvents] = useState<any[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Prepare the request body with location and priceRange
        const requestBody = {
          location: location || '', // Use an empty string if location is not set
          priceRange: priceRange || '', // Use an empty string if priceRange is not set
        };

        // Fetch data with filters in the request body
        const response = await fetch('/api/saloons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set headers for POST request
            // Add other headers if necessary
          },
          body: JSON.stringify(requestBody), // Send the location and priceRange in the body
        });

        const data = await response.json();

        console.log(data); // Handle the data here

        // Check if the data is an array
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching saloons:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchEvents();
  }, [location, priceRange]); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550); // Adjust this width for mobile screens
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", marginTop:"30px" }}>Loading...</div>; // Display loading indicator
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", paddingLeft:"20px", paddingRight:"20px" }}>
      <FilterComponent/>
      </div>
    
      <div style={{ display: "flex", gap: "10px", marginTop: "5px", justifyContent: "center", position:"absolute", top: isMobile ? '100px' : '80px', left:"20px" }}>
        {location && (
          <span
            style={{
              display: "inline-block",
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: "#28a745",
              color: "#fff",
              fontSize: "14px",
            }}
          >
            Location: {location}
          </span>
        )}

        {priceRange && (
          <span
            style={{
              display: "inline-block",
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: "#28a745",
              color: "#fff",
              fontSize: "14px",
            }}
          >
            Price Range: {priceRange}
          </span>
        )}
      </div>
      <div {...StyleX.props(x.main, x.centerChild)}>
        <div style={{ width: "90%", display: "flex" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "start",
              gap: "1.3%",
            }}
          >
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event, index) => (
                <div
                  style={{
                    width: "24%",
                    border: "1px solid #d3d3d3",
                    height: 250,
                    borderRadius: "10px",
                    transition: "transform 0.3s ease, 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // Serialize the event data
                    const encodedEvent = encodeURIComponent(JSON.stringify(event));
                    router.push(`/saloonDetails?event=${encodedEvent}`);
                  }}
                  key={index}
                >
                  <div
                    style={{
                      height: "60%",
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_ADMIN_URL}${event.imageUrl})`, 
                      cursor: "pointer",
                      borderTopRightRadius: "8px",
                      borderTopLeftRadius: "8px",
                    }}
                  ></div>
                  <div
                    style={{
                      height: "20%",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      padding: "0 10px",
                    }}
                  >
                    {event.title}
                  </div>
                  <div
                    style={{
                      height: "20%",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      padding: "0 10px",
                    }}
                  >
                    {event.location}
                  </div>
                </div>
              ))
            ) : (
              <p>No events found.</p> // Display a fallback message if no events are available
            )}

          </div>
        </div>
      </div>
    </div>

  );
};

export default page;
