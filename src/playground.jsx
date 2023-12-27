import React, { useState, useRef } from "react";

const CsvReaderComponent = () => {
    const [csvData, setCsvData] = useState(null);
    const fileInputRef = useRef(null);

    const handleCsvUpload = () => {
        const file = fileInputRef.current.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                // Process the CSV content as needed
                console.log("CSV Content:", content);
                setCsvData(content);
            };
            reader.readAsText(file);
        }
    };

    const handleButtonClick = () => {
        // Trigger the file input click
        fileInputRef.current.click();
    };

    console.log(csvData);
    return (
        <div>
            <h2 className="text-center m-4">CSV File Reader</h2>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 d-flex">
                        <input
                            type="file"
                            accept=".csv"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleCsvUpload}
                        />
                        <button
                            className="btn btn-dark"
                            onClick={handleButtonClick}
                        >
                            Upload CSV
                        </button>
                    </div>
                </div>
            </div>
            {csvData && (
                <div>
                    <h3>CSV Data:</h3>
                    <pre>{csvData}</pre>
                </div>
            )}
        </div>
    );
};

export default CsvReaderComponent;
