// src/app/admin/dashboard.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');  // Redirect to login if not authenticated
        } else {
            axios.get('/api/admin/protected', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => setMessage(response.data.message))
            .catch(() => router.push('/admin/login'));
        }
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>{message}</p>
            <p>Welcome to the protected admin area!</p>
        </div>
    );
};

export default AdminDashboard;
