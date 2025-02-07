import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";

const GET_POST_BY_ID = gql`
query GetPostById($id: ID!) {
  getPostById(id: $id) {
    code
    message
    success
    post {
      id
      likedBy{
        username
      }
      content
      author {
        username
      }
      comments {
        id
        content
        author {
          username
        }
        likedBy{
            username
        }
      }
    }
  }
}
`;

const COMMENT_MUTATION = gql`
mutation CreateComment($content: String!, $postId: ID!) {
  createComment(content: $content, postId: $postId) {
    code
  }
}
`;

const LIKE_MUTATION = gql`
mutation Mutation($commentId: ID!) {
  likeComment(commentId: $commentId) {
    comment {
      likedBy {
        id
      }
    }
  }
}
`;

const UNLIKE_MUTATION = gql`
mutation UnlikeComment($commentId: ID!) {
  unlikeComment(commentId: $commentId) {
    comment {
      likedBy {
        username
      }
    }
  }
}
`;

const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!) {
  likePost(postId: $postId) {
    code
  }
}
`;

const UNLIKE_POST_MUTATION = gql`
mutation unlikePost($postId: ID!) {
  unlikePost(postId: $postId) {
    code
  }
}
`;

function PostComponent() {
    const userId = "6688d08e-750c-4e26-a293-82987423ad20";
    const { id } = useParams();
    console.log(id);

    const { loading, error, data, refetch } = useQuery(GET_POST_BY_ID, {
        variables: { id },
        skip: !id
    });
    console.log(data);

    const [newComment, setNewComment] = useState("");
    const [errorComment, setErrorComment] = useState<string | null>(null);
    const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});
    const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

    //ajouter un commentaire
    const [comment] = useMutation(COMMENT_MUTATION, {
        onError: (err) => {
            setErrorComment("Register didn't work: " + err.message);
        },
        onCompleted: () => {
            refetch();
        }
    });

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment) {
            setErrorComment("Missing comment");
            return;
        }
        comment({ variables: { content: newComment, postId: id } });
    };

    //liker/unliker un post
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        onError: (err) => {
            setErrorComment("Register didn't work: " + err.message);
        }
    });

    const [unlikePost] = useMutation(UNLIKE_POST_MUTATION, {
        onError: (err) => {
            setErrorComment("Register didn't work: " + err.message);
        }
    });

    const handleLikePost = () => {
        if (id) {
            const isLiked = likedPosts[id];
            setLikedPosts(prev => ({
                ...prev,
                [id]: !isLiked
            }));

            console.log(id);
            if (isLiked) {
                unlikePost({ variables: {postId: id } });
            } else {
                likePost({ variables: { postId: id } });
            }
        }
    };

    //liker/unliker un commentaire
    const [like] = useMutation(LIKE_MUTATION, {
        onError: (err) => {
            setErrorComment("Register didn't work: " + err.message);
        }
    });

    const [unlike] = useMutation(UNLIKE_MUTATION, {
        onError: (err) => {
            setErrorComment("Register didn't work: " + err.message);
        }
    });

    const handleLike = (commentId: string) => {
        const isLiked = likedComments[commentId];

        setLikedComments(prev => ({
            ...prev,
            [commentId]: !isLiked
        }));

        console.log(commentId);
        if (isLiked) {
            unlike({ variables: { commentId } });
        } else {
            like({ variables: { commentId } });
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error.message}</p>;

    return (
        <div className="d-flex flex-column align-items-center" style={{ marginBottom: "60px", marginTop: "80px" }}>
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
                        <FaHeart
                            className={likedPosts[data.getPostById.post.id] ? "text-danger" : "text-secondary"}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleLikePost()}
                        />
                        <span className="ms-1">{likedPosts[data.getPostById.post.id] ? data.getPostById.post.likedBy.length + 1 : data.getPostById.post.likedBy.length} </span>
                    </span>
                </Card.Footer>
            </Card>

            {/* Liste des commentaires */}
            <div className="mt-3" style={{ width: "40rem" }}>
                {data.getPostById.post.comments.map((comment: any, index: number) => (
                    <Card key={index} className="mb-2 p-2" style={{ borderLeft: "4px solid #007bff", borderRadius: "8px" }}>
                        <Card.Header className="d-flex align-items-center">
                            <img
                                src="https://random.imagecdn.app/500/150"
                                alt="profile"
                                className="rounded-circle me-2"
                                width="30"
                                height="30"
                            />
                            <b>{comment.author.username}</b>
                        </Card.Header>
                        <Card.Body className="mt-1 mb-0">{comment.content}</Card.Body>
                        <Card.Footer className="d-flex justify-content-between align-items-center bg-white">
                            <span className="d-flex align-items-center">
                                <FaHeart
                                    className={likedComments[comment.id] ? "text-danger" : "text-secondary"}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleLike(comment.id)}
                                />
                                <span className="ms-1">{likedComments[comment.id] ? comment.likedBy.length + 1 : comment.likedBy.length} </span>
                            </span>
                        </Card.Footer>
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