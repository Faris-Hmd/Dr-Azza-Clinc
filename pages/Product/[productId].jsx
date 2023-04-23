import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import SpinnerLoading from "../../component/SpinnerLoading";
import { baseUrl } from "../_app";

function Product() {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [arrLen, setArrLen] = useState(1);

  async function getProduct() {
    fetch(`${baseUrl}/api/products/${router.query.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setArrLen(data.secNo);
        setIsLoading(false);
        console.log(data);
      });
  }

  useEffect(() => {
    setArr([]);
    for (let index = 1; index <= arrLen; index++) {
      setArr((prev) => [...prev, index]);
    }
  }, [arrLen]);

  useEffect(() => {
    if (!router.query.productId) return;
    getProduct(router.query.productId);
    console.log();
  }, [router.query.productId]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container className="p-0 full">
          <Col xs={12} lg={7}>
            <Card>
              <Carousel>
                {product.productImgs.map((img) => {
                  return (
                    <Carousel.Item>
                      <img
                        height={"250px"}
                        className="d-block w-100"
                        src={img.url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
              {/* <Card.Img variant="top" src={`/images/fruits.webp`} height={"250px"} /> */}
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-success">
                  {product.cost}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  {product.category}
                </Card.Subtitle>
                <Card.Title>Descreption</Card.Title>
                <Card.Text>{product.descreption}</Card.Text>

                {arr.map((index) => {
                  return (
                    <>
                      <Card.Title>
                        {product?.[`section-${[index]}-title`]}
                      </Card.Title>
                      <Card.Text>
                        {product?.[`section-${[index]}-body`]}
                      </Card.Text>
                    </>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        </Container>
      )}
    </>
  );
}

export default Product;
