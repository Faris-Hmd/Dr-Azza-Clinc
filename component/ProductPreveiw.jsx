import { useEffect, useState } from "react";
import { Card, Carousel } from "react-bootstrap";

function ProductPreveiw({ product, images, secNo }) {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    setArr([]);
    for (let index = 1; index <= secNo; index++) {
      setArr((prev) => [...prev, index]);
    }
  }, [secNo]);

  return (
    <Card>
      <Card.Body className="p-0">
        {images.length > 0 && (
          <Carousel>
            {images.map((img, index) => {
              return (
                <Carousel.Item
                  onDoubleClick={() => removeImage(img.url)}
                  key={index}
                >
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
        )}
        <Card.Title className=" p-2">{product.name}</Card.Title>
        <Card.Subtitle className="p-2 text-success">
          {product.cost}$
        </Card.Subtitle>
        <Card.Subtitle className="p-2">{product.category}$</Card.Subtitle>
        {arr.map((index) => {
          return (
            <>
              <Card.Title className="p-2">
                {product?.[`section-${[index]}-title`]}
              </Card.Title>

              <Card.Text className="p-2">
                {product?.[`section-${[index]}-body`]}
              </Card.Text>
            </>
          );
        })}
      </Card.Body>
    </Card>
  );
}

export default ProductPreveiw;
