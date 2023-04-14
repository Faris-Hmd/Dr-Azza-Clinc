/** @format */
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";
export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const fromDate = searchParams.get("startDate");
  const toDate = searchParams.get("endDate");
  const repeatEntry = searchParams.get("repeatEntry");
  const state = searchParams.get("state");
  const searchBy = searchParams.get("searchBy");
  const keyword = searchParams.get("keyword");

  const fromDateBySec = new Date(fromDate);
  const toDateBySec = new Date(toDate);

  let querySnapShot;

  if (keyword === "null") {
    let querys = [];
    if (
      state !== "null" &&
      state !== "repeatEntry" &&
      state !== "لم يغادر" &&
      state !== "ممددين"
    )
      querys.push(where("state", "==", state));

    if (repeatEntry === "false") querys.push(where("repeatEntry", "==", false));

    if (state === "ممددين") querys.push(where("threeMonthEx", "==", true));
    if (state === "repeatEntry") querys.push(where("repeatEntry", "==", true));
    if (state === "لم يغادر")
      querys.push(
        where("state", "in", [
          "مغادر قريبا",
          "مخالف",
          "لم يغادر",
          "مخالفة تمديد",
        ]),
      );
    if (state !== "دخول جديد")
      querys.push(
        where(searchBy, ">=", fromDateBySec.getTime()),
        where(searchBy, "<=", toDateBySec.getTime() + 1000 * 60 * 60 * 24),
      );

    console.log(querys);

    querySnapShot = await getDocs(
      query(
        collection(db, "customers"),

        ...querys,
        orderBy(searchBy),
      ),
    );
  } else {
    console.log(keyword);
    querySnapShot = await getDocs(
      query(
        collection(db, "customers"),
        where("keywords", "array-contains", keyword),
      ),
    );
  }

  const customers = querySnapShot.docs.map((customer) => {
    return {
      ...customer.data(),
      customerId: customer.id,
      // ownerSName: "فارس",
      // ownerTName: "حمد",
      // passport: "P0123456",
      // chaseNum: "ABCD12345678",
      // carnetNo: "Det0123456",
      // ownerSdPhone1: "0966626693",
      
      // ownerSdPhone2: "0966626693",
    };
  });
  // console.log(customers);
  res.status(200).json(customers);
}
