import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import VectorMap from "../VectorMaps/MapVector";
import axios from "axios";
import Countries from "../UserDetail/Countries";

const Map = ({ setCountryFilter }) => {
  useEffect(() => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      "India"
    )}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const { results } = response;
        if (results?.length > 0) {
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

  let countries = [];
  Countries.map((country) => {
    countries.push({ code: country.code, name: country.value }); // Push an object with code and name properties
  });

  const regionAndCountires = {
    regions: {
      Africa: [
        {
          name: "Algeria",
          code: "DZ",
        },
        {
          name: "Kenya",
          code: "KE",
        },
        {
          name: "Benin",
          code: "BJ",
        },
      ],

      Asia: [
        {
          name: "Afghanistan",
          code: "AF",
        },
        {
          name: "Iraq",
          code: "IQ",
        },
        {
          name: "Jordan",
          code: "JO",
        },
      ],
      Europe: [
        {
          name: "Ukraine",
          code: "UA",
        },
        {
          name: "Turkey",
          code: "TR",
        },
        {
          name: "Bosnia and Herzegovina",
          code: "BA",
        },
        {
          name: "Lebanon",
          code: "LB",
        },
        {
          name: "Albania",
          code: "AL",
        },
      ],
    },
    countries,
  };

  return (
    <Row className="pt-3">
      <Col lg={12}>
        <CardBody>
          <div
            id="world-map-line-markers"
            style={{ height: "420px", position: "relative" }}
          >
            <VectorMap
              value="world_mill"
              regionAndCountires={regionAndCountires}
              setCountryFilter={setCountryFilter}
              width="500"
              color="grey"
            />
          </div>
        </CardBody>
      </Col>
    </Row>
  );
};

export default Map;
