import { Card } from "react-bootstrap";

function ArticlePreveiw({ article, images, arr }) {
  return (
    <Card>
      <Card.Body className="p-0">
        <Card.Title className="p-2 pt-3">{article.title}</Card.Title>

        {images.length > 0 && <Card.Img src={images[0].url} height={"300px"} />}
        <Card.Subtitle className="p-2">{article.breif}</Card.Subtitle>
        {arr.map((index) => {
          return (
            <div key={index}>
              <Card.Title className="p-2">
                {article?.[`section-${[index]}-title`]}
              </Card.Title>
              {images[index - 0] && (
                <Card.Img src={images[index - 0].url} height={"300px"} />
              )}
              <Card.Text className="p-2">
                {article?.[`section-${[index]}-body`]}
              </Card.Text>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
}
export default ArticlePreveiw;
