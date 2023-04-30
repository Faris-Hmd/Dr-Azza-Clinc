import React, { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { baseUrl } from "../../_app";
import { storage } from "../../../firebase/firebase";
import SpinnerLoading from "../../../component/SpinnerLoading";
import ArticleForm from "../../../component/ArticleForm";
import ArticlePreveiw from "../../../component/ArticlesPreveiw";

function EditArticles() {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImgs] = useState([]);
  const [atricleImgs, setAtricleImgs] = useState([]);
  const [article, setArticle] = useState({});
  const [arr, setArr] = useState([]);
  const [secNo, setSecNo] = useState(1);

  function getArticle() {
    fetch(baseUrl + "/api/articles/" + router.query.artId)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setArticle(data);
        setSecNo(data.secNo);
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
    const { getDownloadURL, ref, uploadBytesResumable } = await import(
      "firebase/storage"
    );

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
            toast.error("Error Editing");

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
      console.log(router.query.artId);
      fetch(baseUrl + "/api/articles/" + router.query.artId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          ...article,
          atricleImgs: atricleImgs,
          secNo: secNo,
        }),
      }).then(() => {
        setAtricleImgs([]);
        toast.success("Edit done");
        setTimeout(() => {
          setIsUpload(false);
          router.push("/Articles/" + router.query.artId);
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
    for (let index = 1; index <= secNo; index++) {
      setArr((prev) => [...prev, index]);
    }
  }, [secNo]);

  return (
    <>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container className="flex-r align-items-start justify-content-around mt-1">
          <Col xs={12} lg={6}>
            <h2 className="m-1">EDIT ARTECLE</h2>
            <ArticleForm
              arr={arr}
              article={article}
              handleChange={handleChange}
              handleImgChange={handleImgChange}
              handleUploadArtImg={handleUploadArtImg}
              images={images}
              removeImage={removeImage}
              secNo={secNo}
              setSecNo={setSecNo}
            />
          </Col>
          <Col xs={12} lg={5}>
            <ArticlePreveiw arr={arr} article={article} images={images} />
            <Button
              className="bg-clr mt-2 shadow w-100"
              // disabled={isUpload || images.length === 0}
              type="submit"
              form="atrForm"
            >
              Upload
            </Button>
          </Col>
        </Container>
      )}
    </>
  );
}

export default EditArticles;
