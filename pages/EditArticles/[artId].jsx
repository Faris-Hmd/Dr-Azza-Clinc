import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { app, db } from "../../firebase/firebase";
import { useRouter } from "next/router";
import SpinnerLoading from "../../component/Spinner";
import { doc, getDoc } from "firebase/firestore";

function EditArticles() {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImgs] = useState([]);
  const [atricleImgs, setAtricleImgs] = useState([]);
  const [article, setArticle] = useState({
    articleName: "",
    articleImgs: "",
    articleCategory: "",
    articleBody: "",
  });

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

  ////////////////////////////////////////////////////

  const handleUploadArtImg = async (e) => {
    const { getDownloadURL, ref, uploadBytesResumable, getStorage } =
      await import("firebase/storage");
    const storage = getStorage(app);
    e.preventDefault();
    // setIsUpload(true);
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
    const { setDoc, doc } = await import("firebase/firestore");
    try {
      await setDoc(doc(db, "articles", router.query.artId), {
        ...article,
        atricleImgs: atricleImgs,
        // date: serverTimestamp(),
      });
      setIsUpload(false);
      setAtricleImgs([]);
      toast.success("Upload done");
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
      // nav("/");
    }
  }, [atricleImgs]); // eslint-disable-line
  useEffect(() => {
    if (!router.query.artId) return;
    async function getArticle() {
      const snapShot = await getDoc(doc(db, "articles", router.query.artId));
      const data = snapShot.data();
      setArticle({ ...data, id: snapShot.id });
      setImgs(data.atricleImgs);
    }
    getArticle();
  }, [router.query]);

  useEffect(() => {
    if (article.id) setIsLoading(false);
  }, [article]);

  return (
    <>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container className="p-0 ful">
          <Col className="">
            <h1 className="p-2 m-0">EDITING ATRECLE</h1>
          </Col>
          <Col xs={12} lg={7}>
            <Card>
              <Card.Body>
                {" "}
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>ARTICLE NAME</Form.Label>
                    <Form.Control
                      type="text"
                      name="articleName"
                      onChange={handleChange}
                      value={article.articleName}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    {" "}
                    <Form.Label>ARTICLE BODY</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="articleBody"
                      value={article.articleBody}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>ARTICLE CATEGORY</Form.Label>
                    <Form.Select
                      name="articleCategory"
                      onChange={handleChange}
                      value={article.articleCategory}
                    >
                      <option value="LOREM">LOREM</option>
                      <option value="IPSUM">IPSUM</option>
                      <option value="DOLLOR">DOLLOR</option>
                    </Form.Select>
                  </Form.Group>
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
              <Button
                className="bg-clr m-2 shadow"
                disabled={isUpload}
                onClick={handleUploadArtImg}
              >
                Upload
              </Button>
            </Card>
          </Col>
        </Container>
      )}
    </>
  );
}

export default EditArticles;
