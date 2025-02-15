import { gql, useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const REGISTER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    user {
      id
      username
    }
    success
    message
    token
  }
}
`;

const RegisterComponent = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
      }

    const { user, login } = authContext;

    const [register, { loading }] = useMutation(REGISTER_MUTATION, {
        onCompleted: async (data) => {
             
            const token = data.createUser.token;
            if (login) {
                await login(token);
            }
            else {
                setError("Login failed: " + data.signIn.message);
            }

            },
            onError: (err) => {
                setError("Register didn't work: " + err.message);
            }
          });

          useEffect(() => {
                  if (user) {
                    console.log("User logged in, navigating...");
                    navigate("/");
                  }
                }, [user, navigate]);
    
        const handleRegister = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!username || !password || !passwordConfirm) {
              setError("Missing data");
              return;
            }
            if (password != passwordConfirm) {
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
                                        type="password"
                                        placeholder="confirm password"
                                        value={passwordConfirm}
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