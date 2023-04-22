import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import Link from "next/link";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { baseUrl } from "./_app";
import SpinnerLoading from "../component/Spinner";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Articles() {
  const [articles, setArticle] = useState();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  async function getArts() {
    setIsLoading(true);
    fetch(`${baseUrl}/api/getArts?keyword=all`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      });
  }

  async function handleDelete(artId) {
    fetch(`${baseUrl}/api/getArt?artId=${artId}`, {
      method: "delete",
    }).then(() => {
      toast.success("Delete Done");
      getArts();
    });
  }

  useEffect(() => {
    getArts();
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
              <Button className="bg-clr shadow">
                Add Article
                <BsPlus size={"25px"} className="ms-2" />
              </Button>
            </Link>
          </Row>
          <Row>
            <Container className="flex-r gap-2">
              {articles.map((article) => {
                return (
                  <Col className="post rounded mb-2 bg-sec fc-b" xs={12} lg={5}>
                    <Card>
                      {/* <Card.Header>{title}</Card.Header> */}
                      <Card.Body>
                        <Container className="p-0 flex-r">
                          <Col xs={11}>
                            <Card.Title>{article.title}</Card.Title>
                          </Col>
                          <Col xs={1}>
                            <Dropdown>
                              <Dropdown.Toggle variant="" className="mb-3">
                                <BsThreeDotsVertical />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  href="#/action-1"
                                  onClick={() =>
                                    router.push("/EditArticle/" + article.id)
                                  }
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-2"
                                  onClick={() => handleDelete(article.id)}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Container>
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
