import { Button, Col, Container, Offcanvas } from "react-bootstrap";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import {
  BsBasket,
  BsBook,
  BsHouseDoor,
  BsPencil,
  BsPlus,
  BsShop,
} from "react-icons/bs";
import Link from "next/link";

const link = [
  {
    name: "HOME",
    href: "/",
    icon: <BsHouseDoor size={"20px"} className="me-3" />,
  },
  {
    name: "SHOP",
    href: "/Products",
    icon: <BsShop size={"20px"} className="me-3" />,
  },
  {
    name: "BLOG",
    href: "/Articles",
    icon: <BsBook size={"20px"} className="me-3" />,
  },
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
      <Button variant="hover" onClick={handleShow} className="m-2 border hover">
        <FaBars />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="flex gap-3 justify-content-start">
          <Container className="p-0 rounded overflow-hidden">
            {link.map((link, index) => {
              return (
                <Col xs={12} onClick={handleClose} key={index}>
                  <Link
                    href={link.href}
                    className="w-100 Link hover flex-r p-3 rounded border mt-1"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </Col>
              );
            })}
          </Container>
          <Container className="p-0 border rounded">
            <Col xs={12} onClick={handleClose}>
              <Link
                href="Products/Add"
                className="w-100 Link hover flex-r p-3 border-b"
              >
                <BsPlus size={"20px"} className="me-3" />
                Add Product
              </Link>
              <Link
                href="/Products/Edit"
                className="w-100 Link hover flex-r p-3 border-b"
              >
                <BsPencil size={"20px"} className="me-3" />
                Edit Product
              </Link>
            </Col>
            <Col xs={12} onClick={handleClose}>
              <Link
                href="/Articles/Add"
                className="w-100 Link hover flex-r p-3 border-b"
              >
                <BsPlus size={"20px"} className="me-3" />
                Add Article
              </Link>
              <Link
                href="/Articles/Edit"
                className="w-100 Link hover flex-r p-3"
              >
                <BsPencil size={"20px"} className="me-3" />
                Edit Article
              </Link>
            </Col>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
};

export default Navbar;
