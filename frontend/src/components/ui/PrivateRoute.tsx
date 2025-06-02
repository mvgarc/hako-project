import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
    const { isAuthenticated, loading } = useAuth(); 

    if (loading) {
        return <div>Cargando autenticación...</div>; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; 
    }

    return <Outlet />;
};

export default PrivateRoute;