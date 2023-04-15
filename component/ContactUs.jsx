import Link from "next/link";
import React from "react";
import { Col, Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
function ContactUs() {
  return (
    <Container className="flex-r pt-3 pb-3 p-0 bg-se">
      <Col xs={12} className="pb-5">
        <h3 className="text-center">Our Social Media</h3>

        <Container className="flex-r pt-2">
          <Col xs={4} className="flex bg-sec p-1 rounded shadow accounts">
            <Link
              href={
                "https://www.facebook.com/profile.php?id=100070826226965&mibextid=ZbWKwL"
              }
            >
              <img src="/images/facebook.svg" width={"100px"} />
            </Link>
            <small>Facebook</small>
          </Col>
          <Col xs={4} className="flex bg-sec rounded shadow accounts p-1">
            <img src="/images/tube.svg" width={"100px"} />
            <small>YouTube</small>
          </Col>
          <Col xs={4} className="flex bg-sec rounded shadow accounts p-1">
            <img src="/images/whats.svg" width={"100px"} />
            <small>Whatsup</small>
          </Col>
        </Container>
      </Col>

      <Col xs={12} className="p-2 m-0">
        <h3 className="text-center p-2">SCHEDULE A SESSION</h3>

        <Container className="flex-r rounded overflow-hidden bg-sec p-2 shadow">
          <Col xs={12} lg={6} className="p-1">
            <Form className="p-2 ms-1">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Your Massege</Form.Label>

                <Form.Control as="textarea" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs={12} lg={6}>
            <img src="/images/map.jpg" alt="" width={"100%"} height={"100%"} />
          </Col>
        </Container>
      </Col>
    </Container>
  );
}

export default ContactUs;
