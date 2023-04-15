import React from "react";
import { Card, Col, Container } from "react-bootstrap";

function Post() {
  return (
    <Container className="full p-0">
      <Col className="rounded mb-2 bg-sec p-0" xs={12} lg={10}>
        <Card>
          {/* <Card.Header>title</Card.Header> */}
          <Card.Body>
            <Card.Title>SPORTS NUTRITION EDUCATION</Card.Title>
            <Card.Img src={`/images/sport.jpg`} height={"300px"} />
            <Card.Text>
              Jumpstart your healthy habits today with an experienced and
              responsible Clinical Nutritionist. Whatever your current diet is,
              Dt. Azza Khalid carefully evaluates each client and formulates a
              personalized plan based on your specific needs. So if Sports
              Nutrition Education is what you’re looking for, schedule a session
              today.
              <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eos alias earum libero ex adipisci tenetur illum saepe
              reprehenderit voluptatem explicabo non nemo hic molestiae, numquam
              ullam enim provident magni dicta.
              <br />
            </Card.Text>
            <Card.Title>SPORTS NUTRITION EDUCATION</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos alias
              earum libero ex adipisci tenetur illum saepe reprehenderit
              voluptatem explicabo non nemo hic molestiae, numquam ullam enim
              provident magni dicta.
              <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eos alias earum libero ex adipisci tenetur illum saepe
              reprehenderit voluptatem explicabo non nemo hic molestiae, numquam
              ullam enim provident magni dicta.
              <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eos alias earum libero ex adipisci tenetur illum saepe
              reprehenderit voluptatem explicabo non nemo hic molestiae, numquam
              ullam enim provident magni dicta.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default Post;
