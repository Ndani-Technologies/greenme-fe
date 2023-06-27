import React, { useState, useEffect, useRef } from "react";
import { VectorMap } from "react-jvectormap";
import "./jquery-jvectormap.scss";

const Vectormap = (props) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [highlightedCountry, setHighlightedCountry] = useState("");
  const vectorMapRef = useRef(null);

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);
    setSelectedCountry("");
    setHighlightedCountry(""); // Reset highlighted country
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    const region = getRegionByCountry(selectedCountry);
    setSelectedRegion(region);
    setHighlightedCountry(selectedCountry); // Highlight the selected country

    if (vectorMapRef.current && selectedCountry) {
      const mapObject = vectorMapRef.current.$mapObject;
      const regionSeries = mapObject.series.regions[0];

      const selectedCountryData = {};
      selectedCountryData[selectedCountry] = "#39B54A";

      regionSeries.clear(); // Clear any existing selections
      regionSeries.setValues(selectedCountryData);
      mapObject.applyTransform();
    }
  };

  const getRegionByCountry = (countryCode) => {
    const { regions, countries } = props.regionAndCountires;
    for (const region in regions) {
      if (regions[region].includes(countryCode)) {
        const country = countries.find((c) => c.code === countryCode);
        if (country) {
          return region;
        }
      }
    }
    return "";
  };

  useEffect(() => {
    if (vectorMapRef.current && selectedCountry) {
      const mapObject = vectorMapRef.current.$mapObject;
      const regionSeries = mapObject.series.regions[0];

      const selectedCountryData = {};
      selectedCountryData[selectedCountry] = "#39B54A";

      regionSeries.clear(); // Clear any existing selections
      regionSeries.setValues(selectedCountryData);
      mapObject.applyTransform();
    }
  }, [selectedCountry]);

  const { value, width, color, regionAndCountires } = props;
  const { regions, countries } = regionAndCountires;

  const filteredCountries = selectedRegion
    ? regions[selectedRegion]
    : countries.map((country) => country.name);

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
              {filteredCountries.map((country) => {
                const countryData = countries.find((c) => c.name === country);
                return (
                  <option key={countryData.code} value={countryData.code}>
                    {country}
                  </option>
                );
              })}
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
          }}
          series={{
            regions: [
              {
                values: filteredCountries.reduce(
                  (obj, country) => ({
                    ...obj,
                    [getRegionByCountry(country)]: "#39B54A",
                  }),
                  {}
                ),
              },
            ],
          }}
          containerClassName="map"
          zoomOnScroll={false}
          controls={{
            position: "r",
            zoomInText: "+",
            zoomOutText: "-",
          }}
        />
      </div>
    </>
  );
};

export default Vectormap;

// import React, { useState, useEffect, useRef } from "react";
// import { VectorMap } from "react-jvectormap";
// import "./jquery-jvectormap.scss";

// const Vectormap = (props) => {
//   const [selectedRegion, setSelectedRegion] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [highlightedCountry, setHighlightedCountry] = useState("");
//   const vectorMapRef = useRef(null);

//   const handleRegionChange = (e) => {
//     const selectedRegion = e.target.value;
//     setSelectedRegion(selectedRegion);
//     setSelectedCountry("");
//     setHighlightedCountry(""); // Reset highlighted country
//   };

//   const handleCountryChange = (e) => {
//     const selectedCountry = e.target.value;
//     setSelectedCountry(selectedCountry);
//     const region = getRegionByCountry(selectedCountry);
//     setSelectedRegion(region);
//     setHighlightedCountry(selectedCountry); // Highlight the selected country

//     if (vectorMapRef.current && selectedCountry) {
//       const mapObject = vectorMapRef.current.$mapObject;
//       const regionSeries = mapObject.series.regions[0];

//       console.log(selectedCountry, "mapObject 2");
//       console.log(mapObject, "mapObject 2");
//       console.log(regionSeries, "regionSeries 2");

//       const selectedCountryData = {};
//       selectedCountryData[selectedCountry] = "#39B54A";

//       regionSeries.clear(); // Clear any existing selections
//       regionSeries.setValues(selectedCountryData);
//       mapObject.applyTransform();
//     }
//   };

//   const getRegionByCountry = (country) => {
//     const { regions } = props.regionAndCountires;
//     for (const region in regions) {
//       if (regions[region].indexOf(country) !== -1) {
//         return region;
//       }
//     }
//     return "";
//   };

//   useEffect(() => {
//     if (vectorMapRef.current && selectedCountry) {
//       const mapObject = vectorMapRef.current.$mapObject;
//       const regionSeries = mapObject.series.regions[0];
//       console.log(selectedCountry, "selectedCountry 1");
//       console.log(mapObject, "mapObject 1");
//       console.log(regionSeries, "regionSeries 1");

//       const selectedCountryData = {};
//       selectedCountryData[selectedCountry] = "#39B54A";

//       regionSeries.clear(); // Clear any existing selections
//       regionSeries.setValues(selectedCountryData);
//       mapObject.applyTransform();
//     }
//   }, [selectedCountry]);

//   const { value, width, color, regionAndCountires } = props;
//   const { regions, countries } = regionAndCountires;

//   const filteredCountries = selectedRegion
//     ? regions[selectedRegion]
//     : countries;

//   return (
//     <>
//       <div style={{ display: "flex", width: width, height: 500 }}>
//         <div style={{ display: "block" }}>
//           <div style={{ marginBottom: 10 }}>
//             <label>Region:</label>
//             <select
//               value={selectedRegion}
//               onChange={handleRegionChange}
//               style={{
//                 width: "100%",
//                 padding: "8px",
//                 border: "none",
//                 borderBottom: "2px solid grey",
//                 borderRadius: "0",
//                 appearance: "none",
//                 background: "transparent",
//                 backgroundImage:
//                   "url('data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>')",
//                 backgroundPosition: "right 10px center",
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "auto 60%",
//                 paddingLeft: "10px",
//                 paddingRight: "30px",
//                 textAlign: "left",
//               }}
//             >
//               <option value="">All</option>
//               {Object.keys(regions).map((region) => (
//                 <option key={region} value={region}>
//                   {region}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>Country:</label>
//             <select
//               value={selectedCountry}
//               onChange={handleCountryChange}
//               style={{
//                 width: "100%",
//                 padding: "8px",
//                 border: "none",
//                 borderBottom: "2px solid grey",
//                 borderRadius: "0",
//                 appearance: "none",
//                 background: "transparent",
//                 backgroundImage:
//                   "url('data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>')",
//                 backgroundPosition: "right 10px center",
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "auto 60%",
//                 paddingLeft: "10px",
//                 paddingRight: "30px",
//                 textAlign: "left",
//               }}
//             >
//               <option value="">All</option>
//               {filteredCountries.map((country) => (
//                 <option key={country.name} value={country.name}>
//                   {country.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <VectorMap
//           ref={vectorMapRef}
//           map={value}
//           backgroundColor="transparent"
//           containerStyle={{
//             width: "100%",
//             height: "80%",
//           }}
//           regionStyle={{
//             initial: {
//               fill: color,
//               stroke: "none",
//               "stroke-width": 0,
//               "stroke-opacity": 0,
//             },
//             hover: {
//               fill: "#39B54A",
//               cursor: "pointer",
//             },
//           }}
//           series={{
//             regions: [
//               {
//                 values: countries,
//               },
//             ],
//           }}
//           containerClassName="map"
//           zoomOnScroll={false}
//           controls={{
//             position: "r",
//             zoomInText: "+",
//             zoomOutText: "-",
//           }}
//         />
//       </div>
//     </>
//   );
// };

// export default Vectormap;
