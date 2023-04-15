import React from "react";
import { Card, Col } from "react-bootstrap";

function Post({ img, post, title }) {
  return (
    <Col className="post rounded mb-2 bg-sec fc-b" xs={12} lg={5}>
      <Card>
        {/* <Card.Header>{title}</Card.Header> */}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Img src={`/images/${img}`} height={"300px"} />
          <Card.Text>{post}</Card.Text>
          {/* <Link href="Post">
            <Button variant="primary">Read more</Button>
          </Link> */}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Post;
