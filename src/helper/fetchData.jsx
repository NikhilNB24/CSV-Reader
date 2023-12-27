import { useState, useEffect } from "react";
import Papa from "papaparse";
import TestData from "../test.csv";

const FetchData = () => {
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

    return data;
};

export default FetchData;
