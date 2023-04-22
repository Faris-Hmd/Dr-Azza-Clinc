/** @format */
import { collection, getDocs, query, where } from "firebase/firestore";
import { baseUrl } from "../_app";
import { db } from "../../firebase/firebase";
export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const keyword = searchParams.get("keyword");
  console.log(baseUrl);
  let querySnapShot;

  if (keyword === "all") {
    querySnapShot = await getDocs(query(collection(db, "articles")));
  } else {
    console.log(keyword);
    querySnapShot = await getDocs(
      query(
        collection(db, "articles"),
        where("keywords", "array-contains", keyword)
      )
    );
  }

  const articles = querySnapShot.docs.map((artecle) => {
    return {
      ...artecle.data(),
      img: artecle.data().atricleImgs[0].url,
      id: artecle.id,
    };
  });
  console.log(articles);
  res.status(200).json(articles);
}
