import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { Post } from "../gql/graphql";

const GET_USERNAME = gql`
  query User($username: String!) {
    getUserByName(username: $username) {
      user {
        username
        id
        posts {
          author {
            id
            username
          }
          id
          likedBy {
            username
          }
          content
          comments {
            id
          }
        }
      }
    }
  }
`;

function SearchComponent() {
  const [username, setUsername] = useState<string | null>(null);

  const { loading, error, data } = useQuery(GET_USERNAME, {
    variables: { username },
    skip: !username,
  });

  function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const usernameValue = formData.get("Username") as string;
    setUsername(usernameValue);
  }

  return (
    <div>
      <Navbar className="justify-content-center">
        <Form onSubmit={search} className="mb-4">
          <Row className="align-items-center">
            <Col xs="auto">
              <InputGroup>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="Username"
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Button type="submit" className="btn-dark">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Navbar>

      {loading && <h3>Chargement...</h3>}
      {error && <h3>Aucun utilisateur trouvé :\</h3>}

      {data?.getUserByName?.user ? (
        <div>
          <br />
          <h1>Utilisateur trouvé !</h1>
          <br />
          <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-3">
            {data.getUserByName.user.posts.map((post: Post) => (
              <Col key={post.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Header>{data.getUserByName.user.username}</Card.Header>
                  <Card.Body>
                    <Card.Text>{post.content}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <p>
                      <span>
                        <b>Comments:</b> {post.comments?.length || 0}
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        <b>Likes:</b> {post.likedBy?.length || 0}
                      </span>
                    </p>
                    <Link to={`/post/${post.id}`}>Voir plus</Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : !loading && !error ? (
        <p>Cherche un utilisateur pour voir ses posts !</p>
      ) : (
        <p>Aucun post.</p>
      )}
    </div>
  );
}

export default SearchComponent;
