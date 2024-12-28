// src/app/dashboard/page.tsx
import React from 'react';
import UserDetails from "./UserDetails";
import BookingDetails from "./BookingDetails"; // Create this new component
import styles from './Dashboard.module.css'; // Import the CSS module

const Dashboard = () => {
    return (
        <>
     
        <h1 className={styles['dashboard-heading']}>Welcome to your Dashboard</h1>
        <div className={styles['dashboard-container']}>
          <div className={styles['user-data-container']}>
            <UserDetails />
          </div>
          <div className={styles['booking-data-container']}>
            <BookingDetails /> {/* You will create this component for booking details */}
          </div>
        </div>
        </>
    );
};

export default Dashboard;
