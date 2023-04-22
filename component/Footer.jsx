import React from "react";
import { Col, Container } from "react-bootstrap";
import ContactUs from "./ContactUs";
import Link from "next/link";

function Footer() {
  return (
    <>
      <hr className="mt-3" />
      <ContactUs />

      <Container className="bg-sec p-0 flex-r bg-liner mt-3">
        <Col xs={6} lg={4} className="p-2">
          Links
          <ul>
            <li>
              <Link className="Link" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="Link" href="Blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="Link" href="Products">
                Shop
              </Link>
            </li>
          </ul>
        </Col>

        <Col xs={6} lg={4} className="p-2">
          FAQ
          <ul>
            <li>
              <Link className="Link" href="/">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="Link" href="Blog">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link className="Link" href="Products">
                Shop
              </Link>
            </li>
          </ul>
        </Col>
        {/* <Col xs={12} lg={4} className="p-2">
          Conatant Info
          <ul>
            <li>
              <FaEnvelope /> azzakhalid.sd@gmail.com{" "}
            </li>
            <li>
              <BsPhone />
              +249127877059
            </li>
            <li> FAQ</li>
          </ul>
        </Col> */}
        <Col xs={12}>
          <small>
            <center>©2023 by Faris Hamad. created with Next.js</center>
          </small>
        </Col>
      </Container>
    </>
  );
}

export default Footer;
