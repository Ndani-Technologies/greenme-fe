import React, { useRef } from "react";
import { VectorMap as Map } from "react-jvectormap";
import "./jquery-jvectormap.scss";

const VectorMap = (props) => {
  const mapRef = useRef();

  return (
    <>
      <div style={{ width: props.width, height: 500 }}>
        <Map
          ref={mapRef}
          map={"world_mill"}
          backgroundColor="white"
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          markerStyle={{
            initial: {
              fill: "#5E32CA",
              stroke: "#383f47",
            },
          }}
          containerClassName="map"
          series={{
            regions: [
              {
                scale: ["#E2AEFF", "#5E32CA"],
                attribute: "fill",
                values: { PK: 100 },
                normalizeFunction: "polynomial",
                min: 0,
                max: 100,
              },
            ],
          }}
          markers={[
            {
              latLng: [30.3753, 69.3451],
              name: "Pakistan",
            },
          ]}
          regionStyle={{
            initial: {
              fill: "#D1D5DB",
              "fill-opacity": 1,
              stroke: "#265cff",
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              "fill-opacity": 0.8,
              fill: "",
              stroke: "#2b2b2b",
            },
            selected: {
              fill: "#FFFB00",
            },
          }}
          onMarkerTipShow={function (event, label, index) {
            label.html(
              '<div style="background-color: white; border: 1px solid white; outline: 10px solid white; border-radius: 5px; min-height: 70px; width: 150px; color: black"; padding-left: 10px>' +
                "<p>" +
                "<b>" +
                label.html() +
                "</b>" +
                "</p>" +
                "<p>" +
                "Count: " +
                "<b> Count</b>" +
                "</p>" +
                "</div>"
            );
          }}
          onRegionTipShow={function (event, label, code, ...props) {
            console.log("-----> ", label.html(), event, label, code, props);
            label.html(
              '<div style="background-color: white; border: 1px solid white; outline: 10px solid white; border-radius: 5px; min-height: 70px; width: 150px; color: black"; padding-left: 10px>' +
                "<p>" +
                "<b>" +
                label.html() +
                "</b>" +
                "</p>" +
                "<p>" +
                "Count: " +
                "<b> Count</b>" +
                "</p>" +
                "</div>"
            );
          }}
        />
      </div>
    </>
  );
};

export default VectorMap;
