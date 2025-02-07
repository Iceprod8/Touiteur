import { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LOGIN_MUTATION = gql`
  mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    success
    message
    token
  }
}
`;

const LoginComponent = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();


    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
      }

    const { user, login } = authContext;

    const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted: async (data) => {
            
          if (data.signIn.success) {
            const token = data.signIn.token;
            await login(token);
          } else {
            setError("Login failed: " + data.signIn.message);
          }
        },
        onError: (err) => {
          setError("Login failed: " + err.message);
        },
      });
    
      useEffect(() => {
        if (user) {
          console.log("User logged in, navigating...");
          navigate("/");
        }
      }, [user, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Missing username and/or password");
            return;
        }
        loginMutation({ variables: { username, password } });
    };       

    return (
        <div>
            <Container className="justify-content-center align-items-center w-25">
                <Row className="w-100">
                    <Col xs={12} md={12} lg={12} className="custom-container">
                        <div>
                            <h2 className="text-center mb-5">Login</h2>
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
                        <div className="mt-3">
                        <Link to="/register" className="custom-link">
                            <p>To register</p>
                        </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginComponent