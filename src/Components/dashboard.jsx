import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import TestData from "../test.csv";
import CSVTable from "../helper/table";
import DownloadButton from "../helper/download";

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchASIN, setSearchASIN] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [selectedName, setSelectedName] = useState("");
    const [selectedASIN, setSelectedASIN] = useState("");
    const [selectedHS6, setSelectedHS6] = useState("");
    const [nameDropdown, setNameDropdown] = useState([]);
    const [asinDropdown, setASINDropdown] = useState([]);
    const [hs6Dropdown, setHS6Dropdown] = useState([]);
    const [hs6Count, seths6Count] = useState(0);
    const [nameCount, setNameCount] = useState(0);
    const [comboCount, setComboCount] = useState(0);

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

        const filteredhs6List = data.filter((obj) => obj.HS6 !== "");
        seths6Count(filteredhs6List.length);

        const filteredNameList = data.filter((obj) => obj.Name !== "");
        setNameCount(filteredNameList.length);

        const filteredComboList = data.filter((obj) => obj.Combo !== "");
        setComboCount(filteredComboList.length);

        const uniqueNamesSet = new Set(data.map((item) => item.Name));
        const uniqueNamesArray = Array.from(uniqueNamesSet);
        setNameDropdown(uniqueNamesArray);

        const uniqueASINSet = new Set(data.map((item) => item.ASIN));
        const uniqueASINArray = Array.from(uniqueASINSet);
        setASINDropdown(uniqueASINArray);

        const uniqueHS6Set = new Set(data.map((item) => item.HS6));
        const uniqueHS6Array = Array.from(uniqueHS6Set);
        setHS6Dropdown(uniqueHS6Array);
    };

    const filterInputData = () => {
        let cc = [];
        tempRows = data.filter((row) => {
            const matchName =
                !selectedName ||
                row.Name.toLowerCase() === selectedName.toLowerCase();
            const matchASIN =
                !selectedASIN ||
                row.ASIN.toLowerCase() === selectedASIN.toLowerCase();
            const matchHS6 =
                !selectedHS6 ||
                row.HS6.toLowerCase() === selectedHS6.toLowerCase();
            const matchSearchASIN =
                searchASIN !== ""
                    ? row.ASIN.toLowerCase() === searchASIN.toLowerCase()
                    : true;
            const matchSearchCategory =
                searchCategory !== ""
                    ? row.Name.toLowerCase() === searchCategory.toLowerCase()
                    : true;

            return (
                matchName &&
                matchASIN &&
                matchHS6 &&
                matchSearchASIN &&
                matchSearchCategory
            );
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
    };

    useEffect(() => {
        fetchData();
        filterInputData();
    }, [searchASIN, searchCategory, asinDropdown, hs6Dropdown, nameDropdown]);

    return (
        <>
            {data?.length ? (
                <>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="container mt-4">
                                    <label
                                        htmlFor="itemDropdown"
                                        className="form-label"
                                    >
                                        Select an item:
                                    </label>
                                    <select
                                        id="itemDropdown"
                                        className="form-select"
                                        value={selectedName}
                                        onChange={(e) =>
                                            setSelectedName(e.target.value)
                                        }
                                    >
                                        <option value="">Select Name:</option>
                                        {nameDropdown.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedName && (
                                        <p className="mt-2">
                                            You selected: {selectedName}
                                        </p>
                                    )}
                                </div>
                                <div className="container mt-4">
                                    <label
                                        htmlFor="itemDropdown"
                                        className="form-label"
                                    >
                                        Select an item:
                                    </label>
                                    <select
                                        id="itemDropdown"
                                        className="form-select"
                                        value={selectedASIN}
                                        onChange={(e) =>
                                            setSelectedASIN(e.target.value)
                                        }
                                    >
                                        <option value="">Select ASIN:</option>
                                        {asinDropdown.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedASIN && (
                                        <p className="mt-2">
                                            You selected: {selectedASIN}
                                        </p>
                                    )}
                                </div>
                                <div className="container mt-4">
                                    <label
                                        htmlFor="itemDropdown"
                                        className="form-label"
                                    >
                                        Select an item:
                                    </label>
                                    <select
                                        id="itemDropdown"
                                        className="form-select"
                                        value={selectedHS6}
                                        onChange={(e) =>
                                            setSelectedHS6(e.target.value)
                                        }
                                    >
                                        <option value="">Select HS6:</option>
                                        {hs6Dropdown.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedHS6 && (
                                        <p className="mt-2">
                                            You selected: {selectedHS6}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <br />
                                <DownloadButton data={filteredData} />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>HS6 Efficiency:</td>
                                            <td>
                                                {(hs6Count / data.length) * 100}{" "}
                                                %
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Name Efficiency:</td>
                                            <td>
                                                {(nameCount / data.length) *
                                                    100}{" "}
                                                %
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Combo Efficiency:</td>
                                            <td>
                                                {(comboCount / data.length) *
                                                    100}{" "}
                                                %
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total items:</td>
                                            <td>{data.length}</td>
                                        </tr>
                                        <tr>
                                            <td>Filtered items:</td>
                                            <td>{filteredData.length}</td>
                                        </tr>
                                        <tr>
                                            <td>Efficiency:</td>
                                            <td>
                                                {(filteredData.length /
                                                    data.length) *
                                                    100}{" "}
                                                %
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <br />
                    <CSVTable data={data} filteredData={filteredData} />
                    {/* <CustomTable data={data} /> */}
                </>
            ) : null}
        </>
    );
};

export default Dashboard;
