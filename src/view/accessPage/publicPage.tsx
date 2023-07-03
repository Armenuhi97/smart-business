import React from "react";
import { Navigate } from "react-router-dom";

const PublicPage = ({ redirectPath = '/dashboard', children = '' }) => {
    if (localStorage.getItem('access')) {
        return <Navigate to={redirectPath} />
    }
    return children;
};
export default PublicPage;