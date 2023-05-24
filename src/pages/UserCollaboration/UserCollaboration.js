import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Vectormap from "../VectorMaps/MapVector";

const UserCollaboration = () => {
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <h1>User Mapping and Collaboration </h1>
        <Col className="bg-white">
          <Row className="pt-3">
            <Col lg={12}>
              <CardBody>
                <div
                  id="world-map-line-markers"
                  style={{ height: "420px", position: "relative" }}
                >
                  <Vectormap value="world_mill" width="500" color="grey" />
                </div>
              </CardBody>
            </Col>
          </Row>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default UserCollaboration;
