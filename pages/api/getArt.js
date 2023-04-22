/** @format */
import { doc, getDoc } from "firebase/firestore";
import { baseUrl } from "../_app";
import { db } from "../../firebase/firebase";
export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const artId = searchParams.get("artId");

  const querySnapShot = await getDoc(doc(db, "articles", artId));

  const article = { ...querySnapShot.data(), id: querySnapShot.id };
  console.log(article);
  res.status(200).json(article);
}
