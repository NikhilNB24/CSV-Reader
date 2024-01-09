import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RawData from "../Components/rawdata";
import Dashboard from "../Components/dashboard";
import ClusterEngine from "../Components/clusterengine";
import Login from "../Components/login";
import HomePage from "../Components/homepage";
import CsvUploader from "../Components/upload";
import NavBar from "../Components/navbar";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/rawdata" element={<RawData />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/clusterengine" element={<ClusterEngine />} />
                    <Route path="/upload" element={<CsvUploader />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />} exact />
            </Routes>
        </Router>
    );
};

export default AppRouter;
