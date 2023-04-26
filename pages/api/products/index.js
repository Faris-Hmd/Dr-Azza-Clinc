/** @format */
import { collection, getDocs, query, where } from "firebase/firestore";
import { baseUrl } from "../../_app";
import { db } from "../../../firebase/firebase";
export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const keyword = searchParams.get("keyword");
  console.log(baseUrl);
  let querySnapShot;

  if (keyword === "all") {
    querySnapShot = await getDocs(query(collection(db, "products")));
  } else {
    console.log(keyword);
    querySnapShot = await getDocs(
      query(
        collection(db, "products"),
        where("keywords", "array-contains", keyword)
      )
    );
  }

  const products = querySnapShot.docs.map((product) => {
    return {
      name: product.data().name,
      cost: product.data().cost,
      breif: product.data().breif,
      category: product.data().category,
      img: product.data().productImgs[0].url,
      id: product.id,
    };
  });
  console.log(products);
  res.status(200).json(products);
}
