"use client";
import React, { useEffect, useState } from 'react';
import * as StyleX from "@stylexjs/stylex";
import Image from "next/image";
import Event from "../../../../public/assets/Event.svg";
import { useRouter } from "next/navigation";
import plus from "../../../../public/assets/plus.svg";
import Close from "../../../../public/assets/close.svg";

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
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [saloon, setsaloon] = useState<Event[]>([]); // Use the Event type
  const [loading, setLoading] = useState(true);
  const onPageChange = (newPage: number) => { };

  const handleItemsPerPageChange = (items: number) => {
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchsaloon = async () => {
      try {

        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch('/api/saloons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        console.log(data);

        if (Array.isArray(data)) {
          setsaloon(data);
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching saloon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchsaloon();
  }, []);

  return (
    <>
      <div {...StyleX.props(x.main)}>
        <div
          style={{
            width: "95%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px 0 0 0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <>
              <Image src={Event} alt="Event" />
              <h3>My Sloon</h3>
            </>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            { !loading && saloon.length <= 0 && (
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#45A049")
                } // Slightly darker on hover
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4CAF50")
                }
                onClick={() => router.push("/dashboard/saloon/addSaloon")}
              >
                Add Saloon
              </button>
            )}

          </div>
        </div>
        {/* Event Cards Display */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "0 40px" }}>
          {loading ? (
            <p>Loading Saloon...</p>
          ) : (
            Array.isArray(saloon) && saloon.length > 0 ? (
              saloon.map((event) => (
                <div
                  key={event.id}
                  style={{
                    width: "300px",
                    height: "300px",
                    backgroundColor: "#f3f3f3",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // Serialize the event data
                    const encodedEvent = encodeURIComponent(JSON.stringify(event));
                    router.push(`/dashboard/saloon/editSaloon?event=${encodedEvent}`)
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "60%",
                      backgroundImage: `url(${event.imageUrl || Event})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                    }}
                  />
                  <div style={{ width: "100%", height: "40%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", padding: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <div>{event.title}</div>
                      <div>Price: LKR {event.startingPrice}</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <div>Location: {event.location}</div>
                      <div>Contact: {event.contactNo}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No saloon found.</p> // Display a fallback message if no saloon are available
            )
          )}
        </div>
      </div>
    </>
  );
};

const x = StyleX.create({
  centerChild: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    gap: 20,
    justifyContent: "start",
    display: "flex",
    alignItems: "center",
  },
  tableContainer: {
    marginTop: 10,
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHead: {
    height: 50,
    fontWeight: 600,
    backgroundColor: "#fff",
    boxShadow: " 0 0 5px 0 #00000025",
    borderBottom: "1px solid #999",
  },
  thItem: {
    padding: "10px",
    fontSize: 14,
    textAlign: "left",
  },
  tableData: {
    padding: "10px",
    fontSize: 14,
    textAlign: "left",
  },
  tableRow: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #d9d9d9",
  },
  tableRowAlt: {
    backgroundColor: "#F5C100",
    borderBottom: "1px solid #d9d9d9",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    background: {
      default: "transparent",
      ":hover": "#000",
    },
    color: {
      default: "#000",
      ":hover": "#fff",
    },
    padding: "10px 20px",
    border: "2px solid #000435",
    outline: "none",
    cursor: "pointer",
    borderRadius: 8,
    fontWeight: 700,
    transition: "color 0.3s ease",
  },
  buttonDisabled: {
    backgroundColor: "#fff",
    color: "#999999",
    cursor: "not-allowed",
  },
  viewButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    background: {
      default: "#fff",
      ":hover": "#000",
    },
    color: {
      default: "#000",
      // ":hover": "#fff",
    },
    padding: "5px 10px",
    border: "1px solid #00000025",
    outline: "none",
    cursor: "pointer",
    borderRadius: 8,
    fontWeight: 700,
    transition: "color 0.3s ease",
  },
  viewButtonAlt: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    background: {
      default: "#fff",
      ":hover": "#000",
    },
    color: {
      default: "#000",
      ":hover": "#fff",
    },
    padding: "5px 10px",
    border: "1px solid #00000025",
    outline: "none",
    cursor: "pointer",
    borderRadius: 8,
    fontWeight: 700,
  },
  image: {
    transition: "filter 0.3s ease",
  },
});

export default page;
