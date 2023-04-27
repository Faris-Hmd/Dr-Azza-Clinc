/** @format */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
export default async function handler(req, res) {
  const { artId } = req.query;

  let querySnapShot;
  console.log(req.method);

  switch (req.method) {
    case "GET":
      {
        querySnapShot = await getDoc(doc(db, "articles", artId));
        const article = { ...querySnapShot.data(), id: querySnapShot.id };
        // console.log(article);
        res.status(200).json(article);
      }
      break;
    case "POST":
      {
        const art = req.body;
        querySnapShot = await addDoc(collection(db, "articles"), {
          ...art,
          keywords: [art.title, art.category],
        });
        res.status(200).json({ msg: "Adding Done" });
      }
      break;
    case "DELETE":
      {
        await deleteDoc(doc(db, "articles", artId));
        res.status(200).json({ msg: "Deleting Done" });
      }
      break;

    case "PUT": {
      const art = req.body;
      console.log({ ...art }, [art.title, art.category]);
      await setDoc(doc(db, "articles", art.id), {
        ...art,
        keywords: [art.title, art.category],
      });
      res.status(200).json({ msg: "edit Done" });
    }
    default:
      break;
  }
}
