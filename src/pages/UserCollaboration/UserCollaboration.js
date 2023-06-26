import React from "react";
import Map from "./Map";
import { Col } from "reactstrap";
import Tabs from "./Tabs";

const UserCollaboration = () => {
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <h1>Communication and Collaboration </h1>
        <Col className="bg-white">
          <Map />
          <Tabs />
        </Col>
      </div>
    </React.Fragment>
  );
};

export default UserCollaboration;
