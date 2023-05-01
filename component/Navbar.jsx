import { Accordion, Button, Col, Container, Offcanvas } from "react-bootstrap";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import {
  BsBasket,
  BsBook,
  BsCart3,
  BsHouseDoor,
  BsPencil,
  BsPlus,
  BsShop,
  BsStar,
} from "react-icons/bs";
import Link from "next/link";
import { BiBookmark } from "react-icons/bi";

const links = [
  {
    name: "HOME",
    href: "/",
    icon: <BsHouseDoor size={"20px"} className="me-3" />,
  },
  {
    name: "SHOP",
    href: "/Products",
    icon: <BsCart3 size={"20px"} className="me-3" />,
  },
  {
    name: "BLOG",
    href: "/Articles",
    icon: <BsBook size={"20px"} className="me-3" />,
  },
  {
    name: "Favorites",
    href: "/Products/Fav",
    icon: <BsStar size={"20px"} className="me-3" />,
  },
  {
    name: "Bookmarks",
    href: "/Articles",
    icon: <BiBookmark size={"20px"} className="me-3" />,
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
          <Container className="p-0 rounded border">
            {links.map((link, index) => {
              return (
                <Col xs={12} onClick={handleClose} key={index}>
                  <Link
                    href={link.href}
                    className={`w-100 Link hover flex-r borde p-3 ${
                      index + 1 !== links.length && "border-b"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </Col>
              );
            })}
          </Container>
          <Container className="p-0 border rounded">
            <Accordion flush>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <BsPlus size={"20px"} className="me-3" />
                  ADD
                </Accordion.Header>
                <Accordion.Body className="bg- p-0">
                  <Col xs={12} onClick={handleClose}>
                    <Link
                      href="/Articles/Add"
                      className="w-100 Link hover flex-r p-2 border-b"
                    >
                      Add Article
                    </Link>
                    <Link
                      href="Products/Add"
                      className="w-100 Link hover flex-r p-2 border-b"
                    >
                      Add Product
                    </Link>
                  </Col>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <BsPencil size={"20px"} className="me-3" />
                  EDIT
                </Accordion.Header>

                <Accordion.Body className="p-0">
                  <Col xs={12} onClick={handleClose}>
                    <Link
                      href="/Products/Edit"
                      className="w-100 Link hover flex-r p-2 border-b"
                    >
                      Edit Product
                    </Link>
                    <Link
                      href="/Articles/Edit"
                      className="w-100 Link hover flex-r p-2"
                    >
                      Edit Article
                    </Link>
                  </Col>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
};

export default Navbar;
