import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Papa from "papaparse";
import TestData from "../test.csv";

const ClusterEngine = () => {
    const [data, setData] = useState([]);
    const [hs6Counts, setHS6Counts] = useState({});
    const [nameCounts, setNameCounts] = useState({});
    const [comboCounts, setComboCounts] = useState({});

    const fetchData = async () => {
        const response = await fetch(TestData);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csvData = decoder.decode(result.value);

        const parsedData = Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
        }).data;
        setData(parsedData);
    };

    useEffect(() => {
        fetchData();
        const updateHS6Counts = () => {
            const counths6 = {};
            data.forEach((item) => {
                const itemName = item.HS6;
                counths6[itemName] = (counths6[itemName] || 0) + 1;
            });
            setHS6Counts(counths6);
        };

        const updateNameCounts = () => {
            const countName = {};
            data.forEach((item) => {
                const itemName = item.Name;
                countName[itemName] = (countName[itemName] || 0) + 1;
            });
            setNameCounts(countName);
        };

        const updateComboCounts = () => {
            const countCombo = {};
            data.forEach((item) => {
                const itemName = item.ClusterId;
                countCombo[itemName] = (countCombo[itemName] || 0) + 1;
            });
            setComboCounts(countCombo);
        };
        updateHS6Counts();
        updateNameCounts();
        updateComboCounts();
    }, [hs6Counts, nameCounts, comboCounts]);

    return (
        <div>
            <h2>HS6 Occurrences with the same ASIN</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>HS6</th>
                        <th>Efficiency (in %)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(hs6Counts).map(([element, count]) => (
                        <tr key={element}>
                            <td>{element}</td>
                            <td>{(parseInt(count) / data?.length) * 100}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Name Occurrences with the same ASIN</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Efficiency (in %)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(nameCounts).map(([element, count]) => (
                        <tr key={element}>
                            <td>{element}</td>
                            <td>{(count / data?.length) * 100}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Combo Occurrences with the same ASIN</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Combo</th>
                        <th>Efficiency (in %)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(comboCounts).map(([element, count]) => (
                        <tr key={element}>
                            <td>{element}</td>
                            <td>{(count / data?.length) * 100}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
export default ClusterEngine;
