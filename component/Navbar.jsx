import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img width={"30px"} src="/icons/DrAzzaIcon.webp" alt="atcs" />
        <span className="p-2 fos-m text-nowrap">عيادة دكتورة عزة</span>
      </div>
    </nav>
  );
};

export default Navbar;
