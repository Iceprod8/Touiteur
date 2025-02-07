import { useQuery, gql } from '@apollo/client';

import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from "react-router-dom";

const GET_POSTS = gql`
query GetPosts {
    getPosts {
    code
    success
    message
    posts {
      likedBy{
        username
      }
      id
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

function AllCardsComponents() {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { page }
  });

  console.log(data);


  if (loading) return <h1>Chargement...</h1>;
  if (error) return <h1>Erreur: {error.message}</h1>;

  return (
    <div>
      <br></br>
      <br></br>
      <h1>Tous les posts</h1>
      <br></br>
      <br></br>
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
                  <span style={{ marginLeft: "10px" }}><b>Likes:</b> {post.likedBy.length}</span>
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

export default AllCardsComponents