/** @format */
import styles from "../styles/ButtomNav.module.css";
import { BiBook, BiPlusCircle, BiStats } from "react-icons/bi";
import Link from "next/link";
import { BsGear, BsReceipt } from "react-icons/bs";
const ButtomNav = () => {
  return (
    <div className={styles.buttomNav}>
      {" "}
      <Link href="/Settings" className={styles.page}>
        <BsGear size={"25px"} />
        الاعدادات
      </Link>{" "}
      <Link href={"/Receipt"} className={styles.page}>
        <BsReceipt size={"25px"} />
        إيصال
      </Link>
      <Link href="/AddCustomer" className={styles.page}>
        <BiPlusCircle size={"25px"} />
        اضافة
      </Link>{" "}
      <Link href="/Customers" className={styles.page}>
        <BiStats size={"25px"} />
        احصائيات
      </Link>
      <Link href="/Customers" className={styles.page}>
        <BiBook size={"25px"} />
        السجلات
      </Link>
    </div>
  );
};

export default ButtomNav;
