import React from "react";
import { Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <Container className="bg-sec p-0 flex-r bg-liner">
      <Col xs={6} lg={3} className="p-2">
        Contact Info
        <br />
        <small> azzakhalid.sd@gmail.com +249127877059</small>
      </Col>{" "}
      <Col xs={6} lg={3} className="p-2">
        Contact Info
        <small>
          {" "}
          <ul>
            <li> drazza@gmail.com</li>
            <li>+249912345678</li>
          </ul>
        </small>
      </Col>{" "}
      <Col xs={6} lg={3} className="p-2">
        Contact Us
        <small>
          {" "}
          <ul>
            <li> drazza@gmail.com</li>
            <li>+249912345678</li>
          </ul>
        </small>
      </Col>{" "}
      <Col xs={6} lg={3} className="p-2">
        Contact Us
        <small>
          {" "}
          <ul>
            <li> drazza@gmail.com</li>
            <li>+249912345678</li>
          </ul>
        </small>
      </Col>
      <Col xs={12}>
        <small>
          <center>©2023 by Faris Hamad. created with Next.js</center>
        </small>
      </Col>
    </Container>
  );
}

export default Footer;
