'use client';  // This line will mark the component as a Client Component

import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css'; // Import the CSS module
import Swal from 'sweetalert2'; // Import SweetAlert2

const UserDetails = () => {
  // State to store user data and edit state
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode
  const [editedUser, setEditedUser] = useState({ ...user }); // State to store edited user data

  // Fetch the user data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
      // Fetch user data from the API
      fetch('/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token in the authorization header
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.user) {
          setUser(data.user); // Set the user data in the state
          setEditedUser(data.user); // Set edited user data for form
        } else {
          console.error('User data not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []); // Empty dependency array to run the effect once when the component mounts

  // Handle logout with SweetAlert2 confirmation
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove the token from localStorage on logout
        localStorage.removeItem('token');

        // Redirect the user to the login page after logout
        window.location.href = '/';  // Redirect to the login page
      }
    });
  };

  // Handle input change for the edit form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  // Handle save edited user data (could send this to an API endpoint)
  const handleSave = async () => {
    setUser(editedUser); // Update the user state with edited data
    setIsEditing(false);  // Disable editing mode

    // Make an API call to update the user data on the server
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/update-user', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass the token in the authorization header
        },
        body: JSON.stringify({
          id: 1, // Example: ID of the user to update
          name: editedUser.name,
          email: editedUser.email,
          phone: editedUser.phone,
        }),
      });

      if (response.ok) {
        const updatedUserData = await response.json(); // Assuming the server responds with the updated user data

        fetch('/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.user) {
            setUser(data.user); // Set the updated user data
            setEditedUser(data.user); // Update the form data with the new user data
          } else {
            console.error('User data not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching updated user data:', error);
        });
        Swal.fire('Success!', 'Your details have been updated.', 'success'); // Success alert
      } else {
        Swal.fire('Error', 'Failed to update your details. Please try again.', 'error'); // Failure alert
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      Swal.fire('Error', 'Error updating your details. Please try again.', 'error'); // Error alert
    }
  };

  // Handle cancel edit mode
  const handleCancel = () => {
    setEditedUser(user); // Revert to the original data
    setIsEditing(false);  // Disable editing mode
  };

  return (
    <div className={styles['user-details-container']}>
      <h2 className={styles['user-details-heading']}>User Information</h2>

      {/* Display user information or editable inputs */}
      <div className={styles['user-info']}>
        <div className={styles['user-details-item']}>
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className={styles['edit-input']}
            />
          ) : (
            <span>{user.name || 'Loading...'}</span>
          )}
        </div>

        <div className={styles['user-details-item']}>
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className={styles['edit-input']}
            />
          ) : (
            <span>{user.email || 'Loading...'}</span>
          )}
        </div>

        <div className={styles['user-details-item']}>
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editedUser.phone}
              onChange={handleInputChange}
              className={styles['edit-input']}
            />
          ) : (
            <span>{user.phone || 'Loading...'}</span>
          )}
        </div>
      </div>

      {/* Edit and Save/Cancel buttons */}
      <div className={styles['user-actions']}>
        {isEditing ? (
          <div>
            <button className={styles['save-button']} onClick={handleSave}>Save</button>
            <button className={styles['cancel-button']} onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button className={styles['edit-button']} onClick={() => setIsEditing(true)}>Edit</button>
        )}

        {/* Logout button */}
        <button className={styles['logout-button']} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserDetails;
