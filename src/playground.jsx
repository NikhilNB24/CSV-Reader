import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const YourComponent = () => {
    const data = [
        {
            Id: "1",
            Name: "Bottle",
            ASIN: "B3",
            HS6: "12345",
            Combo: "Bottle 12345",
        },
        {
            Id: "1",
            Name: "Bottle",
            ASIN: "B3",
            HS6: "12345",
            Combo: "Bottle 12345",
        },
        {
            Id: "2",
            Name: "Footwear",
            ASIN: "F6",
            HS6: "22",
            Combo: "Footwear 22",
        },
        {
            Id: "3",
            Name: "Crocs",
            ASIN: "C3",
            HS6: "33",
            Combo: "Crocs 33",
        },
        {
            Id: "4",
            Name: "Clothes",
            ASIN: "C3",
            HS6: "44",
            Combo: "Clothes 44",
        },
        {
            Id: "5",
            Name: "Bottle",
            ASIN: "B2",
            HS6: "55",
            Combo: "Bottle 12345",
        },
        {
            Id: "7",
            Name: "Crocs",
            ASIN: "C3",
            HS6: "77",
            Combo: "Crocs 77",
        },
        {
            Id: "8",
            Name: "Eraser",
            ASIN: "E5",
            HS6: "88",
            Combo: "Eraser 88",
        },
        {
            Id: "9",
            Name: "Monitor",
            ASIN: "M7",
            HS6: "99",
            Combo: "Bottle 99",
        },
        {
            Id: "10",
            Name: "Eraser",
            ASIN: "E5",
            HS6: "0",
            Combo: "Bottle 0",
        },
        {
            Id: "11",
            Name: "Clothes",
            ASIN: "C3",
            HS6: "23",
            Combo: "Clothes 23",
        },
        {
            Id: "12",
            Name: "Pen",
            ASIN: "P8",
            HS6: "34",
            Combo: "Bottle 12345",
        },
        {
            Id: "13",
            Name: "Pen ",
            ASIN: "P8",
            HS6: "45",
            Combo: "Bottle 12345",
        },
        {
            Id: "14",
            Name: "Crocs",
            ASIN: "C3",
            HS6: "56",
            Combo: "Bottle 12345",
        },
        {
            Id: "15",
            Name: "Bag",
            ASIN: "B2",
            HS6: "67",
            Combo: "Bottle 12345",
        },
        {
            Id: "16",
            Name: "Eraser",
            ASIN: "E5",
            HS6: "78",
            Combo: "Bottle 12345",
        },
        {
            Id: "17",
            Name: "Clothes",
            ASIN: "C3",
            HS6: "89",
            Combo: "Bottle 12345",
        },
        {
            Id: "18",
            Name: "Mobile",
            ASIN: "M7",
            HS6: "24",
            Combo: "Bottle 12345",
        },
        {
            Id: "19",
            Name: "Tab",
            ASIN: "T9",
            HS6: "46",
            Combo: "Bottle 12345",
        },
        {
            Id: "20",
            Name: "Bag",
            ASIN: "B3",
            HS6: "68",
            Combo: "Bottle 12345",
        },
    ];
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
export default YourComponent;
