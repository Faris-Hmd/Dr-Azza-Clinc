import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Fav() {
  const [Fav, setFav] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("fav")) return;
    setFav(JSON.parse(localStorage.getItem("fav")));
  }, []);
  return (
    <Container>
      <Row className="flex-r gap-1">
        {Fav.length > 0 ? (
          Fav.map((prod, index) => {
            return (
              <Col lg={5} xs={12}>
                <FavProd prod={prod} index={index} />
              </Col>
            );
          })
        ) : (
          <h2>No products</h2>
        )}
      </Row>
    </Container>
  );
}

export default Fav;
function FavProd({ prod, index }) {
  return (
    <Link href={"/Products/" + prod.id} className="Link">
      <Container key={index} className="bg-sec p-1 shadow rounded flex-r">
        <Col xs={4}>
          <img
            src={prod.productImgs[0].url}
            width={"100%"}
            height={"100px"}
            className="rounded"
          />
        </Col>
        <Col xs={8} className="ps-3">
          <p className="fs-5 m-0">{prod.name}</p>
          <p className="text-success m-0">{prod.cost}$</p>
          <p className="text-muted m-0 mt-2">{prod.category}</p>
        </Col>
      </Container>{" "}
    </Link>
  );
}
