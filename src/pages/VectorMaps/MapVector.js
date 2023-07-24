import React, { useState, useEffect, useRef } from "react";
import { VectorMap } from "react-jvectormap";
import "./jquery-jvectormap.scss";
import axios from "axios";
import Countries from "../UserDetail/Countries";
import { getAllUsers } from "../../slices/thunks";

const Vectormap = (props) => {
  const [usersCountries, setUsersCountries] = useState([]);
  const [selectedMapCountry, setSelectedMapCountry] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const loggedInUser = JSON.parse(sessionStorage.getItem("authUser"));
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_USER_URL}user`);
      if (response) {
        const usersData = response.filter(
          (user) => user._id !== loggedInUser._id
        );
        setUsersCountries([
          ...new Set(
            usersData?.reduce((acc, user) => {
              if (user?.country) {
                acc.push(user.country);
              }
              if (user?.otherCountries) {
                const validOtherCountries = user.otherCountries.filter(Boolean);
                acc.push(...validOtherCountries);
              }
              return acc;
            }, [])
          ),
        ]);
      }
    } catch (error) {
      console.log(error?.message ?? "Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchAllUsers();
    getAllUsers()
      .then((res) => {
        setAllUsers(res);
      })
      .catch((err) => console.log(err, "UNABLE TO GET USERS"));
  }, []);

  const getUserCountByCountry = (countryCode) => {
    const selectedCountryName = countriesArray.find(
      (c) => c.code === countryCode
    )?.name;
    if (!selectedCountryName) return 0;

    let count = 0;
    allUsers?.forEach((user) => {
      if (user.country === selectedCountryName) {
        count++;
      }
    });

    return count;
  };

  const getOrganisationsCountByCountry = (countryCode) => {
    const selectedCountryName = countriesArray.find(
      (c) => c.code === countryCode
    )?.name;
    if (!selectedCountryName) return 0;

    let count = 0;
    props.orgData?.forEach((organization) => {
      if (organization.countries.includes(selectedCountryName)) {
        count++;
      }
    });

    return count;
  };

  const countriesArray = usersCountries
    .map((userCountry) => {
      const country = Countries.find((c) => c.value === userCountry);
      if (country) {
        return {
          name: userCountry,
          code: country.code,
        };
      }
      return null;
    })
    .filter(Boolean);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const vectorMapRef = useRef(null);
  const { regions, countries } = props.regionAndCountires;

  //FOR REGIONS
  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);
    localStorage.setItem("selectedRegion", selectedRegion);
    setSelectedCountry("");

    if (vectorMapRef.current) {
      const mapObject = vectorMapRef.current.$mapObject;
      const regionSeries = mapObject.series.regions[0];

      const selectedCountryData = {};

      if (!selectedRegion || selectedRegion === "All") {
        filteredCountries.forEach((country) => {
          selectedCountryData[getRegionByCountry(country)] = "#39B54A";
        });
      } else {
        // Highlight countries in the selected region
        const countriesInRegion = getCountriesByRegion(selectedRegion);
        countriesInRegion.forEach((country) => {
          selectedCountryData[getRegionByCountry(country)] = "#39B54A";
        });
      }

      regionSeries.clear(); // Clear any existing selections
      regionSeries.setValues(selectedCountryData);
      mapObject.applyTransform();
    }
  };

  const getCountriesByRegion = (region) => {
    const { regions, countries } = props.regionAndCountires;
    const regionCountries = regions[region];
    return countriesArray.filter((country) =>
      regionCountries?.some((rc) => rc.name === country.name)
    );
  };

  useEffect(() => {
    if (vectorMapRef.current && selectedRegion) {
      const mapObject = vectorMapRef.current.$mapObject;
      const regionSeries = mapObject.series.regions[0];

      const selectedCountryData = {};

      if (!selectedRegion || selectedRegion === "All") {
        // Highlight all countries
        countriesArray.forEach((country) => {
          selectedCountryData[country.code] = "#39B54A";
        });
      } else {
        // Highlight countries in the selected region
        const countriesInRegion = getCountriesByRegion(selectedRegion);
        countriesInRegion.forEach((country) => {
          selectedCountryData[country.code] = "#39B54A";
        });
      }

      regionSeries.clear(); // Clear any existing selections
      regionSeries.setValues(selectedCountryData);
      mapObject.applyTransform();
    }
  }, [selectedRegion, countriesArray]);

  //FOR COUNTRIES

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    const selectedCountryName = countriesArray.find(
      (c) => c.code === selectedCountry
    )?.name;
    props.setCountryFilter(selectedCountryName);
    const region = getRegionByCountry(selectedCountry);
    setSelectedRegion(region);

    if (vectorMapRef.current) {
      const mapObject = vectorMapRef.current.$mapObject;
      const regionSeries = mapObject.series.regions[0];

      const selectedCountryData = {};

      if (!selectedCountry || selectedCountry === "All") {
        // Highlight all countries
        filteredCountries.forEach((country) => {
          selectedCountryData[getRegionByCountry(country)] = "#39B54A";
        });
      } else {
        // Highlight only the selected country
        selectedCountryData[getRegionByCountry(selectedCountry)] = "#39B54A";
      }

      regionSeries.clear(); // Clear any existing selections
      regionSeries.setValues(selectedCountryData);
      mapObject.applyTransform();
    }
  };

  const getRegionByCountry = (selCountry) => {
    const { regions, countries } = props.regionAndCountires;

    for (const region in regions) {
      const countriesInRegion = regions[region];
      const foundCountry = countriesInRegion.find(
        (country) => country.name === selCountry.name
      );

      if (foundCountry) {
        const country = countries.find((c) => c.code === selCountry.code);
        if (country) {
          return region;
        } else {
          return regions.hasOwnProperty("All") ? "All" : "";
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

      if (selectedCountry === "All") {
        countriesArray.forEach((country) => {
          selectedCountryData[country.code] = "#39B54A";
        });
      } else {
        selectedCountryData[selectedCountry] = "#39B54A";
      }

      regionSeries.clear(); // Clear any existing selections
      regionSeries.setValues(selectedCountryData);
      mapObject.applyTransform();
    }
  }, [selectedCountry, countriesArray]);

  const { value, width, color } = props;

  const filteredCountries =
    selectedRegion === "All" || !selectedRegion
      ? countriesArray.map((country) => country)
      : regions[selectedRegion]?.map((country) => country);

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
                  "url('data:image/svg+xml;utf8,<svg fill=%22gray%22 height=%2224%22 viewBox=%220 0 24 24%22 width=%2224%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')",
                backgroundPosition: "right 10px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto 60%",
                paddingLeft: "10px",
                paddingRight: "30px",
                textAlign: "left",
              }}
            >
              <option value="All">All</option>

              {Object.keys(props?.regionAndCountires?.regions).map((region) => (
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
              <option value="All">All</option>
              {filteredCountries.map((country) => {
                const countryData = countries.find(
                  (c) => c.name === country.name
                );
                return (
                  <option key={countryData?.code} value={countryData?.code}>
                    {country.name}
                  </option>
                );
              })}{" "}
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
            unselected: {
              fill: color, // Use the initial fill color
              // Additional styles for unselected state
              // Add other styles as per your requirements
            },
          }}
          // regionsSelectableOne={true}
          onRegionClick={(e, countryCode) => {
            e.preventDefault();
            if (selectedMapCountry === countryCode) {
              setSelectedMapCountry(""); // Deselect the country
              props.setMapClickValue(""); // Pass an empty string to clear the map click value

              if (vectorMapRef.current) {
                const mapObject = vectorMapRef.current.getMapObject();
                const regionSeries = mapObject.series.regions[0];
                regionSeries.clear(); // Clear the selected country from the map
              }
              if (vectorMapRef.current) {
                const mapObject = vectorMapRef.current.getMapObject();
                mapObject.tip.hide();
              }
              // Hide the tooltip
            } else {
              if (vectorMapRef.current) {
                const mapObject = vectorMapRef.current.getMapObject();
                mapObject.tip.hide();
              }
              setSelectedMapCountry(countryCode); // Select the country
              const selectedCountryName = countriesArray.find(
                (c) => c.code === countryCode
              )?.name;
              props.setMapClickValue(selectedCountryName); // Pass the country name to props
            }
          }}
          onRegionTipShow={(e, tip, countryCode) => {
            // e.preventDefault();
            const userCount = getUserCountByCountry(countryCode);
            const orgCount = getOrganisationsCountByCountry(countryCode);
            if (selectedMapCountry === countryCode) {
              if (vectorMapRef.current) {
                const mapObject = vectorMapRef.current.getMapObject();

                mapObject.tip.hide();
              }
              tip.hide();
            } else {
              if (userCount > 0) {
                tip.html(
                  tip.html() +
                    " - " +
                    userCount +
                    " " +
                    `${userCount > 1 ? " Users" : "User"}`
                );
              } else {
                tip.html(tip.html() + " - " + 0 + " " + "User");
              }
              if (orgCount > 0) {
                tip.html(
                  tip.html() +
                    " - " +
                    orgCount +
                    " " +
                    `${orgCount > 1 ? " Organisations" : "Organisation"}`
                );
              } else {
                tip.html(tip.html() + " - " + 0 + " " + "Organisation");
              }
            }
          }}
          series={{
            regions: [
              {
                values: {
                  ...(selectedCountry === "" || selectedCountry === "All"
                    ? filteredCountries.reduce(
                        (obj, country) => ({
                          ...obj,
                          [getRegionByCountry(country)]: "#39B54A",
                        }),
                        {}
                      )
                    : {
                        ...(selectedMapCountry &&
                        selectedCountry === selectedMapCountry
                          ? { [getRegionByCountry(selectedCountry)]: "#39B54A" }
                          : {}),
                      }),
                },
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
