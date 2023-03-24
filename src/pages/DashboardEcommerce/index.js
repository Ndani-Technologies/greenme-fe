import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

const DashboardEcommerce = () => {
  document.title = "Dashboard | Velzon - React Admin & Dashboard Template";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row></Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
