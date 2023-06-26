import React, { useState, useEffect, useRef } from "react";
import { VectorMap } from "react-jvectormap";
import "./jquery-jvectormap.scss";

const Vectormap = (props) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  console.log(selectedCountry, "HC");
  const [highlightedCountry, setHighlightedCountry] = useState("");
  console.log(highlightedCountry, "HC");
  const vectorMapRef = useRef(null);

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);
    setSelectedCountry("");
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    const region = getRegionByCountry(selectedCountry);
    setSelectedRegion(region);

    if (vectorMapRef.current) {
      vectorMapRef.current.clearSelectedRegions();
    }
  };

  const getRegionByCountry = (country) => {
    const { regions } = props.regionAndCountires;
    for (const region in regions) {
      if (regions[region].indexOf(country) !== -1) {
        return region;
      }
    }
    return "";
  };

  useEffect(() => {
    setHighlightedCountry(selectedCountry);
  }, [selectedCountry]);

  const { value, width, color, regionAndCountires } = props;
  const { regions, countries } = regionAndCountires;

  const filteredCountries = selectedRegion
    ? regions[selectedRegion]
    : countries;

  const handleRegionClick = (e, countryCode) => {
    const country = getCountryByCode(countryCode);
    setSelectedCountry(country);
  };

  const getCountryByCode = (countryCode) => {
    const { regions } = props.regionAndCountires;
    for (const region in regions) {
      const countryIndex = regions[region].findIndex(
        (country) => country.code === countryCode
      );
      if (countryIndex !== -1) {
        return regions[region][countryIndex].name;
      }
    }
    return "";
  };

  return (
    <>
      <div style={{ display: "flex", width: width, height: 500 }}>
        <div style={{ display: "block" }}>
          <div style={{ marginBottom: 10 }}>
            <label>Region:</label>
            <select
              value={selectedRegion}
              onChange={handleRegionChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "none",
                borderBottom: "2px solid grey",
                borderRadius: "0",
                appearance: "none",
                background: "transparent",
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>')",
                backgroundPosition: "right 10px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto 60%",
                paddingLeft: "10px",
                paddingRight: "30px",
                textAlign: "left",
              }}
            >
              <option value="">All</option>
              {Object.keys(regions).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Country:</label>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "none",
                borderBottom: "2px solid grey",
                borderRadius: "0",
                appearance: "none",
                background: "transparent",
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>')",
                backgroundPosition: "right 10px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto 60%",
                paddingLeft: "10px",
                paddingRight: "30px",
                textAlign: "left",
              }}
            >
              <option value="">All</option>
              {filteredCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
        <VectorMap
          ref={vectorMapRef}
          map={value}
          backgroundColor="transparent"
          containerStyle={{
            width: "100%",
            height: "80%",
          }}
          regionStyle={{
            initial: {
              fill: color,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              fill: "#39B54A",
              cursor: "pointer",
            },
            selected: {
              fill: "#39B54A",
            },
            selectedHover: {},
            ...(highlightedCountry && {
              [highlightedCountry]: {
                fill: "#39B54A",
              },
            }),
          }}
          containerClassName="map"
          zoomOnScroll={false}
          controls={{
            position: "r",
            zoomInText: "+",
            zoomOutText: "-",
          }}
          onRegionClick={handleRegionClick}
        />
      </div>
    </>
  );
};

export default Vectormap;
