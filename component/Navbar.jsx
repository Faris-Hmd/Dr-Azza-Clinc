import { Button, Col, Container, Offcanvas } from "react-bootstrap";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { BsBasket, BsHouseDoor } from "react-icons/bs";
import Link from "next/link";

const links = [
  { href: "/", text: "Home" },
  { href: "/Products", text: "Shop" },
];

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img width={"30px"} src="/icons/DrAzzaIcon.webp" alt="drc" />
        <span className="p-2 fos-m text-nowrap">Dr. Azza Clinc</span>
      </div>
      <Button variant="secondary" onClick={handleShow} className="m-2 border">
        <FaBars />
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container className="p-0">
            {links.map((link) => {
              return (
                <Col xs={12} onClick={handleClose}>
                  <Link href={link.href} className="w-100 Link flex-r p-2">
                    <BsHouseDoor size={"25px"} className="ms-3" />
                    {link.text}
                  </Link>
                </Col>
              );
            })}
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
};

export default Navbar;
