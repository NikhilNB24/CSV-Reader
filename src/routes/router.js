import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import StockCSVReader from "../Components/csvreader";
import CustomCSVReader from "../Components/csvReader_v2";
import ClusterEngine from "../Components/clusterengine";
import Login2 from "../Components/login2";
import HomePage from "../Components/homepage";
import CustomIcon from "../Icons/CustomIcon";
import NavBar from "../Components/navbar";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/csvreader" element={<StockCSVReader />} />
                    <Route path="/filter" element={<CustomCSVReader />} />
                    <Route path="/clusterengine" element={<ClusterEngine />} />
                </Route>
                <Route path="/login2" element={<Login2 />} />
                <Route path="/" element={<HomePage />} exact />
            </Routes>
        </Router>
    );
};

export default AppRouter;
