import { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Papa from "papaparse";
import TestData from "../test.csv";

const RawData = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const fileInputRef = useRef(null);
    const [csvDataFile, setCsvDataFile] = useState(null);
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
                Name: item?.Name,
                ASIN: item?.ASIN,
                HS6: item?.HS6,
                ClusterId: item?.ClusterId,
            });
        });
        setFilteredData(cc);
        console.log(filteredData);
    };

    useEffect(() => {
        fetchData();
    }, [search]);

    const handleFileUpload = () => {
        const file = fileInputRef?.current?.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e?.target?.result;
                //console.log(content);
                setCsvDataFile(content);
            };
            reader.readAsText(file);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <h3>RAW DATA</h3>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 d-flex">
                        <input
                            className="btn btn-dark"
                            type="file"
                            accept=".csv"
                            ref={fileInputRef}
                        />
                    </div>
                </div>
            </div>

            {data?.length ? (
                <Container>
                    <h3 className="text-center m-4">CSV Reader</h3>

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
                                <th>Name</th>
                                <th>ASIN</th>
                                <th>HS6</th>
                                <th>Cluster Id</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData?.length > 0
                                ? filteredData.map((row, index) => (
                                      <tr key={index}>
                                          <td>{row.Name}</td>
                                          <td>{row.ASIN}</td>
                                          <td>{row.HS6}</td>
                                          <td>{row.ClusterId}</td>
                                      </tr>
                                  ))
                                : data.map((row, index) => (
                                      <tr key={index}>
                                          <td>{row.Name}</td>
                                          <td>{row.ASIN}</td>
                                          <td>{row.HS6}</td>
                                          <td>{row.ClusterId}</td>
                                      </tr>
                                  ))}
                        </tbody>
                    </Table>
                </Container>
            ) : null}
        </>
    );
};

export default RawData;
