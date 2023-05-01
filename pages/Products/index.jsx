import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Modal } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { baseUrl } from "../_app";
import SpinnerLoading from "../../component/SpinnerLoading";
import { toast } from "react-toastify";
import { FillterForm, SearchModal } from "../../component/FillterForm";
import { FaStar, FaStarHalf } from "react-icons/fa";

function Products(props) {
  const [products, setProduct] = useState(props.products);
  const [fillteredProducts, setFillteredProducts] = useState(props.products);
  const [Fav, setFav] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [show, setShow] = useState(false);
  const [fillterShow, setfillterShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("ALL");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getProducts() {
    setIsLoading(true);
    fetch(`${baseUrl}/api/products?keyword=all`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
        setIsLoading(false);
      });
  }

  async function handleDelete() {
    fetch(`${baseUrl}/api/products/${productId}`, {
      method: "delete",
    }).then(() => {
      toast.success("Delete Done");
      getProducts();
    });
  }

  useEffect(() => {
    setFillteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [keyword]);

  useEffect(() => {
    if (!category) return;
    if (category == "ALL") {
      setFillteredProducts(products);
      return;
    }
    setFillteredProducts(
      products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    );
  }, [category]);

  useEffect(() => {
    setFav(JSON.parse(localStorage.getItem("fav")));
  }, []);
  // useEffect(() => {
  //   getProducts();
  // }, []);
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
      <SearchModal
        category={category}
        fillterShow={fillterShow}
        setCategory={setCategory}
        setfillterShow={setfillterShow}
      />
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container>
          <FillterForm
            keyword={keyword}
            setKeyword={setKeyword}
            setfillterShow={setfillterShow}
          />
          {isLoading && <SpinnerLoading />}
          {!isLoading && fillteredProducts.length > 0 ? (
            <ProductsContainer />
          ) : (
            <h2 className="text-center h-100 full">No Products</h2>
          )}
        </Container>
      )}
    </>
  );

  function ProductsContainer() {
    return (
      <Container className="p-0">
        <h2>Products</h2>
        <Container className="flex-r gap-2 p-0">
          {fillteredProducts.map((product, index) => {
            return (
              <Col
                key={index}
                xs={12}
                lg={5}
                className="product border bg-sec  mb-1 shadow rounded overflow-hidden"
              >
                <Card>
                  <Card.Img variant="top" src={product.img} height={"250px"} />
                  <Card.Body>
                    <Container className="p-0 flex-r">
                      <Col xs={11}>
                        <Card.Title>{product.name}</Card.Title>
                      </Col>
                      <Col xs={1}>
                        {Fav.find((prod) => prod.id === product.id) && (
                          <FaStar className="" />
                        )}
                        {/* <Dropdown>
                          <Dropdown.Toggle variant="" className="mb-3">
                            <BsThreeDotsVertical />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href={"Products/Edit/" + product.id}>
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#delete"
                              onClick={() => {
                                handleShow();
                                setProductId(product.id);
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown> */}
                      </Col>
                    </Container>
                    <Card.Subtitle className="mb-2 text-success">
                      {product.cost}$
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      {product.category}
                    </Card.Subtitle>
                    <Card.Text>{product.breif}</Card.Text>
                    <Link
                      href={`Products/${product.id}`}
                      className="Link bg-clr p-2 rounded shadow"
                    >
                      Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}{" "}
        </Container>
      </Container>
    );
  }
}

export default Products;

export async function getStaticProps() {
  const data = await fetch(`${baseUrl}/api/products?keyword=all`);
  const products = await data.json();

  return {
    props: {
      products: products,
    },
  };
}
