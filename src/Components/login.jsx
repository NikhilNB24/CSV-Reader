import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const isAuth = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate("/");
    });

    const handleLoginClick = () => {
        const loginUsername = "demo";
        const loginPassword = "password";

        if (username === loginUsername && password === loginPassword) {
            localStorage.setItem("token", true);
            navigate("/");
        } else {
            setError("Invalid username or password");
        }
    };
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mt-5 mb-3">Login</h2>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        {error && <p className="text-danger">{error}</p>}

                        <Button variant="primary" onClick={handleLoginClick}>
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
