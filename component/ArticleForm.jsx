import { Card, Carousel, Form } from "react-bootstrap";

function ArticleForm({
  handleUploadArtImg,
  handleChange,
  article,
  secNo,
  setSecNo,
  arr,
  images,
  removeImage,
  handleImgChange,
}) {
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleUploadArtImg} id="atrForm">
          <Form.Group className="mb-3">
            <Form.Label>ARTICLE NAME</Form.Label>
            <Form.Control
              type="text"
              name="title"
              required
              onChange={handleChange}
              value={article.title}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>BREIF</Form.Label>
            <Form.Control
              as="textarea"
              name="breif"
              required
              onChange={handleChange}
              value={article.breif}
            />
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
          <Form.Group className="mb-3">
            <Form.Label>ARTICLE CATEGORY</Form.Label>
            <Form.Select name="category" onChange={handleChange} required>
              <option value="LOREM">LOREM</option>
              <option value="IPSUM">IPSUM</option>
              <option value="DOLLOR">DOLLOR</option>
            </Form.Select>
          </Form.Group>

          {arr.map((index) => {
            return (
              <div key={index}>
                <Form.Group className="mb-3">
                  <Form.Label>SECTION {index} TITLE</Form.Label>
                  <Form.Control
                    type="text"
                    name={"section-" + [index] + "-title"}
                    required
                    onChange={handleChange}
                    value={article?.[`section-${[index]}-title`]}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SECTION {index} BODY</Form.Label>
                  <Form.Control
                    as="textarea"
                    name={"section-" + [index] + "-body"}
                    value={article?.[`section-${[index]}-body`]}
                    required
                    rows={5}
                    onChange={handleChange}
                  />
                </Form.Group>
                <hr />
              </div>
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
export default ArticleForm;
