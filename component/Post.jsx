import React from "react";
import { Col } from "react-bootstrap";

function Post({ img, post, title }) {
  return (
    <Col className="p-0 m-0 pt-2 post rounded mb-3 bg-sec" xs={12} lg={6}>
      <Col xs={12}>
        <h5 className="p-2 bg-gray">{title}</h5>
      </Col>
      <Col xs={12}>
        <img
          src={`/images/${img}`}
          width={"100%"}
          height={"220px"}
          className="shadow-sm post-img"
        />
      </Col>
      <Col xs={12}>
        <p className="p-1">{post}</p>
      </Col>
    </Col>
  );
}

export default Post;
