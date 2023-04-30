import React, { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { baseUrl } from "../../_app";
import { storage } from "../../../firebase/firebase";
import SpinnerLoading from "../../../component/SpinnerLoading";
import ProductForm from "../../../component/ProductForm";
import ProductPreveiw from "../../../component/ProductPreveiw";

function EditProduct() {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImgs] = useState([]);
  const [productImgs, setProductImgs] = useState([]);
  const [product, setProduct] = useState();
  const [secNo, setSecNo] = useState(1);

  function getProduct() {
    fetch(baseUrl + "/api/products/" + router.query.productId)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setProduct(data);
        setSecNo(data.secNo);
        setImgs(data.productImgs);
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, " ", value);
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
      if (!img.productImgFile) {
        setProductImgs((prev) => [...prev, { url: img.url }]);
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
              setProductImgs((prevImgs) => [...prevImgs, { url: downloadURL }]);
            });
          }
        );
      }
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  const uploadProduct = async () => {
    console.log("upload");
    try {
      fetch(baseUrl + "/api/products/" + router.query.productId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          ...product,
          productImgs: productImgs,
          secNo: secNo,
        }),
      }).then(() => {
        setProductImgs([]);
        toast.success("Edit done");
        setTimeout(() => {
          setIsUpload(false);
          router.push("/Products/" + router.query.productId);
        }, 3000);
      });
    } catch (e) {
      setIsUpload(false);
      toast.error("Error Editing");
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
    if (!router.query.productId) return;
    getProduct();
  }, [router.query]);

  return (
    <>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <Container className="flex-r align-items-start justify-content-around mt-1 gap-1">
          <Col xs={12} lg={6}>
            <h2 className="m-1">Editing Product</h2>

            {product && (
              <ProductForm
                product={product}
                images={images}
                secNo={secNo}
                handleChange={handleChange}
                handleImgChange={handleImgChange}
                removeImage={removeImage}
                handleUploadProductImg={handleUploadProductImg}
              />
            )}
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
              Upload Changes
            </Button>
          </Col>
        </Container>
      )}
    </>
  );
}

export default EditProduct;
