import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import CustomIcon from "../Icons/CustomIcon";
import { Navbar, Nav } from "react-bootstrap";
import { useEffect } from "react";

const NavBar = () => {
    const isAuth = localStorage.getItem("token");
    useEffect(() => {}, [isAuth]);
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
                            <Nav.Link href="/rawdata" className="mx-4">
                                Raw Data
                            </Nav.Link>
                            <Nav.Link href="/dashboard" className="mx-4">
                                Dashboard
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
