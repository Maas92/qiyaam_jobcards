import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useToken from "./components/useToken";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        sessionStorage.removeItem("username");
        navigate("/");
    };
    
    if (!token) {
        return (
        <Login setToken={setToken} />
        )
      }

    return (
        <div className='dashboard'>
            <h2 style={{ marginBottom: "30px" }}>Howdy, David</h2>
            <button className='signOutBtn' onClick={handleSignOut}>
                SIGN OUT
            </button>
        </div>
    );
};

export default Dashboard;