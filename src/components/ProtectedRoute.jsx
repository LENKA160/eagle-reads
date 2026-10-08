import React from 'react';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) =>{
    const sessionUser=localStorage.getItem('activeSessionUser');

    if(!sessionUser){
        alert("Unauthorized access! Please sign first.");
        return <Navigate to="/login" replace/>;
        
    }
    return children;
};

export default ProtectedRoute;