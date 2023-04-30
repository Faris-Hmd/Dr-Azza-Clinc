import React, { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/firebase";
import { useRouter } from "next/router";
import ProductForm from "../../../component/ProductForm";
import ProductPreveiw from "../../../component/ProductPreveiw";

function AddProduct() {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [images, setImgs] = useState([]);
  const [productImgs, setProductImgs] = useState([]);
  const [product, setProduct] = useState({});
  const [secNo, setSecNo] = useState(1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    localStorage.setItem(
      "productAddForm",
      JSON.stringify({ ...product, [name]: value })
    );

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

  const handleUploadProductImg = async (e) => {
    const { getDownloadURL, ref, uploadBytesResumable } = await import(
      "firebase/storage"
    );

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
        secNo: secNo,
        // date: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setProductImgs([]);
      localStorage.removeItem("productAddForm");

      toast.success("Upload done");
      setTimeout(() => {
        setIsUpload(false);
        router.push("/Products/" + docRef.id);
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
    const pro = JSON.parse(localStorage.getItem("productAddForm"));
    pro && setProduct({ ...pro });
  }, []);
  return (
    <Container className="flex-r align-items-start justify-content-around">
      <Col className="mb-1 mt-1" xs={12} lg={6}>
        {<h2 className="m-1">Add Product</h2>}

        <ProductForm
          product={product}
          images={images}
          secNo={secNo}
          setSecNo={setSecNo}
          handleChange={handleChange}
          handleImgChange={handleImgChange}
          removeImage={removeImage}
          handleUploadProductImg={handleUploadProductImg}
        />
      </Col>
      <Col xs={12} lg={5}>
        {<h2 className="m-1">PREVIEW</h2>}
        <ProductPreveiw product={product} images={images} secNo={secNo} />
        <Button
          className="bg-clr mt-2 shadow w-100 "
          disabled={isUpload || images.length === 0}
          type="submit"
          form="productForm"
        >
          Upload
        </Button>
      </Col>
    </Container>
  );
}

export default AddProduct;
