import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Post from "../component/Post";
import ContactUs from "../component/ContactUs";
import Footer from "../component/Footer";

const posts = [
  {
    img: "loss.jpg",
    title: "WEIGHT LOSS COUNSELING",
    post: "For years, Dt. Azza Khalid has been providing Weight Loss Counseling with comprehensive plans that are catered to each individual’s needs. This specialized service puts individuals on the right track to healthy eating and living. Get in touch today and start taking control of your life with these great tools and techniques.",
  },
  {
    img: "sport.jpg",
    title: "SPORTS NUTRITION EDUCATION",
    post: "Jumpstart your healthy habits today with an experienced and responsible Clinical Nutritionist. Whatever your current diet is, Dt. Azza Khalid carefully evaluates each client and formulates a personalized plan based on your specific needs. So if Sports Nutrition Education is what you’re looking for, schedule a session today",
  },
  {
    img: "gain.webp",
    title: "WEIGHT GAIN COUNSELING",
    post: "For years, Dt. Azza Khalid has been providing Weight gain Counseling with comprehensive plans that are catered to each individual’s needs. This specialized service puts individuals on the right track to healthy eating and living. Get in touch today and start taking control of your life with these great tools and technique.",
  },
  {
    img: "diet.jpg",
    title: "DIET PLAN ACCORDING TO YOUR HEALTH STATUS",
    post: "Whatever your current healthy status and the diseases youhave, Dt. Azza Khalid carefully evaluates each client and formulates a personalized plan based on your specific needs. Send us your medical results and you will get a good diet plan according to your health status Whatever your current healthy status.",
  },
];

function Homepage() {
  return (
    <Container>
      <Row className="wave">
        <Col>
          <h1>GET HEALTHY WITH DR. AZZA KHALID</h1>
          <p>You Lives Once.. Make it Healthy & Put Your Diet into Focus</p>
        </Col>
      </Row>
      <Row className="text m-2 shadow rounded bg-sec">
        {" "}
        <Col xs={12} lg={6} className="p-0">
          <Image src={"/images/fruits.webp"} width={"100%"} height={"290px"} />
        </Col>
        <Col xs={12} lg={6} className="pt-1 bg-sec">
          <p>
            There is often times a disconnect when it comes to living a healthy
            lifestyle; we know what’s good for our bodies, but we don’t always
            act accordingly. Dt. Azza Khalid aims to mend the gap between
            knowing and doing, by catering to each individual's unique
            circumstances. Whether it is weight loss or weight management,
            managing a dietary condition, or developing a healthy relationship
            with food, Dt. Azza Khalid offers a variety of services and packages
            designed to meet your needs. <br />
            Get a healthy diet plan according to your health status to get a
            healthy weight and lifestyle.
          </p>
        </Col>
      </Row>
      <Row>
        <h2 className="p-3 text-center ">HEALTH SERVICES</h2>
      </Row>
      <Row className="p-0 m-0">
        <Container className="flex-r p-0">
          {posts.map((post) => {
            return <Post post={post.post} img={post.img} title={post.title} />;
          })}
        </Container>
      </Row>
      <Row className="p-0">
        <ContactUs />
      </Row>
    </Container>
  );
}

export default Homepage;
