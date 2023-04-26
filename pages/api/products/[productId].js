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
  const { productId } = req.query;

  let querySnapShot;
  console.log(req.method);

  switch (req.method) {
    case "GET":
      {
        querySnapShot = await getDoc(doc(db, "products", productId));
        const product = { ...querySnapShot.data(), id: querySnapShot.id };
        // console.log(product);
        res.status(200).json(product);
      }
      break;
    case "POST":
      {
        const product = req.body;
        querySnapShot = await addDoc(collection(db, "products"), {
          ...product,
          keywords: [product.name, product.category, product.cost],
        });

        res.status(200).json({ msg: "Adding Done" });
      }
      break;
    case "DELETE":
      {
        await deleteDoc(doc(db, "products", productId));
        res.status(200).json({ msg: "Deleting Done" });
      }
      break;

    case "PUT": {
      const product = req.body;
      console.log(product);
      await setDoc(doc(db, "products", product.id), {
        ...product,
        keywords: [product.name, product.category, product.cost],
      });
      res.status(200).json({ msg: "edit Done" });
    }
    default:
      break;
  }
}
