import React from "react";
import style from './menu.module.css';
import { Nav, Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Menu() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className={style.navbar} >
      <Navbar.Brand href="/">
        <Logo
          alt=""
          width="30"
          height="30"
        />
        My React Project
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
