import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

// const GET_USERNAME = graphql(`#gql
const GET_USERNAME = gql`
query characters($search: Int){
  characters(search: $search) {
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


function SearchComponent() {

    // const { loading, error, data } = "";

    // function search(formData) {
    //     const productId = formData.get('productId')
    //     const { loading, error, data } = useQuery(GET_USERNAME, {
    //         variables: { productId }
    //     });
    // }

    return (
        <div>
            <p>oui</p>
            {/* <Navbar className="bg-body-tertiary justify-content-between">
                <Form inline action={search}>
                    <Row>
                        <Col xs="auto">
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Search</Button>
                        </Col>
                    </Row>
                </Form>
            </Navbar>
            <div>
                <br></br>
                <h1>All characters</h1>
                <br></br>
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
            </div> */}
        </div>
    );
}

export default SearchComponent