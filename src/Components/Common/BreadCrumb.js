import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const BreadCrumb = ({ title, pageTitle }) => {
  return (
    <React.Fragment>
      <Row>
        <div className="page-title">
          <h4 className="mb-4 sm-0">{title}</h4>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
