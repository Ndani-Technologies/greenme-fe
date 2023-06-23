import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import VectorMap from "../VectorMaps/MapVector";
import axios from "axios";

const Map = () => {
  useEffect(() => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      "India"
    )}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const { results } = response.data;
        if (results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          console.log({ lat, lng });
        } else {
          // Handle case when no results are found
          console.log("No results found");
        }
      })
      .catch((error) => {
        // Handle error
        console.log("Error occurred:", error);
      });
  }, []);

  return (
    <Row className="pt-3">
      <Col lg={12}>
        <CardBody>
          <div
            id="world-map-line-markers"
            style={{ height: "420px", position: "relative" }}
          >
            <VectorMap value="world_mill" width="500" color="grey" />
          </div>
        </CardBody>
      </Col>
    </Row>
  );
};

export default Map;
