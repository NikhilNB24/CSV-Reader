import React from "react";
import Button from "react-bootstrap/Button";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DownloadButton = ({ data }) => {
    const handleDownload = () => {
        try {
            const csvData = convertToCSV(data);
            const blob = new Blob([csvData], {
                type: "text/csv;charset=utf-8",
            });
            saveAs(blob, "data.csv");
            toast.success("Dashboard data downloaded successfully!");
        } catch (error) {
            console.error("Error downloading Dashboard data:", error);
            toast.error("Error downloading Dashboard data. Please try again.");
        }
    };

    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(",");
        const rows = data.map((obj) => Object.values(obj).join(","));
        return `${header}\n${rows.join("\n")}`;
    };

    return (
        <>
            <Button variant="dark" onClick={handleDownload}>
                Download
            </Button>
            <ToastContainer />
        </>
    );
};

export default DownloadButton;
