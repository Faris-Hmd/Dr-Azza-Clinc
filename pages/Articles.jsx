import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { baseUrl } from "./_app";
import SpinnerLoading from "../component/SpinnerLoading";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FaFilter, FaSearch } from "react-icons/fa";

function Articles(prop) {
  const [articles, setArticle] = useState(prop.articles);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [artId, setArtId] = useState("");
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getArts() {
    // setIsLoading(true);
    fetch(`${baseUrl}/api/getArts?keyword=all`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      });
  }
  async function handleFillterdSearch() {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/api/getArts?keyword=${keyword}`);
    const data = await res.json();
    if (res.ok) {
      setArticle(data);
      setIsLoading(false);
    }
  }

  async function handleDelete() {
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container>
          {" "}
          <Row className="flex-r justify-content-between p-0">
            {" "}
            <Form>
              <InputGroup className="shadow-sm border rounded">
                <Form.Control
                  type="text"
                  name="keyword"
                  placeholder="Search what you want"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="p-2 rounded border-0"
                />
                <Button
                  className="border-0 bg-sec"
                  onClick={(e) => {
                    // handleFillterdSearch(e);
                  }}
                >
                  <FaFilter />
                </Button>
                <Button
                  className="border-0 bg-clr"
                  disabled={keyword === "null" || keyword === ""}
                  // variant="outline-secondary"
                  onClick={(e) => {
                    handleFillterdSearch(e);
                  }}
                >
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>
            <h1 className="p-2">ARTICLES</h1>
            {/* <Link
              href={"/AddArticle"}
              className="p-0 m-0"
              style={{ width: "150px" }}
            >
              <Button className="bg-clr shadow">
                Add Article
                <BsPlus size={"25px"} className="ms-2" />
              </Button>
            </Link> */}
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
                                  onClick={() => {
                                    handleShow();
                                    setArtId(article.id);
                                  }}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Container>
                        <Card.Img src={article.img} height={"270px"} />
                        <Card.Text>{article?.breif}</Card.Text>
                        <Card.Text className="text-muted">
                          {article.category}
                        </Card.Text>
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

export async function getStaticProps() {
  const data = await fetch(`${baseUrl}/api/getArts?keyword=all`);
  const articles = await data.json();

  return {
    props: {
      articles: articles,
    },
  };
}
