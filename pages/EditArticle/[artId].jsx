import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { baseUrl } from "../_app";
import { app } from "../../firebase/firebase";
import SpinnerLoading from "../../component/SpinnerLoading";

function EditArticles() {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImgs] = useState([]);
  const [atricleImgs, setAtricleImgs] = useState([]);
  const [article, setArticle] = useState({});
  const [arr, setArr] = useState([]);
  const [arrLen, setArrLen] = useState(1);

  function getArticle() {
    fetch(baseUrl + "/api/getArt?artId=" + router.query.artId)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setArticle(data);
        setArrLen(data.secNo);
        setImgs(data.atricleImgs);
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, " ", value);
    setArticle((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const handleImgChange = (e) => {
    const { files } = e.target;
    console.log(files.length);
    for (let index = 0; index < files.length; index++) {
      setImgs((prevImg) => [
        ...prevImg,
        {
          url: URL.createObjectURL(files[index]),
          productImgFile: files[index],
        },
      ]);
    }
  };
  const removeImage = (url) => {
    setImgs(images.filter((img) => img.url !== url));
  };
  ////////////////////////////////////////////////////

  const handleUploadArtImg = async (e) => {
    const { getDownloadURL, ref, uploadBytesResumable, getStorage } =
      await import("firebase/storage");
    // const { app } = import("../../firebase/firebase");
    const storage = await getStorage(app);

    e.preventDefault();
    setIsUpload(true);
    setAtricleImgs([]);
    images.forEach((img) => {
      if (!img.productImgFile) {
        setAtricleImgs((prev) => [...prev, { url: img.url }]);
      } else {
        const imgRef = ref(storage, img.productImgFile.name);
        const uploadTask = uploadBytesResumable(imgRef, img.productImgFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            setIsUpload(false);
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              setAtricleImgs((prevImgs) => [...prevImgs, { url: downloadURL }]);
            });
          }
        );
      }
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  const uploadArticle = async () => {
    console.log("upload");
    try {
      fetch(baseUrl + "/api/getArt", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          ...article,
          atricleImgs: atricleImgs,
          secNo: arrLen,
        }),
      }).then(() => {
        setAtricleImgs([]);
        toast.success("Edit done");
        setTimeout(() => {
          setIsUpload(false);
          router.push("/Article/" + router.query.artId);
        }, 3000);
      });
    } catch (e) {
      setIsUpload(false);
      toast.error("Error Editing");
      console.error("Error adding document: ", e);
    }
  };
  useEffect(() => {
    if (atricleImgs.length === 0) return;
    if (atricleImgs.length === images.length) {
      uploadArticle();
    }
  }, [atricleImgs]); // eslint-disable-line

  useEffect(() => {
    if (!router.query.artId) return;
    getArticle();
  }, [router.query]);

  useEffect(() => {
    setArr([]);
    for (let index = 1; index <= arrLen; index++) {
      setArr((prev) => [...prev, index]);
    }
  }, [arrLen]);

  return (
    <>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container className="flex-r align-items-start justify-content-around mt-1">
          <Col xs={12} lg={6}>
            <Card>
              <Card.Header>
                <h2 className="m-0">EDITING ATRECLE</h2>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleUploadArtImg} id="atrForm">
                  <Form.Group className="mb-3">
                    <Form.Label>ARTICLE TITLE</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      onChange={handleChange}
                      value={article.title}
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
                      value={article.breif}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>ARTICLE CATEGORY</Form.Label>
                    <Form.Select
                      required
                      name="category"
                      onChange={handleChange}
                      value={article.category}
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
                      value={arrLen}
                      required
                      min={1}
                      onChange={(e) => setArrLen(e.target.value)}
                    />
                  </Form.Group>
                  {arr.map((index) => {
                    return (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>SECTION {index} TITLE</Form.Label>
                          <Form.Control
                            type="text"
                            name={"section-" + [index] + "-title"}
                            value={article?.[`section-${[index]}-title`]}
                            required
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>SECTION {index} BODY</Form.Label>
                          <Form.Control
                            as="textarea"
                            name={"section-" + [index] + "-body"}
                            required
                            rows={5}
                            onChange={handleChange}
                            value={article?.[`section-${[index]}-body`]}
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
          </Col>
          <Col xs={12} lg={5}>
            <Card>
              <Card.Header> {<h2 className="m-0">PREVIEW</h2>}</Card.Header>
              <Card.Body className="p-0">
                <Card.Title className="p-2 pt-3">{article.title}</Card.Title>

                {images.length > 0 && (
                  <Card.Img src={images[0].url} height={"300px"} />
                )}
                <Card.Subtitle className="p-2">{article.breif}</Card.Subtitle>
                {arr.map((index) => {
                  return (
                    <>
                      <Card.Title className="p-2">
                        {article?.[`section-${[index]}-title`]}
                      </Card.Title>
                      {images[index - 0] && (
                        <Card.Img
                          src={images[index - 0].url}
                          height={"300px"}
                        />
                      )}
                      <Card.Text className="p-2">
                        {article?.[`section-${[index]}-body`]}
                      </Card.Text>
                    </>
                  );
                })}
              </Card.Body>
              <Button
                className="bg-clr m-2 shadow"
                disabled={isUpload || images.length === 0}
                type="submit"
                form="atrForm"
              >
                Upload Changes
              </Button>
            </Card>
          </Col>
        </Container>
      )}
    </>
  );
}

export default EditArticles;
