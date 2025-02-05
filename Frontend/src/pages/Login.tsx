import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Col, Container, Row } from "react-bootstrap";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(email: $username, password: $password) {
      token
    }
  }
`;

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
          
          const token = data.login.token;
          
          sessionStorage.setItem("auth-token", token);
    
        },
        onError: (err) => {
            setError("Login didn't work: " + err.message);
        }
      });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
          setError("Missing data");
          return;
        }
        login({ variables: { username, password } });
      };


    return(
        <div>
             <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Row className="w-100">
                    <Col xs={12} md={12} lg={12} className="custom-container">
                    <div className="">
                        <h2 className="text-center mb-5">Register</h2>
                            <Form onSubmit={handleLogin} className="flex flex-col">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="username"
                                        placeholder="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-5">
                                    <Form.Control
                                        type="password"
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                                <Button type="submit" disabled={loading} className="btn-dark">
                                    {loading ? "Loading..." : "Connect"}
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

    export default LoginComponent
