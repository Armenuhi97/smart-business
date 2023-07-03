import React from "react";
import { Navigate } from "react-router-dom";

const PrivatePage = ({ redirectPath = '/auth', children = '' }) => {
    if (localStorage.getItem('access')) {
        return children;
    }
    return <Navigate to={redirectPath} />
}
export default PrivatePage;