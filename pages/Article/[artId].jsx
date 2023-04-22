import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { baseUrl } from "../_app";
import { useRouter } from "next/router";
import SpinnerLoading from "../../component/Spinner";

function Post() {
  const roter = useRouter();
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getArt() {
    fetch(`${baseUrl}/api/getArt?artId=${roter.query.artId}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!roter.query.artId) return;
    getArt();
  }, [roter.query.artId]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container className="full p-0">
          <Col className="rounded mb-2 bg-sec p-0" xs={12} lg={10}>
            <Card>
              {/* <Card.Header>title</Card.Header> */}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Img src={article.atricleImgs[0].url} height={"300px"} />
                <Card.Text>{article.body}</Card.Text>
                <Card.Title>SPORTS NUTRITION EDUCATION</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  alias earum libero ex adipisci tenetur illum saepe
                  reprehenderit voluptatem explicabo non nemo hic molestiae,
                  numquam ullam enim provident magni dicta.
                  <br /> Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Eos alias earum libero ex adipisci tenetur illum saepe
                  reprehenderit voluptatem explicabo non nemo hic molestiae,
                  numquam ullam enim provident magni dicta.
                  <br /> Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Eos alias earum libero ex adipisci tenetur illum saepe
                  reprehenderit voluptatem explicabo non nemo hic molestiae,
                  numquam ullam enim provident magni dicta.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      )}
    </>
  );
}

export default Post;