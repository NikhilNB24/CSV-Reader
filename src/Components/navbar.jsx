import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import CustomIcon from "../Icons/CustomIcon";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
    return (
        <div>
            <Navbar variant="dark" bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <CustomIcon className="mr-2" />
                        CLUSTER ENGINE
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        className="icons"
                        style={{ justifyContent: "end" }}
                    >
                        <Nav>
                            <Nav.Link href="/csvreader" className="mx-4">
                                Stock CSV Reader
                            </Nav.Link>
                            <Nav.Link href="/filter" className="mx-4">
                                Custom CSV Reader
                            </Nav.Link>
                            <Nav.Link href="/clusterengine" className="mx-4">
                                Cluster Engine
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
export default NavBar;