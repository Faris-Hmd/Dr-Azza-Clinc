import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container } from "react-bootstrap";
import SpinnerLoading from "../../component/SpinnerLoading";
import { baseUrl } from "../_app";
import ProductPreveiw from "../../component/ProductPreveiw";
import { BsAlarm, BsStar, BsStarFill } from "react-icons/bs";

function Product() {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [fav, setFav] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getProduct() {
    fetch(`${baseUrl}/api/products/${router.query.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
        // console.log(data);
      });
  }

  useEffect(() => {
    if (!router.query.productId) return;
    getProduct(router.query.productId);
    console.log();
  }, [router.query.productId]);

  function handleFav() {
    const isFav = fav.find((prod) => prod.id === router.query.productId);
    if (isFav) {
      localStorage.setItem(
        "fav",
        JSON.stringify(fav.filter((prod) => prod.id !== router.query.productId))
      );
      // console.log(fav.filter((prod) => prod.id !== router.query.productId));
      setFav((prev) =>
        prev.filter((prod) => prod.id !== router.query.productId)
      );
    } else {
      // console.log([...fav, product]);
      localStorage.setItem("fav", JSON.stringify([...fav, product]));
      setFav((prev) => [...prev, product]);
    }
  }

  useEffect(() => {
    setFav(JSON.parse(localStorage.getItem("fav")));
  }, []);
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
            <ButtonGroup>
              <Button onClick={handleFav}>
                {fav.find((pro) => pro.id === router.query.productId) ? (
                  <BsStar />
                ) : (
                  <BsAlarm />
                )}
              </Button>
            </ButtonGroup>
          </Col>
        </Container>
      )}
    </>
  );
}

export default Product;
