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
import { BsThreeDotsVertical } from "react-icons/bs";
import { baseUrl } from "../_app";
import SpinnerLoading from "../../component/SpinnerLoading";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FaFilter, FaSearch } from "react-icons/fa";

function Articles(prop) {
  const [articles, setArticle] = useState(prop.articles);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [artId, setArtId] = useState("");
  const [show, setShow] = useState(false);
  const [fillterShow, setfillterShow] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getArticles() {
    // setIsLoading(true);
    fetch(`${baseUrl}/api/articles?keyword=all`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      });
  }
  async function handleFillterdSearch() {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/api/articles?keyword=${keyword}`);
    const data = await res.json();
    if (res.ok) {
      setArticle(data);
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    fetch(`${baseUrl}/api/articles/${artId}`, {
      method: "delete",
    }).then(() => {
      toast.success("Delete Done");
      getArticles();
    });
  }

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      <SearchModal
        keyword={keyword}
        fillterShow={fillterShow}
        setKeyword={setKeyword}
        setfillterShow={setfillterShow}
      />
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
      <Container>
        <FillterForm
          handleFillterdSearch={handleFillterdSearch}
          keyword={keyword}
          setKeyword={setKeyword}
          setfillterShow={setfillterShow}
        />
        {isLoading && <SpinnerLoading />}
        {!isLoading && articles.length > 0 ? (
          ArticlesContainer()
        ) : (
          <h2>No Articles</h2>
        )}
      </Container>
    </>
  );

  function ArticlesContainer() {
    return (
      <Container className="p-0">
        <Row>
          <h2>ARTICLES</h2>
          <Container className="flex-r gap-2">
            {articles.map((article) => {
              return (
                <Col className="rounded mb-2 bg-sec fc-b" xs={12} lg={5}>
                  <Card>
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
    );
  }
}

export default Articles;

export function FillterForm({
  setKeyword,
  keyword,
  setfillterShow,
  handleFillterdSearch,
}) {
  return (
    <Form onSubmit={handleFillterdSearch} className="mt-1">
      <InputGroup className="shadow-sm border rounded mb-2">
        <Form.Control
          type="text"
          name="keyword"
          placeholder="Search what you want"
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 rounded border-0"
          value={keyword}
        />

        <Button
          className="border-0 bg-sec text-muted"
          // variant="outline-secondary"
          onClick={() => {
            setfillterShow(true);
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
  );
}

export function SearchModal({
  fillterShow,
  setfillterShow,
  setKeyword,
  keyword,
}) {
  return (
    <Modal
      show={fillterShow}
      onHide={() => {
        setfillterShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Search Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Chose the category</Form.Label>
            <Form.Select
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              value={keyword}
            >
              <option value="LOREM">LOREM</option>
              <option value="IMPSUM">IMPSUM</option>
              <option value="DOLLOR">DOLLOR</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="bg-clr-green"
          onClick={() => setfillterShow(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export async function getStaticProps() {
  const data = await fetch(`${baseUrl}/api/articles?keyword=all`);
  const articles = await data.json();

  return {
    props: {
      articles: articles,
    },
  };
}
