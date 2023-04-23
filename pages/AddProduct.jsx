import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { app, db } from "../firebase/firebase";
import { useRouter } from "next/router";

function AddProduct() {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [images, setImgs] = useState([]);
  const [productImgs, setProductImgs] = useState([]);
  const [product, setProduct] = useState({});
  const [arr, setArr] = useState([]);
  const [arrLen, setArrLen] = useState(1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, " ", value);
    setProduct((prevData) => {
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
    setProductImgs([]);
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
            setProductImgs((prevImgs) => [...prevImgs, { url: downloadURL }]);
          });
        }
      );
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  const uploadProduct = async () => {
    console.log("upload");
    const { addDoc, collection } = await import("firebase/firestore");
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...product,
        productImgs: productImgs,
        secNo: arrLen,
        // date: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setProductImgs([]);
      toast.success("Upload done");
      setTimeout(() => {
        setIsUpload(false);
        router.push("/Product/" + docRef.id);
      }, 3000);
    } catch (e) {
      setIsUpload(false);
      setProductImgs([]);
      toast.error("Error uploading");
      console.error("Error adding document: ", e);
    }
  };
  useEffect(() => {
    if (productImgs.length === 0) return;
    if (productImgs.length === images.length) {
      uploadProduct();
    }
  }, [productImgs]); // eslint-disable-line

  useEffect(() => {
    setArr([]);
    for (let index = 1; index <= arrLen; index++) {
      setArr((prev) => [...prev, index]);
    }
  }, [arrLen]);

  return (
    <Container className="flex-r align-items-start justify-content-around">
      <Col className="mb-1 mt-1" xs={12} lg={6}>
        <Card>
          <Card.Header>
            <h2 className="m-0">ADD PRODUCT</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleUploadArtImg} id="atrForm">
              <Form.Group className="mb-3">
                <Form.Label>PRODUCT NAME</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
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
              <Form.Group className="mb-3">
                <Form.Label>DESCREPTION</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descreption"
                  required
                  onChange={handleChange}
                  value={product.descreption}
                />
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
              <Form.Group className="mb-3">
                <Form.Label>PRODUCT CATEGORY</Form.Label>
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
                        value={product?.[`section-${[index]}-title`]}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>SECTION {index} BODY</Form.Label>
                      <Form.Control
                        as="textarea"
                        name={"section-" + [index] + "-body"}
                        value={product?.[`section-${[index]}-body`]}
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
          <Card.Header>
            <h2 className="m-0">PREVIEW</h2>
          </Card.Header>
          <Carousel>
            {images.map((img) => {
              return (
                <Carousel.Item>
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
          {/* <Card.Img variant="top" src={`/images/fruits.webp`} height={"250px"} /> */}
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-success">
              {product.cost}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              {product.category}
            </Card.Subtitle>
            <Card.Title>Descreption</Card.Title>
            <Card.Text>{product.descreption}</Card.Text>

            {arr.map((index) => {
              return (
                <>
                  <Card.Title>
                    {product?.[`section-${[index]}-title`]}
                  </Card.Title>

                  <Card.Text>{product?.[`section-${[index]}-body`]}</Card.Text>
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

export default AddProduct;
