// src/app/admin/login.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Correct API path
            const response = await axios.post('http://localhost:5000/admin/login', {
                username,
                password,
            });
            localStorage.setItem('adminToken', response.data.token);
            router.push('/admin/dashboard');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminLogin;
