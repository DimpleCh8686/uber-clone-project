import React, { useEffect, useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserDataContext); 

    useEffect(() => {
        const token = localStorage.getItem('token'); 

        if (!token) {
            console.warn("No token found. Redirecting to login.");
            navigate('/login');
        }
    }, [navigate]); 

    return <>{children}</>;
};

export default UserProtectWrapper;
