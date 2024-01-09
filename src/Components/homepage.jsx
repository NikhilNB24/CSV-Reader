import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const isUser = localStorage.getItem("token");

    const handleLoginClick = () => {
        navigate("/login");
    };
    const handleLogoutClick = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <h3>Welcome to Cluster Engine</h3>

            {isUser ? (
                <Button variant="primary" onClick={handleLogoutClick}>
                    Logout
                </Button>
            ) : (
                <Button variant="primary" onClick={handleLoginClick}>
                    Login
                </Button>
            )}
        </div>
    );
};

export default HomePage;
