import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { baseUrl } from "../_app";
import { useRouter } from "next/router";
import SpinnerLoading from "../../component/SpinnerLoading";

function Article() {
  const router = useRouter();
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [arrLen, setArrLen] = useState(1);

  async function getArt() {
    fetch(`${baseUrl}/api/getArt?artId=${router.query.artId}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
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
    if (!router.query.artId) return;
    getArt();
  }, [router.query.artId]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container className="full p-0">
          <Col className="rounde mb-2 bg-sec p-0" xs={12} lg={10}>
            <Card>
              {/* <Card.Header>title</Card.Header> */}
              <Card.Body className="p-0">
                <Card.Title className="p-2 pt-3">{article.title}</Card.Title>

                <Card.Img src={article.atricleImgs[0].url} height={"300px"} />
                <Card.Subtitle className="p-2">{article.breif}</Card.Subtitle>
                {arr.map((index) => {
                  return (
                    <>
                      <Card.Title className="p-2">
                        {article?.[`section-${[index]}-title`]}
                      </Card.Title>
                      {article.atricleImgs[index - 0] && (
                        <Card.Img
                          src={article.atricleImgs[index - 0].url}
                          height={"300px"}
                        />
                      )}
                      <Card.Text className="p-2">
                        {article?.[`section-${[index]}-body`]}
                      </Card.Text>
                    </>
                  );
                })}

                <Card.Text className="p-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  alias earum libero ex adipisci tenetur illum saepe
                  reprehenderit voluptatem explicabo non nemo hic molestiae,
                  numquam ullam enim provident magni dicta.
                  <br /> Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Eos alias earum libero ex adipisci tenetur illum saepe
                  reprehenderit voluptatem explicabo non nemo hic molestiae,
                  numquam ullam enim provident magni dicta.
                  <br /> Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Eos alias earum libero ex adipisci tenetur illum saepe
                  reprehenderit voluptatem explicabo non nemo hic molestiae,
                  numquam ullam enim provident magni dicta.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      )}
    </>
  );
}

export default Article;
