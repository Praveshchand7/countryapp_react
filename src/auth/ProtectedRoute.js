import React from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = ({user,children}) => {
    if(!user){
        return <Navigate to='login'/>
    }
    return <Outlet/>
};

export default ProtectedRoute;