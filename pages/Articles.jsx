import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { BsPlus } from "react-icons/bs";
import { baseUrl } from "./_app";
import SpinnerLoading from "../component/Spinner";

function Articles() {
  const [articles, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  async function getArt() {
    fetch(`${baseUrl}/api/getArts?keyword=all`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getArt();
  }, []);

  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container>
          <Row className="flex-r justify-content-between">
            <h1 className="p-2 w-50">ARTICLES</h1>
            <Link
              href={"/AddArticle"}
              className="p-0 m-2"
              style={{ width: "160px" }}
            >
              <Button className="bg-clr-green shadow">
                Add Article
                <BsPlus size={"25px"} className="ms-2" />
              </Button>
            </Link>
          </Row>
          <Row>
            <Container className="flex-r p-0 gap-2">
              {articles.map((article) => {
                return (
                  <Col className="post rounded mb-2 bg-sec fc-b" xs={12} lg={5}>
                    <Card>
                      {/* <Card.Header>{title}</Card.Header> */}
                      <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Img src={article.img} height={"270px"} />
                        <Card.Text>{article.body}</Card.Text>
                        <Link href={`Article/${article.id}`}>
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
      )}
    </>
  );
}

export default Articles;
