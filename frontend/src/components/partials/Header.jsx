import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="container py-3">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Item>
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" to="/contact">
                    Contact Us
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" to="/blogs">
                    Blogs
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" to="/projects">
                    Projects
                  </Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
}

export default Header;
