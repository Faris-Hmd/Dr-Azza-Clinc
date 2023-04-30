import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Modal } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { baseUrl } from "../_app";
import SpinnerLoading from "../../component/SpinnerLoading";
import { toast } from "react-toastify";
import { FillterForm, SearchModal } from "../../component/FillterForm";

function Products() {
  const [products, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState("");
  const [show, setShow] = useState(false);
  const [fillterShow, setfillterShow] = useState(false);
  const [keyword, setKeyword] = useState("");

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

  async function handleFillterdSearch() {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/api/products?keyword=${keyword}`);
    const data = await res.json();
    if (res.ok) {
      setProduct(data);
      setIsLoading(false);
    }
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
      <SearchModal
        keyword={keyword}
        fillterShow={fillterShow}
        setKeyword={setKeyword}
        setfillterShow={setfillterShow}
      />
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container>
          <FillterForm
            handleFillterdSearch={handleFillterdSearch}
            keyword={keyword}
            setKeyword={setKeyword}
            setfillterShow={setfillterShow}
          />
          {isLoading && <SpinnerLoading />}
          {!isLoading && products.length > 0 ? (
            <ProductsContainer />
          ) : (
            <h2>No Products</h2>
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
          {products.map((product, index) => {
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
                        <Dropdown>
                          <Dropdown.Toggle variant="" className="mb-3">
                            <BsThreeDotsVertical />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href={"EditProduct/" + product.id}>
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
          })}{" "}
        </Container>
      </Container>
    );
  }
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
