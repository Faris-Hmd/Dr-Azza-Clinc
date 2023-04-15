import React from "react";
import { Card, Col, Container } from "react-bootstrap";

const products = [
  {
    img: "afocado.webp",
    name: "Lorem ipsum dolor",
    rating: 4.3,
    cost: 1000,
  },
  {
    img: "diet.jpg",
    name: "Lorem ipsum dolor",
    rating: 4.3,
    cost: 1000,
  },
  {
    img: "gain.webp",
    name: "Lorem ipsum dolor",
    rating: 4.3,
    cost: 1000,
  },
  {
    img: "fruits.webp",
    name: "Lorem ipsum dolor",
    rating: 4.3,
    cost: 1000,
  },
];

function Products() {
  return (
    <Container className="p-0">
      <h1 className="p-2">Products</h1>
      <Container className="flex-r gap-2">
        {products.map((product) => {
          return (
            <Col
              xs={12}
              lg={5}
              className="product border bg-sec  mb-1 shadow rounded overflow-hidden"
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={`/images/${product.img}`}
                  height={"250px"}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-success">
                    {product.cost}$
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    {product.rating}
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Container>
    </Container>
  );
}

export default Products;
