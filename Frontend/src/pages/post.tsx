import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const GET_POST_BY_ID = gql`
query characters($page: Int){
  characters(page: $page) {
      info {
      pages
    }
    results {
      id
      name
      status
      gender
      image
    }
  }
}
`;

const COMMENT_MUTATION = gql`
  mutation Comment($comment: String!) {
    comment(comment: $comment) {
      token
    }
  }
`;

function PostComponent() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_POST_BY_ID, {
        variables: { id },
    });

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error.message}</p>;

    const post = data.post;

    const [newComment, setNewComment] = useState("");
    const [errorComment, setErrorComment] = useState<string | null>(null);

    const [register] = useMutation(COMMENT_MUTATION, {
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
        register({ variables: { newComment } });
    };

    return (
        <div>
            <Card style={{ width: "24rem", margin: "auto" }}>
                <Card.Header>{post.user.username}</Card.Header>
                <Card.Body>
                    <Card.Text>{post.content}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <p>
                        <b>comments: </b>{post.comments.length} <br />
                        <b>likes: </b>{post.likes}
                    </p>
                    {data.post.results.comments.map((comment: any) => (
                        <div>
                            <h3>{comment.user.username}</h3>
                            <p>{comment.content}</p>
                            <p><b>likes: </b>{post.likes.length}</p>
                        </div>
                    ))}
                </Card.Footer>
            </Card>
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