import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
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
import { jwtDecode } from "jwt-decode";
import { Post } from "../gql/graphql";

// ✅ Définition du type attendu pour le token
interface DecodedToken {
  userId: string;
}

// ✅ Mutation pour créer un post
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

// ✅ Requête pour récupérer les posts d'un utilisateur
const GET_POSTS_USER = gql`
  query GetPostsUser($userId: ID!) {
    getPostsUser(userId: $userId) {
      code
      message
      success
      posts {
        id
        content
        author {
          username
        }
        likedBy {
          username
        }
        comments {
          id
          content
          author {
            username
          }
        }
      }
    }
  }
`;

// ✅ Mutation pour supprimer un post
const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      code
      success
      message
      post {
        id
        content
      }
    }
  }
`;

const ProfileComponent: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [errorPost, setErrorPost] = useState<string | null>(null);

  // ✅ Fonction pour récupérer l'ID utilisateur depuis le token
  const getUserIdFromToken = (): string | null => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.userId;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  const userId = getUserIdFromToken();
  console.log("User ID:", userId);

  // ✅ Récupérer les posts de l'utilisateur connecté
  const { loading, error, data, refetch } = useQuery(GET_POSTS_USER, {
    variables: { userId },
    skip: !userId, // Évite d'exécuter la requête si userId est null
  });

  // ✅ Mutation pour créer un post
  const [createPost] = useMutation(POST_MUTATION, {
    onError: (err) =>
      setErrorPost(`❌ Erreur lors de la publication : ${err.message}`),
    onCompleted: () => {
      setContent(""); // Réinitialise le champ
      refetch();
    },
  });

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setErrorPost("⚠️ Le contenu du post ne peut pas être vide.");
      return;
    }
    createPost({ variables: { content } });
  };

  // ✅ Mutation pour supprimer un post
  const [deletePost] = useMutation(DELETE_POST, {
    onError: (err) =>
      setErrorPost(`❌ Erreur lors de la suppression : ${err.message}`),
    onCompleted: () => refetch(),
  });

  const handleDelete = async (id: string) => {
    deletePost({ variables: { id } });
  };

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100">
          <Col xs={12} className="custom-container">
            <h2 className="text-center mb-5">Create a Touiteur post</h2>
            <Form onSubmit={handlePost} className="flex flex-col">
              <InputGroup className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Quoi de neuf ?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </InputGroup>
              <Button type="submit" disabled={loading} className="btn-dark">
                {loading ? "Loading..." : "Poster"}
              </Button>
              {errorPost && <p className="text-danger mt-2">{errorPost}</p>}
            </Form>
          </Col>
        </Row>
      </Container>

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
};

export default ProfileComponent;
