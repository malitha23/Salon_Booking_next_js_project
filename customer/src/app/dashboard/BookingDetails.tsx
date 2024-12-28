'use client';
// src/app/dashboard/BookingDetails.tsx
import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css'; // Import the CSS module
import * as StyleX from "@stylexjs/stylex";
import Swal from 'sweetalert2';

interface BookingResult {
  id: number;
  booking_date: string; // You can use `Date` type if you plan to convert the string to Date objects.
  image_url: string;
  title: string;
  location: string;
  contact_no: string;
  status: number; // Assuming status is an integer representing the booking's status
  created_at: string; // Same as `booking_date`, can be `Date` type if needed.
}


const BookingDetails = () => {
  const [booking, setbooking] = useState<BookingResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
      // Fetch user data from the API
      fetch('/api/userBookings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token in the authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          if (Array.isArray(data.userbookings)) {
            setbooking(data.userbookings); // Assuming you want to set `booking` with the fetched data
          } else {
            console.error('Received data is not an array:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the request is finished
        });
    }
  }, []);

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>Loading...</div>; // Display loading indicator
  }

  const handleRemoveRequest = async (bookingId: any) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
  
    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel!',
      cancelButtonText: 'No',
    });
  
    // If confirmed, proceed with the cancellation
    if (result.isConfirmed) {
      try {
        // Make the API request to update the booking status
        const response = await fetch('/api/bookingcancel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingId: bookingId,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Show success message
          Swal.fire(
            'Cancelled!',
            'Your booking has been cancelled.',
            'success'
          ).then(() => {
            // Reload the page after the success message
            window.location.reload();
          });
          // Optionally, you can remove the booking from the UI here
        } else {
          // Show error message if API request fails
          Swal.fire('Error!', data.message || 'Failed to cancel the booking. Please try again.', 'error');
        }
      } catch (error) {
        // Show error message in case of failure
        Swal.fire('Error!', 'Something went wrong, please try again.', 'error');
        console.error('Error updating status:', error);
      }
    }
  };
  

  return (
    <>
      <h2 className={styles['user-details-heading']}>Booking Information</h2>
      {!loading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            maxHeight: "600px",
            overflowY: "auto",
          }}
        >
          <table {...StyleX.props(x.tableContainer)}>
            <thead {...StyleX.props(x.tableHead)}>
              <tr>
                <th {...StyleX.props(x.thItem)}></th>
                <th {...StyleX.props(x.thItem)}>BookingID</th>
                <th {...StyleX.props(x.thItem)}>Booking Date</th>
                <th {...StyleX.props(x.thItem)}>Sallon Name</th>
                <th {...StyleX.props(x.thItem)}>Location</th>
                <th {...StyleX.props(x.thItem)}>Status</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((item) => (
                <tr key={item.id} {...StyleX.props(x.tableRow)}>
                  <td {...StyleX.props(x.tableData)}></td>
                  <td {...StyleX.props(x.tableData)}>{item.id}</td>
                  <td {...StyleX.props(x.tableData)}>
                    {new Date(item.created_at).toLocaleString('en-GB', {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }).replace(",", "")}
                  </td>
                  <td {...StyleX.props(x.tableData)}>{item.title}</td>
                  <td {...StyleX.props(x.tableData)}>{item.location}</td>
                  <td {...StyleX.props(x.tableData)}>
                    {item.status === 0 ? (
                      <>
                        <span
                          style={{
                            backgroundColor: "white",
                            color: "orange",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          Pending...
                        </span>
                        <button
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "3px 8px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginLeft: "10px"
                          }}
                          onClick={() => handleRemoveRequest(item.id)}
                        >
                          Confirm
                        </button>
                      </>
                    ) : item.status === 1 ? (
                      <span
                        style={{
                          backgroundColor: "white",
                          color: "green",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        Confirmed
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor: "white",
                          color: "red",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
  fromDateInputField: {
    marginLeft: "12px",
  },
  toDateInputField: {
    marginLeft: "32px",
  },
  selectContainer: {
    position: "relative",
    display: "inline-block",
    width: "220px",
  },
  customSelect: {
    appearance: "none",
    backgroundColor: "#fff",
    position: "relative",
    paddingRight: "30px",
  },
  dropdown: {
    width: "400px",
    height: "300px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    position: "absolute",
    left: "80%",
    transform: "translateX(-40%)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "90px",
    padding: "10px",
  },
  dropdownContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  inputField: {
    width: "200px",
    height: "48px",
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 1)",
    padding: "10px",
    fontWeight: 400,
    fontSize: "18px",
    color: "rgba(0, 0, 0, 1)",
  },
  dropdownIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  filterButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#ffffff",
    border: "2px solid rgba(0, 0, 0, 1)",
    borderRadius: "8px",

    fontWeight: 700,
    fontSize: "16px",
    color: "rgba(0, 0, 0, 1)",
    padding: "10px",
    cursor: "pointer",
  },
  button: {
    width: "194px",
    height: "54px",
    backgroundColor: "#000435",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "18px",
    color: "#ffffff",
    cursor: "pointer",
    alignSelf: "center",
    marginTop: "20px",
    border: "none",
  },
  // searchInputWrapper: {
  //   position: "relative",
  //   display: "flex",
  //   alignItems: "center",
  //   width: "100%",
  // },
  // searchIcon: {
  //   position: "absolute",
  //   right: "10px",
  //   top: "50%",
  //   transform: "translateY(-50%)",
  //   pointerEvents: "none",
  //   color: "#ccc",
  // },
  filterDropdown: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #00000025",
    cursor: "pointer",
    fontWeight: 700,
  },
  viewButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    background: {
      default: "#D9D9D9",
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
});

export default BookingDetails;
