import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { baseUrl } from "../_app";
import SpinnerLoading from "../../component/SpinnerLoading";
import { FillterForm, SearchModal } from "../../component/FillterForm";
import { FaStar } from "react-icons/fa";

function Products(props) {
  const [products, setProduct] = useState([]);
  const [fillteredProducts, setFillteredProducts] = useState([]);
  const [Fav, setFav] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fillterShow, setfillterShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("ALL");

  async function getProducts() {
    setIsLoading(true);
    fetch(`${baseUrl}/api/products?keyword=all`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
        setFillteredProducts(data);
        setIsLoading(false);
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
    if (!localStorage.getItem("fav")) return;
    setFav(JSON.parse(localStorage.getItem("fav")));
  }, []);
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
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

// export async function getStaticProps() {
//   const data = await fetch(`${baseUrl}/api/products?keyword=all`);
//   const products = await data.json();

//   return {
//     props: {
//       products: products,
//     },
//   };
// }
