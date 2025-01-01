import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (
  <footer className="footer py-4 bg-dark text-white">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are a trusted construction company, specializing in residential, commercial, and industrial projects. Our mission is to build high-quality structures that stand the test of time.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#home" className="text-white">Home</Nav.Link>
              <Nav.Link href="#services" className="text-white">Services</Nav.Link>
              <Nav.Link href="#portfolio" className="text-white">Portfolio</Nav.Link>
              <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              <strong>Email:</strong> contact@construction.com
            </p>
            <p>
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p>
              <strong>Address:</strong> 123 Construction St, City, Country
            </p>
          </Col>
        </Row>
        <div className="text-center mt-3">
          <p>&copy; 2024 Your Construction Company. All rights reserved.</p>
        </div>
      </Container>
    </footer>  )
}

export default Footer