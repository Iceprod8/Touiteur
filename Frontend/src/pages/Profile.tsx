import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const POST_MUTATION = gql`
mutation CreatePost($content: String!, $authorId: ID!) {
  createPost(content: $content, authorId: $authorId) {
    code
    success
    message
    post {
      content
      author {
        username
      }
    }
  }
}
`;

const GET_POSTS_USER = gql`
query GetPostsUser($userId: ID!) {
  getPostsUser(userId: $userId) {
    code
    message
    success
    posts {
      content
      comments {
        content
        author {
          username
        }
      }
    }
  }
}
`;

function ProfileComponent() {
    const id = "";
    const [content, setContent] = useState("");
    const [errorPost, setErrorPost] = useState<string | null>(null);

    const { loading, error, data } = useQuery(GET_POSTS_USER, {
        variables: { id },
        skip: !id
    });

    const [post] = useMutation(POST_MUTATION, {
        onError: (err) => {
            setErrorPost("Posting didn't work: " + err.message);
        }
    });

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content) {
            setErrorPost("Missing data");
            return;
        }
        post({ variables: { content } });
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
            <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-3">
        {data.getPosts.posts.map((post: any) => (
          <Col key={post.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Header>{post.author.username}</Card.Header>
              <Card.Body>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <p>
                  <span><b>Comments:</b> {post.comments.length}</span>
                  <span style={{ marginLeft: "10px" }}><b>Likes:</b> 8</span>
                </p>
                <Link to={`/post/${post.id}`}>Voir plus</Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
        </div>
    );
}

export default ProfileComponent