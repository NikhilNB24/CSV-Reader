import React from "react";
import Button from "react-bootstrap/Button";
import { saveAs } from "file-saver";

const DownloadButton = ({ data }) => {
    const handleDownload = () => {
        const csvData = convertToCSV(data);

        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

        saveAs(blob, "data.csv");
    };

    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(",");
        const rows = data.map((obj) => Object.values(obj).join(","));
        return `${header}\n${rows.join("\n")}`;
    };

    return (
        <Button variant="dark" onClick={handleDownload}>
            Download
        </Button>
    );
};

export default DownloadButton;
