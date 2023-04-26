import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { app, db } from "../firebase/firebase";
import { useRouter } from "next/router";

function AddBlog() {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [images, setImgs] = useState([]);
  const [atricleImgs, setAtricleImgs] = useState([]);
  const [article, setArticle] = useState({});
  const [arr, setArr] = useState([]);
  const [secNo, setSecNo] = useState(3);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, " ", value);
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
    const storage = getStorage(app);
    e.preventDefault();
    setIsUpload(true);
    setAtricleImgs([]);
    images.forEach((img) => {
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
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  const uploadArticle = async () => {
    console.log("upload");
    const { addDoc, collection } = await import("firebase/firestore");
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        ...article,
        atricleImgs: atricleImgs,
        secNo: secNo,
        // date: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setAtricleImgs([]);
      toast.success("Upload done");
      setTimeout(() => {
        setIsUpload(false);
        router.push("/Article/" + docRef.id);
      }, 3000);
    } catch (e) {
      setIsUpload(false);
      setAtricleImgs([]);
      toast.error("Error uploading");
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
    setArr([]);
    for (let index = 1; index <= secNo; index++) {
      setArr((prev) => [...prev, index]);
    }
  }, [secNo]);

  return (
    <Container className="flex-r align-items-start justify-content-around">
      <Col className="mb-1 mt-1" xs={12} lg={6}>
        <Card>
          <Card.Header>
            <h2 className="m-0">ADD ATRECLE</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleUploadArtImg} id="atrForm">
              <Form.Group className="mb-3">
                <Form.Label>ARTICLE NAME</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  required
                  onChange={handleChange}
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
                  <>
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
                  </>
                );
              })}
            </Form>
          </Card.Body>

          {images.length > 0 && (
            <Carousel>
              {images.map((img, index) => {
                console.log(index);
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
                    <Card.Img src={images[index - 0].url} height={"300px"} />
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
            Upload
          </Button>
        </Card>
      </Col>
    </Container>
  );
}

export default AddBlog;
