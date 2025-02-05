import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(email: $username, password: $password) {
      token
    }
  }
`;

const RegisterComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfim, setPasswordConfirm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [register, { loading }] = useMutation(REGISTER_MUTATION, {
        onCompleted: (data) => {
             
            const token = data.login.token;
              
            sessionStorage.setItem("auth-token", token);
        
            },
            onError: (err) => {
                setError("Register didn't work: " + err.message);
            }
          });
    
        const handleRegister = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!username || !password || !passwordConfim) {
              setError("Missing data");
              return;
            }
            if (password != passwordConfim) {
                setError("Not the same password");
                return;
              }
            register({ variables: { username, password } });
          };

    return (
        
            <Container className="justify-content-center align-items-center w-25">
                <Row className="w-100">
                    <Col xs={12} md={12} lg={12} className="custom-container">
                    <div>
                        <h2 className="text-center mb-5">Register</h2>
                            <Form onSubmit={handleRegister} className="flex flex-col">
                                <InputGroup className="mb-3 ">
                                    <Form.Control
                                        type="username"
                                        placeholder="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="">
                                    <Form.Control
                                        type="password"
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-4">
                                    <Form.Control
                                        type="passwordConfirm"
                                        placeholder="confirm password"
                                        value={password}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                    />
                                </InputGroup>
                                <Button type="submit" disabled={loading} className="btn-dark">
                                    {loading ? "Loading..." : "Register"}
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        
    )
}

export default RegisterComponent