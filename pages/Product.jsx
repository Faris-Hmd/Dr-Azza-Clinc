import React, { useEffect } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";

function Product() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Container className="p-0 full">
      <Col xs={12} lg={7}>
        <Card>
          <Carousel>
            <Carousel.Item>
              <img
                height={"250px"}
                className="d-block w-100"
                src="/images/fruits.webp"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                height={"250px"}
                className="d-block w-100"
                src="/images/diet.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                height={"250px"}
                className="d-block w-100"
                src="/images/gain.webp"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          {/* <Card.Img variant="top" src={`/images/fruits.webp`} height={"250px"} /> */}
          <Card.Body>
            <Card.Title>Lorem ipsum dolor</Card.Title>
            <Card.Subtitle className="mb-2 text-success">1000$</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">4.3</Card.Subtitle>
            <Card.Title>Descreption</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              quaerat soluta esse excepturi nesciunt pariatur tempora architecto
              accusantium distinctio voluptatum voluptas iusto rem eius, optio
              consequuntur animi nisi dolorum? Aspernatur!
            </Card.Text>
            <Card.Title>Usage</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              quaerat soluta esse excepturi nesciunt
            </Card.Text>
          </Card.Body>
          <Button className="bg-clr m-2 shadow">Order Now</Button>
        </Card>
      </Col>
    </Container>
  );
}

export default Product;
