"use client";
import React, { useEffect, useState } from "react";
import * as StyleX from "@stylexjs/stylex";

const page = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [counts, setCounts] = useState({
    totalBookings: 0,
    status_0_count:"0",
    status_1_count:"0",
    status_2_count:"0"
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      setIsLoading(true);

      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        // Make the API call with the token in the Authorization header
        const response = await fetch("/api/dashboardCountsCards", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setCounts({
          totalBookings: data.totalBookings || 0, 
          status_0_count: data.status_0_count || "0",
          status_1_count: data.status_1_count || "0",
          status_2_count: data.status_2_count || "0",
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

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

  return (
    <main {...StyleX.props(x.main)}>
      <div {...StyleX.props(x.container)}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <div
            style={{
              width: isMobile ?  "100%":"20%",
              height: "120px",
              boxShadow: "0 0 5px 0 #00000025",
              borderRadius: "10px",
              flexDirection: "column",
            }}
            {...StyleX.props(x.centerChild)}
          >
            <div
              style={{
                width: "100%",
                height: "40%",
                background: "#F5C100",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
              {...StyleX.props(x.centerChild)}
            >
              Total Bookings
            </div>
            <div
              style={{ width: "100%", height: "60%" }}
              {...StyleX.props(x.centerChild)}
            >
              {isLoading ? 'Loading...' : counts.totalBookings}
            </div>
          </div>

          <div
            style={{
              width: isMobile ?  "100%":"20%",
              height: "120px",
              boxShadow: "0 0 5px 0 #00000025",
              borderRadius: "10px",
              flexDirection: "column",
            }}
            {...StyleX.props(x.centerChild)}
          >
            <div
              style={{
                width: "100%",
                height: "40%",
                background: "#F5C100",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
              {...StyleX.props(x.centerChild)}
            >
              Pending Bookings
            </div>
            <div
              style={{ width: "100%", height: "60%" }}
              {...StyleX.props(x.centerChild)}
            >
              {isLoading ? 'Loading...' : counts.status_0_count}
            </div>
          </div>

          <div
            style={{
              width: isMobile ?  "100%":"20%",
              height: "120px",
              boxShadow: "0 0 5px 0 #00000025",
              borderRadius: "10px",
              flexDirection: "column",
            }}
            {...StyleX.props(x.centerChild)}
          >
            <div
              style={{
                width: "100%",
                height: "40%",
                background: "#F5C100",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
              {...StyleX.props(x.centerChild)}
            >
              Confirmed Bookings
            </div>
            <div
              style={{ width: "100%", height: "60%" }}
              {...StyleX.props(x.centerChild)}
            >
              {isLoading ? 'Loading...' : counts.status_1_count}
            </div>
          </div>

          <div
            style={{
              width: isMobile ?  "100%":"20%",
              height: "120px",
              boxShadow: "0 0 5px 0 #00000025",
              borderRadius: "10px",
              flexDirection: "column",
            }}
            {...StyleX.props(x.centerChild)}
          >
            <div
              style={{
                width: "100%",
                height: "40%",
                background: "#F5C100",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
              {...StyleX.props(x.centerChild)}
            >
              Rejected Bookings
            </div>
            <div
              style={{ width: "100%", height: "60%" }}
              {...StyleX.props(x.centerChild)}
            >
              {isLoading ? 'Loading...' : counts.status_2_count}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

const x = StyleX.create({
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  container: {
    width: "90%",
    padding: "40px",
  },
});

export default page;
