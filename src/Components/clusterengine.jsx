import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Papa from "papaparse";
import TestData from "../test.csv";

const ClusterEngine = () => {
    const [data, setData] = useState([]);

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
    }, []);
    const groupedHS6Data = {};
    data.forEach((item) => {
        const key = item.ASIN;
        if (!groupedHS6Data[key]) {
            groupedHS6Data[key] = [];
        }
        groupedHS6Data[key].push(item.HS6);
    });

    const groupedNameData = {};
    data.forEach((item) => {
        const key = item.ASIN;
        if (!groupedNameData[key]) {
            groupedNameData[key] = [];
        }
        groupedNameData[key].push(item.Name);
    });

    const groupedComboData = {};
    data.forEach((item) => {
        const key = item.ASIN;
        if (!groupedComboData[key]) {
            groupedComboData[key] = [];
        }
        groupedComboData[key].push(item.Combo);
    });

    return (
        <div>
            <h2>HS6 Occurrences with the same ASIN</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {/* <th>ASIN</th> */}
                        <th>HS6</th>
                        <th>Efficiency (in %)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedHS6Data).map(
                        ([asin, hs6Values], index) => (
                            <tr key={index}>
                                {/* <td>{asin}</td> */}
                                <td>{hs6Values.join(", ")}</td>
                                <td>
                                    {(hs6Values.length / data.length) * 100} %
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>

            <h2>Name Occurrences with the same ASIN</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {/* <th>ASIN</th> */}
                        <th>Name</th>
                        <th>Efficiency (in %)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedNameData).map(
                        ([asin, nameValues], index) => (
                            <tr key={index}>
                                {/* <td>{asin}</td> */}
                                <td>{nameValues.join(", ")}</td>
                                <td>
                                    {(nameValues.length / data.length) * 100} %
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>

            <h2>Combo Occurrences with the same ASIN</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {/* <th>ASIN</th> */}
                        <th>Combo</th>
                        <th>Efficiency (in %)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedComboData).map(
                        ([asin, comboValues], index) => (
                            <tr key={index}>
                                {/* <td>{asin}</td> */}
                                <td>{comboValues.join(", ")}</td>
                                <td>
                                    {(comboValues.length / data.length) * 100} %
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
};
export default ClusterEngine;
