import React, { useState, useEffect } from "react";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import LeaderBoardCards from "./LeaderBoardCards";
import { Col, Label, Row } from "reactstrap";
import Select from "react-select";
import {
  Box,
  Chip,
  MenuItem,
  OutlinedInput,
  Slider,
  useTheme,
} from "@mui/material";
import Nouislider from "nouislider-react";
import { getAllUsers } from "../../slices/thunks";
const LeaderBord = () => {
  const [selectCountry, setselectCountry] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setAllUsers(res);
      })
      .catch((err) => console.log(err, "UNABLE TO GET USERS"));
  }, []);

  function handleselectCountry(selectCountry) {
    setselectCountry(selectCountry);
  }
  const country = [
    {
      options: [
        { label: "Argentina", value: "Argentina" },
        { label: "Belgium", value: "Belgium" },
        { label: "Brazil", value: "Brazil" },
        { label: "Colombia", value: "Colombia" },
        { label: "Denmark", value: "Denmark" },
        { label: "France", value: "France" },
        { label: "Germany", value: "Germany" },
        { label: "Mexico", value: "Mexico" },
        { label: "Russia", value: "Russia" },
        { label: "Spain", value: "Spain" },
        { label: "Syria", value: "Syria" },
        { label: "United Kingdom", value: "United Kingdom" },
        {
          label: "United States of America",
          value: "United States of America",
        },
      ],
    },
  ];
  const [value, setValue] = React.useState([8, 50]);
  const [values, setValues] = React.useState([8, 50]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
  }
  function valuetexts(values) {
    return `${values}°C`;
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <ActionMain
          Title={"Leader Board"}
          Text={
            "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
          }
        />
        <div className="d-flex align-items-center justify-content-between w-100 mt-5 mb-3">
          <div className="d-flex align-items-center justify-content-evenly gap-3 w-75">
            <div
              className="d-flex align-items-center border border-dark p-1 rounded"
              style={{ height: "30px" }}
            >
              <i className="bx bx-search-alt search-icon"></i>
              <input
                className="border-0 bg-light"
                placeholder="Search by  name"
                type="text"
              />
            </div>
            <div className="d-flex align-items-center gap-3 text-dark">
              <Label htmlFor="country-select">Filter by</Label>
              <Select
                className="mb-0"
                style={{ width: "300px" }}
                value={selectCountry}
                onChange={() => {
                  handleselectCountry();
                }}
                options={country}
                id="country-select"
                placeholder="Country"
              ></Select>
            </div>
            <div>
              <select disable className="form-select">
                <option hidden selected>
                  Orgnaisation
                </option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-around w-50">
            <Box className="text-center" sx={{ width: 120 }}>
              <label className="mb-1">Position</label>
              <Slider
                className="p-0"
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Box>
            <Box sx={{ width: 120 }}>
              <Label className="m-auto mb-1">Points</Label>
              <Slider
                className="p-0"
                getAriaLabel={() => "Temperature range"}
                value={values}
                onChange={handleChanges}
                valueLabelDisplay="auto"
                getAriaValueText={valuetexts}
              />
            </Box>
          </div>
        </div>
        <LeaderBoardCards allUsers={allUsers} />
      </div>
    </React.Fragment>
  );
};

export default LeaderBord;
