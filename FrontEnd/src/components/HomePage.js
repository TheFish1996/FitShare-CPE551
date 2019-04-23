import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Navbar from "./NavBar";
import Carousel from "./Carousel";
import Card from "./Card";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <Container fluid>
          <Row>
            <Col sm="12" md="12">
              <Carousel />
            </Col>
            <br />
          </Row>
          <Row>
            <Col xs="6" sm="4">
              <Card title = "title 1" caption = "caption 1" />
            </Col>
            <Col xs="6" sm="4">
              <Card title = "title 2" caption = "caption 2" />
            </Col>
            <Col xs="6" sm="4">
              <Card title = "title 3" caption = "caption 3" />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default HomePage;
