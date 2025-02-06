import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const POST_MUTATION = gql`
  mutation Post($content: String!) {
    register(content: $content) {
      content
    }
  }
`;

function ProfileComponent() {
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [register, { loading }] = useMutation(POST_MUTATION, {
        onError: (err) => {
            setError("Posting didn't work: " + err.message);
        }
    });

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content) {
            setError("Missing data");
            return;
        }
        register({ variables: { content } });
    };


    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Row className="w-100">
                    <Col xs={12} md={12} lg={12} className="custom-container">
                        <div className="">
                            <h2 className="text-center mb-5">Create a Touiteur post</h2>
                            <Form onSubmit={handlePost} className="flex flex-col">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        type="content"
                                        placeholder="Quoi de neuf ?"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </InputGroup>
                                <Button type="submit" disabled={loading} className="btn-dark">
                                    {loading ? "Loading..." : "Poster"}
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProfileComponent