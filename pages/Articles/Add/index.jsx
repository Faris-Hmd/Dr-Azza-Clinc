import React, { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/firebase";
import { useRouter } from "next/router";
import ArticleForm from "../../../component/ArticleForm";
import ArticlePreveiw from "../../../component/ArticlesPreveiw";

function AddBlog() {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [images, setImgs] = useState([]);
  const [atricleImgs, setAtricleImgs] = useState([]);
  const [article, setArticle] = useState({});
  const [arr, setArr] = useState([]);
  const [secNo, setSecNo] = useState(1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, " ", value);
    localStorage.setItem(
      "artAddForm",
      JSON.stringify({ ...article, [name]: value })
    );

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
    e.preventDefault();
    const { getDownloadURL, ref, uploadBytesResumable } = await import(
      "firebase/storage"
    );
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
          toast.error("Error uploading");

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
      localStorage.removeItem("artAddForm");
      setTimeout(() => {
        setIsUpload(false);
        router.push("/Articles/" + docRef.id);
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
  useEffect(() => {
    const art = JSON.parse(localStorage.getItem("artAddForm"));
    art && setArticle({ ...art });
  }, []);

  return (
    <Container className="flex-r align-items-start justify-content-around">
      <Col className="mb-1 mt-1" xs={12} lg={6}>
        <h2 className="m-1">ADD ARTECLE</h2>
        <ArticleForm
          handleUploadArtImg={handleUploadArtImg}
          handleChange={handleChange}
          article={article}
          secNo={secNo}
          setSecNo={setSecNo}
          arr={arr}
          images={images}
          removeImage={removeImage}
          handleImgChange={handleImgChange}
        />
      </Col>

      <Col xs={12} lg={5}>
        <h2 className="m-1">PREVIEW</h2>
        <ArticlePreveiw article={article} images={images} arr={arr} />
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
  );
}

export default AddBlog;
