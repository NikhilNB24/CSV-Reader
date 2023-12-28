import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import CSVData from "../Components/csvreader";
import CSVData_v2 from "../Components/csvReader_v2";
import ClusterEngine from "../Components/clusterengine";
import Login from "../Components/login";
import HomePage from "../Components/homepage";
import CustomIcon from "../Icons/CustomIcon";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    const isAuthenticated = localStorage.getItem("token");

    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">
                    <CustomIcon className="mr-2" />
                    My App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} className="mx-4" to="/csvreader">
                        CSVData
                    </Nav.Link>
                    <Nav.Link as={Link} className="mx-4" to="/filter">
                        CSVData_v2
                    </Nav.Link>
                    <Nav.Link as={Link} className="mx-4" to="/clusterengine">
                        ClusterEngine
                    </Nav.Link>
                    <Nav.Link as={Link} className="mx-4" to="/login">
                        Login
                    </Nav.Link>
                </Nav>
            </Navbar>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/csvreader" element={<CSVData />} />
                <Route path="/filter" element={<CSVData_v2 />} />
                <Route path="/clusterengine" element={<ClusterEngine />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
