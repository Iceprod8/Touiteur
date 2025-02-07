import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Post } from "../gql/graphql";

const POST_MUTATION = gql`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
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
        likedBy {
          username
        }
        id
        author {
          username
        }
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

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
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

function ProfileComponent() {
  const [content, setContent] = useState<string>("");
  const [errorPost, setErrorPost] = useState<string | null>(null);

  const { userId } = useContext(AuthContext) ?? {};
  console.log(userId);

  //avoir tous les posts du user connecté
  const { loading, error, data, refetch } = useQuery(GET_POSTS_USER, {
    variables: { userId },
    skip: !userId,
  });

  //creer un post
  const [createPost] = useMutation(POST_MUTATION, {
    onError: (err) => {
      setErrorPost("Posting didn't work: " + err.message);
    },
    onCompleted: () => {
      refetch();
    },
  });

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      setErrorPost("Missing data");
      return;
    }
    createPost({ variables: { content } });
  };

  //supprimer un post
  const [deletePost] = useMutation(DELETE_POST, {
    onError: (err) => {
      setErrorPost("Posting didn't work: " + err.message);
    },
    onCompleted: () => {
      refetch();
    },
  });

  const handleDelete = async (id: String) => {
    deletePost({ variables: { id } });
  };

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center pb-4">
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
      <h3 className="pb-4">Tous vos tweets</h3>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-3">
        {data?.getPostsUser?.posts?.map((post: Post) => (
          <Col key={post.id}>
            <Card style={{ width: "18rem" }}>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => handleDelete(post.id)}
              >
                <FaTrash />
              </div>

              <Card.Header>{post.author.username}</Card.Header>
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
  );
}

export default ProfileComponent;
