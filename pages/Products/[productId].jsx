import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import SpinnerLoading from "../../component/SpinnerLoading";
import { baseUrl } from "../_app";
import ProductPreveiw from "../../component/ProductPreveiw";

function Product() {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getProduct() {
    fetch(`${baseUrl}/api/products/${router.query.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
        console.log(data);
      });
  }

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
            <ProductPreveiw
              product={product}
              images={product.productImgs}
              secNo={product.secNo}
            />
          </Col>
        </Container>
      )}
    </>
  );
}

export default Product;