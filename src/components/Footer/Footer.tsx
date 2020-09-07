import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="container" fluid>
      <Row className="justify-content-around flex-row w-100" noGutters>
        <Col lg={{ span: 6 }}>
          <p>&copy; {new Date().getFullYear()} onBoarding</p>
        </Col>
        <Col className="justify-content-end d-flex" lg={{ span: 6 }}>
          <p>emilpee</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
