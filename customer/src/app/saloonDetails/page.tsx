"use client";  // Add this at the top of the file

import React from "react";
import * as Stylex from "@stylexjs/stylex";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";


// Sample event data from the URL
const x = Stylex.create({
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "100%",
    padding: "20px 0",
  },
});

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const event = searchParams.get("event");
  const eventData = event
    ? JSON.parse(decodeURIComponent(Array.isArray(event) ? event[0] : event))
    : null;


    const handleBooking = () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
    
      // Check if token exists
      if (!token) {
        Swal.fire("Please Login", "You need to be logged in to make a booking.", "warning");
        return; // Exit function if token is not found
      }
    
      // SweetAlert popup with booking options
      Swal.fire({
        title: "Select Your Booking Date",
        html: `
          <input type="date" id="booking-date" class="swal2-input" />
        `,
        showCancelButton: true,
        confirmButtonText: "Book Now",
        cancelButtonText: "Cancel",
        preConfirm: () => {
          const bookingDate = (document.getElementById("booking-date") as HTMLInputElement).value;
    
          if (!bookingDate) {
            Swal.showValidationMessage("Please select a booking date!");
          }
    
          return { bookingDate };
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Proceed with booking
          const { bookingDate } = result.value;
    
          if (bookingDate) {
            // Use eventData.id dynamically for eventId
            const bookingData = {
              eventId: eventData.id,  // Dynamically setting the event ID from eventData
              bookingDate: bookingDate,  // Use the selected booking date
              imageUrl: eventData.imageUrl,  // Dynamic image URL
              title: eventData.title,  // Dynamic event title
              description: eventData.description,  // Dynamic event description
              location: eventData.location,  // Dynamic event location
              contactNo: eventData.contactNo,  // Dynamic event contact number
              startingPrice: eventData.startingPrice,  // Dynamic starting price
              openTime: eventData.openTime,  // Dynamic opening time
              closeTime: eventData.closeTime  // Dynamic closing time
            };
    
            try {
              // Send request to the server with event data and booking date
              const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`  // Include JWT in Authorization header
                },
                body: JSON.stringify(bookingData)
              });
    
              if (response.status === 401) {
                // Handle 401 Unauthorized response
                localStorage.removeItem('token'); // Remove token from localStorage
                Swal.fire(
                  "Session Expired",
                  "Your session has expired. Please log in again.",
                  "warning"
                ).then(() => {
                  // Redirect user to the login page
                  window.location.reload();
                });
              } else if (response.ok) {
                const data = await response.json();
                // Handle success response
                Swal.fire(
                  "Booking Confirmed!",
                  "Your booking has been confirmed!",
                  "success"
                ).then(() => {
                  // Reload the page after the success message
                  router.push("/dashboard");
                });
              } else {
                const errorData = await response.json();
                // Handle other errors
                Swal.fire(
                  "Booking Failed",
                  errorData.message || "An error occurred during the booking process.",
                  "error"
                );
              }
            } catch (error) {
              // Handle network or unexpected errors
              console.error("Error:", error);
              Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
            }
          }
        }
      });
    };
    
    
    

  if (!eventData) {
    return (
      <div>
        <p>No event data found.</p>
      </div>
    );
  }

  return (
    <main {...Stylex.props(x.main, x.centerChild)}>
      <div
        className="event-container-detailspage"
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ width: "100%", display: "flex" }}>
          <h1>{eventData.title}</h1> {/* Display event title */}
        </div>
        <div style={{ width: "100%", display: "flex", gap: 10 }}>
          <p>4.6 ***** (540)</p> {/* Add a static rating for now */}
          <p>Open until {eventData.closeTime}</p> {/* Display close time */}
        </div>
        <div
          className="event-container-detailspage"
          style={{
            display: "flex",
            width: "100%",
            gap: 20,
            flexDirection: "row", // Make sure it's in a row on large screens
          }}
        >
          {/* Image Wrapper */}
          <div
            className="event-image-detailspage"
            style={{
              width: "60%",
              height: "auto",
              display: "inline-block",
              flexDirection: "row",
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_ADMIN_URL}${eventData.imageUrl}`}// Use the correct path from public directory
              alt={eventData.title}
              width={500} // The intrinsic width of the image
              height={500} // The intrinsic height of the image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          </div>

          {/* Right Section (Event Details) */}
          <div
            className="event-details-detailspage"
            style={{
              width: "40%",
              height: "auto",
              gap: 20,
              border: "1px solid #00000025",
              borderRadius: 10,
              padding: "10px 20px",
              display: "inline-block", // Make this block display inline with the image
            }}
          >
            <div style={{ width: "100%", display: "flex", padding: "10px 20px" }}>
              <h2>{eventData.title}</h2> {/* Display event title */}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                padding: "0 20px",
                gap: 10,
              }}
            >
              <p>4.6 ***** (540)</p> {/* Static rating */}
              <p>LKR {eventData.startingPrice}</p> {/* Display starting price */}
            </div>
            <div style={{ width: "100%", display: "flex", padding: "0 10px", marginTop:"5px" }}>
              <button
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                  borderRadius: "10px",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
                onClick={handleBooking}
              >
                Book Now
              </button>
            </div>
            <div
              style={{
                content: "",
                width: "100%",
                height: 2,
                backgroundColor: "#d9d9d9",
              }}
            ></div>
            <div style={{ width: "100%", padding: 10 }}>
              <p style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
                Details
              </p>
              <p>{eventData.description}</p> {/* Display description */}
              <br />
              <p>
                Location: {eventData.location} {/* Display location */}
              </p>
              <p>
                Contact No: {eventData.contactNo} {/* Display contact number */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
