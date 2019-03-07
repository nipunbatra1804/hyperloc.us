import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import MapGL from "../MapGL/MapGL";
import FilterMenu from "../FilterMenu/FilterMenu";

export default class ExplorePage extends Component {
  render() {
    return (
      <div data-testid="explore-page">
        <Container>
          <Row>
            <Col xs="6">
              {" "}
              <MapGL />
            </Col>
            <Col xs="6">
              <FilterMenu />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
