import Link from "next/link";
import { useRouter } from "next/router";
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
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { baseUrl } from "./_app";
import SpinnerLoading from "../component/SpinnerLoading";
import { toast } from "react-toastify";

function Products() {
  const [products, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState("");
  const [show, setShow] = useState(false);

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
    getProducts();
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
        <Container className="p-0">
          <Row>
            <Col xs={8}>
              <h1 className="p-2">PRODUCTS</h1>
            </Col>
            <Col xs={3} className="flex">
              <Link
                href={"/AddProduct"}
                className="p-0 m-0"
                style={{ width: "160px" }}
              >
                <Button className="bg-clr shadow">
                  <BsPlus size={"25px"} className="m-2" />
                </Button>
              </Link>
            </Col>
          </Row>

          <Container className="flex-r gap-2">
            {products.map((product, index) => {
              return (
                <Col
                  key={index}
                  xs={12}
                  lg={5}
                  className="product border bg-sec  mb-1 shadow rounded overflow-hidden"
                >
                  <Card>
                    <Card.Img
                      variant="top"
                      src={product.img}
                      height={"250px"}
                    />
                    <Card.Body>
                      <Container className="p-0 flex-r">
                        <Col xs={11}>
                          <Card.Title>{product.name}</Card.Title>
                        </Col>
                        <Col xs={1}>
                          <Dropdown>
                            <Dropdown.Toggle variant="" className="mb-3">
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                href={"EditProduct/" + product.id}
                                // onClick={() =>
                                //   router.push("/Editproduct/" + product.id)
                                // }
                              >
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
                          </Dropdown>
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
                        href={`Product/${product.id}`}
                        className="Link bg-clr p-2 rounded shadow"
                      >
                        Details
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Container>
        </Container>
      )}
    </>
  );
}

export default Products;

// export async function getStaticProps() {
//   const data = await fetch(`${baseUrl}/api/products?keyword=all`);
//   const products = await data.json();

//   return {
//     props: {
//       products: products,
//     },
//   };
// }
