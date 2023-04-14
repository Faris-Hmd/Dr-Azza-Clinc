import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Homepage() {
  return (
    <Container>
      <Row className="wave">
        <Col>
          <h1>GET HEALTHY WITH DR. AZZA KHALID</h1>
          <p>You Lives Once.. Make it Healthy & Put Your Diet into Focus</p>
        </Col>
      </Row>
      <Row>
        <p>
          There is often times a disconnect when it comes to living a healthy
          lifestyle; we know what’s good for our bodies, but we don’t always act
          accordingly. Dt. Azza Khalid aims to mend the gap between knowing and
          doing, by catering to each individual's unique circumstances. Whether
          it is weight loss or weight management, managing a dietary condition,
          or developing a healthy relationship with food, Dt. Azza Khalid offers
          a variety of services and packages designed to meet your needs.
        </p>
      </Row>{" "}
      <Row>
        <Col xs={12} lg={6}>
          <Image src={"/images/fruits.webp"} width={"500"} height={"200"} />
        </Col>
        <Col xs={12} lg={6}>
          Get a healthy diet plan according to your health status to get a
          healthy weight and lifestyle
        </Col>
      </Row>
      <Row>
        <h2 className="p-3 text-center">HEALTH SERVICES</h2>
      </Row>
      <Row className="pt-3">
        <Col xs={12}>
          <h3 className="">WEIGHT LOSS COUNSELING</h3>
        </Col>
        <Col xs={12} lg={6}>
          <img src={"/images/loss.jpg"} width={"100%"} height={"220px"} />
        </Col>
        <Col xs={12} lg={6}>
          <p>
            For years, Dt. Azza Khalid has been providing Weight Loss Counseling
            with comprehensive plans that are catered to each individual’s
            needs. This specialized service puts individuals on the right track
            to healthy eating and living. Get in touch today and start taking
            control of your life with these great tools and techniques.
          </p>
        </Col>
      </Row>
      <Row className="pt-3">
        <Col xs={12}>
          <h3 className="">SPORTS NUTRITION EDUCATION</h3>
        </Col>
        <Col xs={12} lg={6}>
          <img src={"/images/loss.jpg"} width={"100%"} height={"220px"} />
        </Col>
        <Col xs={12} lg={6}>
          <p>
            Jumpstart your healthy habits today with an experienced and
            responsible Clinical Nutritionist. Whatever your current diet is,
            Dt. Azza Khalid carefully evaluates each client and formulates a
            personalized plan based on your specific needs. So if Sports
            Nutrition Education is what you’re looking for, schedule a session
            today.
          </p>
        </Col>
      </Row>{" "}
      <Row className="pt-3">
        <Col xs={12}>
          <h3 className="">WEIGHT LOSS COUNSELING</h3>
        </Col>
        <Col xs={12} lg={6}>
          <img src={"/images/afocado.webp"} width={"100%"} height={"220px"} />
        </Col>
        <Col xs={12} lg={6}>
          <p>
            For years, Dt. Azza Khalid has been providing Weight Loss Counseling
            with comprehensive plans that are catered to each individual’s
            needs. This specialized service puts individuals on the right track
            to healthy eating and living. Get in touch today and start taking
            control of your life with these great tools and techniques.
          </p>
        </Col>
      </Row>{" "}
      <Row className="pt-3">
        <Col xs={12}>
          <h3 className="">WEIGHT LOSS COUNSELING</h3>
        </Col>
        <Col xs={12} lg={6}>
          <img src={"/images/loss.jpg"} width={"100%"} height={"220px"} />
        </Col>
        <Col xs={12} lg={6}>
          <p>
            For years, Dt. Azza Khalid has been providing Weight Loss Counseling
            with comprehensive plans that are catered to each individual’s
            needs. This specialized service puts individuals on the right track
            to healthy eating and living. Get in touch today and start taking
            control of your life with these great tools and techniques.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
