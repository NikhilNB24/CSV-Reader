import Table from "react-bootstrap/Table";

const CSVTable = ({ data, filteredData }) => {
    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ASIN</th>
                        <th>HS6</th>
                        <th>Cluster Id</th>
                    </tr>
                </thead>
                <tbody>
                    {(filteredData?.length > 0 ? filteredData : data).map(
                        (row, index) => (
                            <tr key={index}>
                                <td>{row.Name}</td>
                                <td>{row.ASIN}</td>
                                <td>{row.HS6}</td>
                                <td>{row.ClusterId}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default CSVTable;
