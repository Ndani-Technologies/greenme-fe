import React, { useState } from "react";
import Map from "./Map";
import { Col } from "reactstrap";
import Tabs from "./Tabs";

const UserCollaboration = () => {
  const [countryFilter, setCountryFilter] = useState("");
  const [mapClickValue, setMapClickValue] = useState("");
  console.log(mapClickValue, "MAPCLICK");
  const [orgData, setOrgData] = useState([]);

  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <h1>Communication and Collaboration </h1>
        <Col className="bg-white">
          <Map
            setCountryFilter={setCountryFilter}
            setMapClickValue={setMapClickValue}
            orgData={orgData}
          />
          <Tabs
            countryFilter={countryFilter}
            mapClickValue={mapClickValue}
            setOrgData={setOrgData}
          />
        </Col>
      </div>
    </React.Fragment>
  );
};

export default UserCollaboration;
