import { useQuery, gql } from '@apollo/client';
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from "react-router-dom";
import { Post } from '../gql/graphql';

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
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <h1>Chargement...</h1>;
  if (error) return <h1>Erreur: {error.message}</h1>;

  const sortedPosts = [...data.getPosts.posts].sort((a, b) => Number(b.id) - Number(a.id));

  return (
    <div>
      <br></br>
      <br></br>
      <h1>Tous les posts</h1>
      <br></br>
      <br></br>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-3">
        {sortedPosts.map((post: Post) => (
          <Col key={post.id}>
            <Card style={{ width: '18rem' }}>
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

export default AllCardsComponents