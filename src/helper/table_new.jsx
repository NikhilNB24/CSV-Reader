import React, { useState } from "react";
import { Table, Form } from "react-bootstrap";

const CustomTable = ({ data }) => {
    const [tableData, setTableData] = useState(data);
    const [sortBy, setSortBy] = useState(null);
    const [filterBy, setFilterBy] = useState("");

    const handleSort = (columnName) => {
        const newSortBy = sortBy === columnName ? null : columnName;
        setSortBy(newSortBy);

        let sortedData = [...tableData];
        if (newSortBy) {
            sortedData.sort((a, b) => a[newSortBy].localeCompare(b[newSortBy]));
        }

        setTableData(sortedData);
    };

    const handleFilter = (e) => {
        const newFilterBy = e.target.value;
        setFilterBy(newFilterBy);

        const filteredData = data.filter((item) =>
            Object.values(item).some((value) =>
                value
                    .toString()
                    .toLowerCase()
                    .includes(newFilterBy.toLowerCase())
            )
        );

        setTableData(filteredData);
    };

    return (
        <div>
            <Form>
                <Form.Group controlId="filter">
                    <Form.Control
                        type="text"
                        placeholder="Filter..."
                        value={filterBy}
                        onChange={handleFilter}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("Id")}>Id</th>
                        <th onClick={() => handleSort("Name")}>Name</th>
                        <th onClick={() => handleSort("ASIN")}>ASIN</th>
                        <th onClick={() => handleSort("HS6")}>HS6</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.Id}</td>
                            <td>{row.Name}</td>
                            <td>{row.ASIN}</td>
                            <td>{row.HS6}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CustomTable;
