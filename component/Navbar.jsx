import { Button, Col, Container, Offcanvas } from "react-bootstrap";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { BsBasket, BsBook, BsHouseDoor } from "react-icons/bs";
import Link from "next/link";

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
      <Button variant="hover" onClick={handleShow} className="m-2 border hover">
        <FaBars />
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container className="p-0 border rounded">
            <Col xs={12} onClick={handleClose}>
              <Link href="/" className="w-100 Link hover flex-r p-3 border-b">
                <BsHouseDoor size={"25px"} className="ms-3" />
                Home
              </Link>
            </Col>
            <Col xs={12} onClick={handleClose}>
              <Link
                href="/Products"
                className="w-100 Link hover flex-r p-3 border-b"
              >
                <BsBasket size={"25px"} className="ms-3" />
                Shop
              </Link>
            </Col>{" "}
            <Col xs={12} onClick={handleClose}>
              <Link href="/Blog" className="w-100 Link hover flex-r p-3">
                <BsBook size={"25px"} className="ms-3" />
                Blog
              </Link>
            </Col>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
};

export default Navbar;
