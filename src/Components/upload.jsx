import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CsvUploader = () => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [csvData, setCsvData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const file = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("csvData"));
        if (storedData) {
            setCsvData(storedData);
            setFilteredData(
                storedData.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                )
            );
        }
    }, [currentPage]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            setLoading(true);

            const reader = new FileReader();

            reader.onload = (e) => {
                const csvContent = e.target.result;
                const rows = csvContent.split("\n");
                const headers = rows[0].split(",");

                const data = [];
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i].split(",");
                    const rowData = {};
                    for (let j = 0; j < headers.length; j++) {
                        rowData[headers[j]] = row[j];
                    }
                    data.push(rowData);
                }

                localStorage.setItem("csvData", JSON.stringify(data));

                setCsvData(data);
                setFilteredData(data.slice(0, itemsPerPage));
                setCurrentPage(1);
                setLoading(false);

                toast.success("Raw data uploaded successfully!");
            };

            reader.readAsText(file);
        }
    };

    const handleFilterChange = (event) => {
        const filterValue = event.target.value.toLowerCase();
        const filteredResults = csvData.filter((row) => {
            return Object.values(row).some((value) =>
                value.toLowerCase().includes(filterValue)
            );
        });

        setFilteredData(filteredResults.slice(0, itemsPerPage));
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        const totalItems = csvData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setFilteredData(
                csvData.slice(
                    (pageNumber - 1) * itemsPerPage,
                    pageNumber * itemsPerPage
                )
            );
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <br />
            <label htmlFor="fileInput" className="btn btn-dark">
                Upload
                <input
                    type="file"
                    id="fileInput"
                    accept=".csv"
                    style={{ display: "none" }}
                    ref={file}
                    onChange={handleFileUpload}
                />
                {/* <input
                    className="btn btn-dark"
                    type="file"
                    accept=".csv"
                    ref={file}
                    onChange={handleFileUpload}
                /> */}
            </label>

            <ToastContainer />

            {loading && <p>Uploading document... Please wait.</p>}

            {csvData.length > 0 && !loading && (
                <div>
                    <br />
                    <input
                        type="text"
                        placeholder="Filter data..."
                        onChange={handleFilterChange}
                        className="form-control my-3"
                    />

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                {Object.keys(csvData[0]).map(
                                    (header, index) => (
                                        <th key={index}>{header}</th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, index) => (
                                        <td key={index}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <Button
                            variant="dark"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </Button>

                        <span className="mx-2">
                            Page {currentPage} of{" "}
                            {Math.ceil(csvData.length / itemsPerPage)}
                        </span>

                        <Button
                            variant="dark"
                            disabled={
                                currentPage ===
                                Math.ceil(csvData.length / itemsPerPage)
                            }
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CsvUploader;
