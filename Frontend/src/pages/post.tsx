import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { FaHeart, FaComment } from "react-icons/fa";

const GET_POST_BY_ID = gql`
query GetPostById($id: ID!) {
  getPostById(id: $id) {
    code
    message
    success
    post {
      content
      author {
        username
      }
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

const COMMENT_MUTATION = gql`
mutation Mutation($content: String!, $postId: ID!) {
  createComment(content: $content, postId: $postId) {
    code
  }
}
`;

function PostComponent() {
    const { id } = useParams();
    console.log(id);
    const { loading, error, data } = useQuery(GET_POST_BY_ID, {
        variables: { id },
        skip: !id
    });
    console.log(data);

    const [newComment, setNewComment] = useState("");
    const [errorComment, setErrorComment] = useState<string | null>(null);

    const [comment] = useMutation(COMMENT_MUTATION, {
        onError: (err) => {
            setErrorComment("Register didn't work: " + err.message);
        }
    });

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment) {
            setErrorComment("Missing comment");
            return;
        }
        comment({ variables: { newComment, id } });
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error.message}</p>;

    return (
        <div className="d-flex justify-content-center mt-4">
            <Card style={{ width: "40rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                {/* Post principal */}
                <Card.Header className="d-flex align-items-center bg-white">
                    <img 
                        src="https://random.imagecdn.app/500/150"
                        alt="profile" 
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                    />
                    <b>{data.getPostById.post.author.username}</b>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{data.getPostById.post.content}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center bg-white">
                    <span className="d-flex align-items-center">
                        <FaComment className="text-primary me-1" /> {data.getPostById.post.comments.length}
                    </span>
                    <span className="d-flex align-items-center">
                        <FaHeart className="text-danger me-1" /> 3 {/* {post.likes} */}
                    </span>
                </Card.Footer>
            </Card>

            {/* Liste des commentaires */}
            <div className="mt-3" style={{ width: "40rem" }}>
                {data.getPostById.post.comments.map((comment: any, index: number) => (
                    <Card key={index} className="mb-2 p-2" style={{ borderLeft: "4px solid #007bff", borderRadius: "8px" }}>
                        <div className="d-flex align-items-center">
                            <img 
                                src="https://random.imagecdn.app/500/150"
                                alt="profile" 
                                className="rounded-circle me-2"
                                width="30"
                                height="30"
                            />
                            <b>{comment.author.username}</b>
                        </div>
                        <p className="mt-1 mb-0">{comment.content}</p>
                    </Card>
                ))}
            </div>

            {/* Formulaire de commentaire */}
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "white",
                    padding: "10px",
                    boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Form style={{ flex: 1, display: "flex" }} onSubmit={handleComment}>
                    <Form.Control
                        type="text"
                        placeholder="Écrire un commentaire..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{ flex: 1, marginRight: "10px" }}
                    />
                    <Button type="submit" variant="primary">Envoyer</Button>
                </Form>
            </div>
        </div>
    );
}

export default PostComponent