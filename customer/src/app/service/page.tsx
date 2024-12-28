"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import Be from "../../../public/assets/beard.jpg";
import { useRouter } from "next/navigation";

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
  const [events, setEvents] = useState<any[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Prepare the request body with location and priceRange
        const requestBody = {
          location: '', // Use an empty string if location is not set
          priceRange: '', // Use an empty string if priceRange is not set
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
  }, []);

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>Loading...</div>; // Display loading indicator
  }


  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 0",
          gap: 20,
        }}
      >
        <div style={{ width: "50%" }}>
          <Image src={Be} alt='Beard' width={600} />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          <h2 style={{ textAlign: "start", widows: "100%" }}>
            ABOUT OUR <br /> TECHNOLOGY
          </h2>
          <div
            style={{
              width: "250px",
              height: 2,
              content: "",
              backgroundColor: "#999",
              margin: "20px 0",
            }}
          ></div>
          <p>
            Our barbershop is the territory created purely for males who
            appreciate premium quality, time and flawless look. Welcome to
            Nelson!
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "4%",
          flexWrap: "wrap",
          width: "90%",
        }}
      >
        {Array.isArray(events) && events.length > 0 ? (

events.map((item, index) => (
  <div
    style={{
      width: "22%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "450px",
      padding: "0 20px",
      borderRadius: 10,
      backgroundColor: "#00000025",
      boxShadow: "0 0 0 5px #00000025",
      flexDirection: "column",
      marginBottom: 20,
    }}
    key={index}
  >
    <div style={{ width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Image
        src={`${process.env.NEXT_PUBLIC_ADMIN_URL}${item.imageUrl}`}
        alt={item.title}
        width={200} // Adjust as needed
        height={200} // Adjust as needed
        style={{ objectFit: "cover" }} // This ensures the image covers the container without distorting
      />
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "0 40px",
      }}
    ><br></br>
      <h3>{item.title}</h3>
      <p style={{ textAlign: "center", marginTop: "8px", marginBottom: "8px" }}>
        {item.description.slice(0, 100)}
      </p>
    </div>
    <div>
      <p
        onClick={() => {
          // Serialize the event data
          const encodedEvent = encodeURIComponent(JSON.stringify(item));
          router.push(`/saloonDetails?event=${encodedEvent}`);
        }}
      >
        READ MORE
      </p>
    </div>
  </div>
))

        ) : (
          <p>No events found.</p> // Display a fallback message if no events are available
        )}
      </div>
    </div>
  );
};

export default page;
