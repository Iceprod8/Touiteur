import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const GET_USERNAME = gql`
query users($search: Int){
  users(search: $search) {
      info {
      pages
    }
    results {
      posts{
        title 
        content
        comment
        like
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


    // if (loading) return <h1>Chargement...</h1>;
    // if (error) return <h1>Erreur: {error.message}</h1>;

    return (
        <div>
            <p>oui</p>

            <Navbar className="bg-body-tertiary justify-content-between">
                <Form onSubmit={search}>
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
                            <Button type="submit">Search</Button>
                        </Col>
                    </Row>
                </Form>
            </Navbar>

            {loading && <p>Chargement...</p>}
            {error && <h1>Aucun utilisateur trouvé :\</h1>}

            {/* Affichage conditionnel des posts */}
            {data?.users?.results?.posts?.length > 0 ? (
                <div>
                    <br />
                    <h1>Utilisateur trouvé !</h1>
                    <br />
                    <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-3">
                        {data.users.results.posts.map((post: any) => (
                            <Col key={post.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Header>{post.user.username}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>{post.content}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <b>comment: </b>{post.status} <br />
                                        <b>like: </b>{post.gender}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                !loading && !error ? <p>Cherche un utilisateur pour voir ses posts !</p> : <p>Aucun post.</p>
            )}
        </div>
    );

}

export default SearchComponent