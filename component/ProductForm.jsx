import { useEffect, useState } from "react";
import { Card, Carousel, Form } from "react-bootstrap";

function ProductForm({
  handleUploadProductImg,
  handleChange,
  product,
  secNo,
  setSecNo,
  images,
  removeImage,
  handleImgChange,
}) {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    setArr([]);
    for (let index = 1; index <= secNo; index++) {
      setArr((prev) => [...prev, index]);
    }
  }, [secNo]);
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleUploadProductImg} id="productForm">
          <Form.Group className="mb-3">
            <Form.Label>PRODUCT NAME</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              value={product.name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>BREIF</Form.Label>
            <Form.Control
              as="textarea"
              name="breif"
              required
              onChange={handleChange}
              value={product.breif}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>COST</Form.Label>
            <Form.Control
              type="number"
              name="cost"
              required
              onChange={handleChange}
              value={product.cost}
              min={10}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>PRODUCT CATEGORY</Form.Label>
            <Form.Select
              required
              name="category"
              onChange={handleChange}
              value={product.category}
            >
              <option value="LOREM">LOREM</option>
              <option value="IPSUM">IPSUM</option>
              <option value="DOLLOR">DOLLOR</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>SECTION NUMBER</Form.Label>
            <Form.Control
              type="number"
              value={secNo}
              required
              min={1}
              onChange={(e) => setSecNo(e.target.value)}
            />
          </Form.Group>
          {arr.map((index) => {
            return (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>SECTION {index} TITLE</Form.Label>
                  <Form.Select
                    type="text"
                    name={"section-" + [index] + "-title"}
                    required
                    onChange={handleChange}
                    value={product?.[`section-${[index]}-title`]}
                  >
                    <option value="Descreption">Descreption</option>
                    <option value="DETAILS">DETAILS</option>
                    <option value="BREIF">BREIF</option>
                    <option value="USAGE">USAGE</option>
                    <option value="CAUTION">CAUTION</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SECTION {index} BODY</Form.Label>
                  <Form.Control
                    as="textarea"
                    name={"section-" + [index] + "-body"}
                    required
                    rows={2}
                    onChange={handleChange}
                    value={product?.[`section-${[index]}-body`]}
                  />
                </Form.Group>
                <hr />
              </>
            );
          })}
        </Form>
      </Card.Body>

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

      {images.length === 0 && (
        <Card.Img
          variant="buttom"
          src={`/images/fruits.webp`}
          height={"250px"}
        />
      )}

      <Card.Subtitle className="m-2 text-muted">
        duoble click on Image to remove it
      </Card.Subtitle>
      <label
        htmlFor="productImg"
        className="bg-clr-green p-2 m-1 rounded hover shadow w-50 text-center"
      >
        Add Product Images
      </label>
      <input
        className="hidden"
        accept="image/*"
        multiple
        id="productImg"
        type="file"
        onChange={handleImgChange}
      />
    </Card>
  );
}
export default ProductForm;
