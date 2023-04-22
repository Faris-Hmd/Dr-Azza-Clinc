import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
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
function Blog() {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <Container>
      <Row>
        <h1 className="p-2">ARTICLES</h1>
      </Row>
      <Row>
        <Container className="flex-r p-0 gap-2">
          {posts.map((post) => {
            return (
              <Col className="post rounded mb-2 bg-sec fc-b" xs={12} lg={5}>
                <Card>
                  {/* <Card.Header>{title}</Card.Header> */}
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Img src={`/images/${post.img}`} height={"300px"} />
                    <Card.Text>{post.post}</Card.Text>
                    <Link href="Post/1">
                      <Button variant="success">Read more</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Container>
      </Row>
    </Container>
  );
}

export default Blog;
