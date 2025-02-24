import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.warn("No token found. Redirecting to login.");
            navigate('/login');
            return; 
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            if (response.status === 200) {
                console.log("Logout successful!");
                localStorage.removeItem('token');
                navigate('/login');
            }
        }).catch((error) => {
            console.error("Logout failed:", error.response?.status, error.message);
            if (error.response?.status === 401) {
                console.warn("Token expired or invalid. Redirecting to login.");
                localStorage.removeItem('token'); 
                navigate('/login');
            }
        });
    }, [navigate]); 

    return <div>Logging out...</div>;
};

export default UserLogout;
