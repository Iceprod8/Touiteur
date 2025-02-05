import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

// const GET_CHARACTERS = graphql(`#gql
const GET_CHARACTERS = gql`
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

function AllCardsComponents() {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page }
  });

  console.log(data);

  let active = page;

  function next(page: number) {
    if (page <= data.characters.info.pages) {
      setPage(page);
    }
  }

  function prev(page: number) {
    if (page > 0) {
      setPage(page);
    }
  }

  if (loading) return <h1>Chargement...</h1>;
  if (error) return <h1>Erreur: {error.message}</h1>;

  return (
    <div>
      <br></br>
      <h1>All characters</h1>
      <br></br>
      <div className='pagination'>
        <Pagination>
          <Pagination.Prev onClick={() => prev(active - 1)} />
          <Pagination.Item active>{active}</Pagination.Item>
          <Pagination.Next onClick={() => next(active + 1)} />
        </Pagination>
      </div>
      <br></br>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-3">
        {data.characters.results.map((character: any) => (
          <Col key={character.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={character.image} />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                  <b>Statut: </b>{character.status} <br></br>
                  <b>Gender: </b>{character.gender}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>

  );
}

export default AllCardsComponents