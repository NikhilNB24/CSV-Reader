import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import TestData from "./test.csv";
import CSVTable from "./table";
import CustomTable from "./table_new";

const CSVData_Temp = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchASIN, setSearchASIN] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [csvDataFile, setCsvDataFile] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedASIN, setSelectedASIN] = useState("");
    const [selectedHS6, setSelectedHS6] = useState("");
    const [nameDropdown, setNameDropdown] = useState([]);
    const [asinDropdown, setASINDropdown] = useState([]);
    const [hs6Dropdown, setHS6Dropdown] = useState([]);
    const fileInputRef = useRef(null);
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
        tempRows =
            selectedName && selectedASIN && selectedHS6
                ? data.filter((row) => {
                      return (
                          row.Name.toLowerCase() ===
                              selectedName.toLowerCase() &&
                          row.ASIN.toLowerCase() ===
                              selectedASIN.toLowerCase() &&
                          row.HS6.toLowerCase() === selectedHS6.toLowerCase()
                      );
                  })
                : selectedName && selectedASIN
                ? data.filter((row) => {
                      return (
                          row.Name.toLowerCase() ===
                              selectedName.toLowerCase() &&
                          row.ASIN.toLowerCase() === selectedASIN.toLowerCase()
                      );
                  })
                : selectedName && selectedHS6
                ? data.filter((row) => {
                      return (
                          row.Name.toLowerCase() ===
                              selectedName.toLowerCase() &&
                          row.HS6.toLowerCase() === selectedHS6.toLowerCase()
                      );
                  })
                : selectedASIN && selectedHS6
                ? data.filter((row) => {
                      return (
                          row.ASIN.toLowerCase() ===
                              selectedASIN.toLowerCase() &&
                          row.HS6.toLowerCase() === selectedHS6.toLowerCase()
                      );
                  })
                : selectedName
                ? data.filter((row) => {
                      return (
                          row.Name.toLowerCase() === selectedName.toLowerCase()
                      );
                  })
                : selectedASIN
                ? data.filter((row) => {
                      return (
                          row.ASIN.toLowerCase() === selectedASIN.toLowerCase()
                      );
                  })
                : selectedHS6
                ? data.filter((row) => {
                      return (
                          row.HS6.toLowerCase() === selectedHS6.toLowerCase()
                      );
                  })
                : searchASIN !== ""
                ? data.filter((row) => {
                      return searchASIN.toLowerCase() === ""
                          ? row
                          : row.ASIN.toLowerCase() === searchASIN.toLowerCase();
                  })
                : searchCategory !== ""
                ? data.filter((row) => {
                      return searchCategory.toLowerCase() === ""
                          ? row
                          : row.Name.toLowerCase() ===
                                searchCategory.toLowerCase();
                  })
                : data.filter((row) => {
                      return searchASIN !== "" && searchCategory !== ""
                          ? row.ASIN.toLowerCase() ===
                                searchASIN.toLowerCase() &&
                                row.Name.toLowerCase() ===
                                    searchCategory.toLowerCase()
                          : row;
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
        filterInputData();
    }, [searchASIN, searchCategory, asinDropdown, hs6Dropdown, nameDropdown]);

    console.log(nameDropdown);

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

    const handleSearchASIN = (e) => {
        setSearchASIN(e.target.value);
    };

    const handleSearchCategory = (e) => {
        setSearchCategory(e.target.value);
    };

    const handleButtonClick = () => {
        setIsSubmit(!isSubmit);
    };

    return (
        <>
            {data?.length ? (
                <>
                    <h2 className="text-center m-4">CSV Reader</h2>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-6 d-flex">
                                <input
                                    type="file"
                                    accept=".csv"
                                    ref={fileInputRef}
                                />
                                <button
                                    className="btn btn-dark"
                                    onClick={handleFileUpload}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>

                    <h6 className="m-2">Total items: {data.length}</h6>
                    {isSubmit || true ? (
                        <>
                            {" "}
                            <h6 className="m-2">
                                Filtered items: {filteredData.length}
                            </h6>
                            <h6 className="m-2">
                                Efficiency:{" "}
                                {(filteredData.length / data.length) * 100} %
                            </h6>
                        </>
                    ) : (
                        ""
                    )}

                    <div className="container mt-4">
                        <label htmlFor="itemDropdown" className="form-label">
                            Select an item:
                        </label>
                        <select
                            id="itemDropdown"
                            className="form-select"
                            value={selectedName}
                            onChange={(e) => setSelectedName(e.target.value)}
                        >
                            <option value="">Select category:</option>
                            {nameDropdown.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        {selectedName && (
                            <p className="mt-2">You selected: {selectedName}</p>
                        )}
                    </div>
                    <div className="container mt-4">
                        <label htmlFor="itemDropdown" className="form-label">
                            Select an item:
                        </label>
                        <select
                            id="itemDropdown"
                            className="form-select"
                            value={selectedASIN}
                            onChange={(e) => setSelectedASIN(e.target.value)}
                        >
                            <option value="">Select ASIN:</option>
                            {asinDropdown.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        {selectedASIN && (
                            <p className="mt-2">You selected: {selectedASIN}</p>
                        )}
                    </div>
                    <div className="container mt-4">
                        <label htmlFor="itemDropdown" className="form-label">
                            Select an item:
                        </label>
                        <select
                            id="itemDropdown"
                            className="form-select"
                            value={selectedHS6}
                            onChange={(e) => setSelectedHS6(e.target.value)}
                        >
                            <option value="">Select HS6:</option>
                            {hs6Dropdown.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        {selectedHS6 && (
                            <p className="mt-2">You selected: {selectedHS6}</p>
                        )}
                    </div>
                    {/* <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-6 d-flex">
                                <input
                                    type="text"
                                    id="inputField"
                                    className="form-control me-2"
                                    value={searchASIN}
                                    placeholder="Search by ASIN..."
                                    onChange={handleSearchASIN}
                                />
                                <button
                                    className="btn btn-dark"
                                    onClick={handleButtonClick}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-6 d-flex">
                                <input
                                    type="text"
                                    id="inputField"
                                    className="form-control me-2"
                                    value={searchCategory}
                                    placeholder="Search by Category..."
                                    onChange={handleSearchCategory}
                                />
                                <button
                                    className="btn btn-dark"
                                    onClick={handleButtonClick}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div> */}
                    <br />
                    <br />
                    <CSVTable data={data} filteredData={filteredData} />
                    {/* <CustomTable data={data} /> */}
                </>
            ) : null}
        </>
    );
};

export default CSVData_Temp;
