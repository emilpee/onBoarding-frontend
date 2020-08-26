import React, { FunctionComponent } from "react";
import { Row, Container, Col } from "react-bootstrap";

const Footer: FunctionComponent = () => {
  return (
    <Container>
      <Row className="row">
        <Col>{new Date().getFullYear} onBoarding</Col>
        <Col>emilpee</Col>
      </Row>
    </Container>
  );
};

export default Footer;
