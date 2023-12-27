import CSVData from "./csvreader";
import CSVData_Temp from "./csvReader_Temp";
import YourComponent from "./playground";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

function App() {
    return (
        <>
            {/* <CSVData /> */}
            <YourComponent />
            <CSVData_Temp />
        </>
    );
}

export default App;
