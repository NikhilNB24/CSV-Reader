import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Papa from "papaparse";
import TestData from "../test.csv";

const StockCSVReader = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    let tempRows = [];

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

        let cc = [];
        tempRows = data.filter((row) => {
            return search.toLowerCase() === ""
                ? row
                : row.ASIN.toLowerCase().includes(search.toLowerCase());
        });

        tempRows.forEach((item) => {
            cc.push({
                Id: item?.Id,
                Name: item?.Name,
                ASIN: item?.ASIN,
                HS6: item?.HS6,
            });
        });
        setFilteredData(cc);
        console.log(filteredData);
    };

    useEffect(() => {
        fetchData();
    }, [search]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            {data?.length ? (
                <Container>
                    <h2 className="text-center m-4">CSV Reader</h2>

                    <h6 className="m-2">Total items: {data.length}</h6>
                    <h6 className="m-2">
                        Filtered items: {filteredData.length}
                    </h6>
                    <h6 className="m-2">
                        Efficiency: {(filteredData.length / data.length) * 100}{" "}
                        %
                    </h6>

                    <Form>
                        <InputGroup className="my-3">
                            <Form.Control
                                onChange={handleSearchChange}
                                placeholder="Search..."
                            />
                        </InputGroup>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>ASIN</th>
                                <th>HS6</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {data
                                .filter((row) => {
                                    return search.toLowerCase() === ""
                                        ? row
                                        : row.ASIN.includes(search);
                                })
                                .map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.Id}</td>
                                        <td>{row.Name}</td>
                                        <td>{row.ASIN}</td>
                                        <td>{row.HS6}</td>
                                    </tr>
                                ))}
                        </tbody> */}
                        <tbody>
                            {filteredData?.length > 0
                                ? filteredData.map((row, index) => (
                                      <tr key={index}>
                                          <td>{row.Id}</td>
                                          <td>{row.Name}</td>
                                          <td>{row.ASIN}</td>
                                          <td>{row.HS6}</td>
                                      </tr>
                                  ))
                                : data.map((row, index) => (
                                      <tr key={index}>
                                          <td>{row.Id}</td>
                                          <td>{row.Name}</td>
                                          <td>{row.ASIN}</td>
                                          <td>{row.HS6}</td>
                                      </tr>
                                  ))}
                        </tbody>
                    </Table>
                </Container>
            ) : null}
        </>
    );
};

export default StockCSVReader;
