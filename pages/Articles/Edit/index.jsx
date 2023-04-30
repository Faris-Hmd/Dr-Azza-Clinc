import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import SpinnerLoading from "../../../component/SpinnerLoading";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FillterForm, SearchModal } from "../../../component/FillterForm";
import { baseUrl } from "../../_app";

function Articles(props) {
  const router = useRouter();
  const [articles, setArticles] = useState(props.articles);
  const [fillteredArticles, setFillteredArticles] = useState(props.articles);
  const [isLoading, setIsLoading] = useState(false);
  const [artId, setArtId] = useState("");
  const [show, setShow] = useState(false);
  const [fillterShow, setfillterShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("ALL");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getArticles() {
    setIsLoading(true);
    fetch(`${baseUrl}/api/articles?keyword=all`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setFillteredArticles(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setFillteredArticles(
      articles.filter((article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [keyword]);

  useEffect(() => {
    if (!category) return;
    if (category == "ALL") {
      setFillteredArticles(articles);
      return;
    }
    setFillteredArticles(
      articles.filter(
        (article) => article.category.toLowerCase() === category.toLowerCase()
      )
    );
  }, [category]);

  async function handleDelete() {
    fetch(`${baseUrl}/api/articles/${artId}`, {
      method: "delete",
    }).then(() => {
      toast.success("Delete Done");
      getArticles();
    });
  }

  // useEffect(() => {
  //   getArticles();
  // }, []);
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      <SearchModal
        keyword={keyword}
        fillterShow={fillterShow}
        setKeyword={setKeyword}
        category={category}
        setCategory={setCategory}
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
          keyword={keyword}
          setKeyword={setKeyword}
          setfillterShow={setfillterShow}
        />

        {isLoading && <SpinnerLoading />}
        {!isLoading && fillteredArticles.length > 0 ? (
          <ArticlesContainer />
        ) : (
          <h2 className="full h-100">No Articles</h2>
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
            {fillteredArticles.map((article, index) => {
              return (
                <Col
                  className="rounded mb-2 bg-sec fc-b"
                  xs={12}
                  lg={5}
                  key={index}
                >
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
                                  router.push("Edit/" + article.id)
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
                      <Link href={`/Articles/${article.id}`}>
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

export async function getStaticProps() {
  const data = await fetch(`${baseUrl}/api/articles?keyword=all`);
  const articles = await data.json();

  return {
    props: {
      articles: articles,
    },
  };
}
