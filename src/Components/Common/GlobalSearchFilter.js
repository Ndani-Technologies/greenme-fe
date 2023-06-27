import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Input,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { Box, Slider, Chip, OutlinedInput } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllAdminBenchmarks, getAllCategories } from "../../slices/thunks";

const ProductsGlobalFilter = () => {
  return (
    <React.Fragment>
      <div className="col-sm-auto ms-auto">
        <div>
          <Link to="/apps-ecommerce-add-product" className="btn btn-info">
            <i className="ri-add-line align-bottom me-1"></i> Add Product
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
function valuetext(value) {
  return `${value}°C`;
}

const AllQaFilters = ({ globalFilter, setGlobalFilter, useAsyncDebounce }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [categories, setCategories] = useState([]);
  const [value, setValue] = React.useState(globalFilter);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [response, setResponse] = React.useState([0, 0]);
  const [response1, setResponse1] = React.useState([0, 0]);

  useEffect(() => {
    getAllCategories().then((res) => {
      const categoryOptions = res.map((category) => {
        return {
          value: category.titleEng,
          label: category.titleEng,
        };
      });
      setCategories(categoryOptions);
    });
  }, []);

  const onChange = useAsyncDebounce((value) => {
    console.log(value, "VAL");
    setGlobalFilter(value[0] || value[1] || undefined);
  }, 200);

  const handleCheckboxChange = (event) => {
    const switchInput = document.getElementById("form-grid-showcode");
    const switchLabel = document.querySelector(".switch-label");
    const checkbox = event.target;

    if (checkbox.checked) {
      setValue(checkbox.value);
      switchInput.value = checkbox.value;
      switchLabel.innerText = switchLabel.getAttribute("data-complete");
    } else {
      setValue("Incomplete");
      switchInput.value = "Incomplete";
      switchLabel.innerText = switchLabel.getAttribute("data-incomplete");
    }

    onChange(checkbox.checked ? "Complete" : "Incomplete");
  };

  const handleChangeCategory = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setValue(selectedOption ? selectedOption.value : globalFilter);
    onChange(selectedOption ? selectedOption.value : undefined);
  };

  const handleSliderChange = (event, newValue) => {
    setResponse(newValue);
    onChange(newValue);
    // Perform any additional logic or filtering based on the new slider value
  };

  const handleSliderChange2 = (event, newValue) => {
    setResponse1(newValue);
    onChange(newValue);
    // Perform any additional logic or filtering based on the new slider value
  };

  return (
    <div className="d-flex align-items-center w-100 p-0">
      <div
        className="d-flex align-items-center gap-1 flex-shrink-0"
        style={{ width: "30%" }}
      ></div>
      <div
        className="d-flex align-items-center gap-1 flex-shrink-0"
        style={{ width: "27%" }}
      >
        <span style={{ color: "black" }}>Filter by </span>
        <div>
          <Select
            isClearable={true}
            name="country"
            value={selectedCategory}
            placeholder="Category"
            onChange={handleChangeCategory}
            onBlur={() => handleChangeCategory(selectedCategory)}
            options={categories}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected &&
                  selected.map((value) => <Chip key={value} label={value} />)}
              </Box>
            )}
            MenuProps={MenuProps}
          />
        </div>
      </div>
      <div style={{ width: "18%" }}>
        <Box sx={{ width: 120 }}>
          <label className="mb-0 text-center">No of user answered</label>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={response}
            onChange={handleSliderChange} // Uncomment this line
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </div>

      <div
        className=" d-flex align-items-center gap-3 flex-shrink-0"
        style={{ width: "13%" }}
      >
        <div>
          <div
            className="form-check form-switch form-switch-right form-switch-md"
            style={{ display: "grid" }}
          >
            <label
              htmlFor="form-grid-showcode"
              className="form-check-label switch-label"
              defaultValue="Complete"
              data-incomplete="Incomplete"
              data-complete="Complete"
            >
              Status
            </label>
            <input
              className="form-check-input code-switcher"
              type="checkbox"
              value={value}
              defaultValue="Complete"
              id="form-grid-showcode"
              onChange={handleCheckboxChange}
              defaultChecked
            />
          </div>
        </div>
      </div>
      <div>
        <Box sx={{ width: 120 }}>
          <label className="mb-0 text-center">Response</label>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={response1}
            onChange={handleSliderChange2}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </div>
    </div>
  );
};

const FilterBenchmarkAction = ({
  setGlobalFilter,
  globalFilter,
  useAsyncDebounce,
}) => {
  const [value, setValue] = React.useState(globalFilter);
  const [value1, setValue1] = React.useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const onChange1 = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="d-flex align-items-center justify-content-between w-100 p-0">
      <div className="d-flex align-items-center border border-dark p-1  rounded">
        <i className="bx bx-search-alt search-icon"></i>
        <input
          className="border-0"
          placeholder="Search by  Title"
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          value={value || ""}
        />
      </div>

      <div>
        <select disable className="form-select">
          <option hidden selected>
            Organization
          </option>
          <option>NO</option>
          <option>I DON'T KNOW</option>
        </select>
      </div>

      <div className="d-flex align-items-center border border-dark p-1  rounded">
        <i className="bx bx-search-alt search-icon"></i>
        <input
          className="border-0"
          placeholder="Search by  Title"
          type="text"
          onChange={(e) => {
            setValue1(e.target.value);
            onChange1(e.target.value);
          }}
          value={value1 || ""}
        />
      </div>
      <div>
        <Box sx={{ width: 120 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </div>
      <div>
        <select disable className="form-select">
          <option hidden selected>
            Country
          </option>
        </select>
      </div>
      <div>
        <select disable className="form-select">
          <option hidden selected>
            Status
          </option>
          <option>Completed</option>
          <option>Completed</option>
          <option>Completed</option>
        </select>
      </div>
    </div>
  );
};
const FilterAction = () => {
  const [value, setValue] = React.useState([8, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="d-flex align-items-center justify-content-between w-100 p-0">
      <div className="d-flex align-items-center border border-dark p-1  rounded">
        <i className="bx bx-search-alt search-icon"></i>
        <input
          className="border-0"
          placeholder="Search by  Action"
          type="text"
        />
      </div>
      <div className="d-flex align-items-center border border-dark p-1 rounded">
        <i className="bx bx-search-alt search-icon"></i>
        <input
          className="border-0"
          placeholder="Search by  Question"
          type="text"
        />
      </div>
      <div className=" d-flex">
        <Label className="m-2">Filter by</Label>
        <div>
          <select disable className="form-select">
            <option hidden selected>
              Answer
            </option>
            <option>NO</option>
            <option>I DON'T KNOW</option>
          </select>
        </div>
      </div>
      <div>
        <select disable className="form-select">
          <option hidden selected>
            Assignment type
          </option>
        </select>
      </div>
      <div>
        <Box sx={{ width: 120 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </div>
      <div>
        <select disable className="form-select">
          <option hidden selected>
            Status
          </option>
        </select>
      </div>
    </div>
  );
};

const FilterA = ({ globalFilter, setGlobalFilter, useAsyncDebounce }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [countryOptions, setCountryOptions] = useState([]);
  const [value, setValue] = React.useState(globalFilter);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const userObj = JSON.parse(sessionStorage.getItem("authUser"));
    const options = userObj.otherCountries.map((country) => {
      return {
        value: country,
        label: country,
      };
    });
    setCountryOptions(options);
  }, []);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const handleCheckboxChange = (event) => {
    const switchInput = document.getElementById("form-grid-showcode");
    const switchLabel = document.querySelector(".switch-label");
    const checkbox = event.target;

    if (checkbox.checked) {
      setValue(checkbox.value);
      switchInput.value = checkbox.value;
      switchLabel.innerText = switchLabel.getAttribute("data-complete");
    } else {
      setValue("Incomplete");
      switchInput.value = "Incomplete";
      switchLabel.innerText = switchLabel.getAttribute("data-incomplete");
    }

    onChange(checkbox.checked ? "Complete" : "Incomplete");
  };

  const handleChangeCountry = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setValue(selectedOption ? selectedOption.value : globalFilter);
    onChange(selectedOption ? selectedOption.value : undefined);
  };

  const handleDateChange = (selectedDates) => {
    const formattedDates = selectedDates.map((date) => {
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return [year, month, day].join(" && ").split(" && ");
    });
    const year = formattedDates[0][0];
    const month = formattedDates[0][1];
    const day = formattedDates[0][2];

    const concatenatedValue = year && month && day;

    setSelectedDates(selectedDates);
    setValue(concatenatedValue);
    onChange(concatenatedValue);
  };

  return (
    <div className="d-flex w-100">
      <div className="d-flex align-items-center gap-1 flex-shrink-0 w-25">
        <div>
          <span style={{ color: "black", fontSize: "11px" }}>Filter by </span>
        </div>
        <div className="w-75">
          <Select
            isClearable={true}
            name="country"
            placeholder="country"
            value={selectedCountry}
            onChange={handleChangeCountry}
            onBlur={() => handleChangeCountry(selectedCountry)}
            options={countryOptions}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected &&
                  selected.map((value) => <Chip key={value} label={value} />)}
              </Box>
            )}
            MenuProps={MenuProps}
          />
        </div>
      </div>

      <div
        className=" d-flex align-items-center gap-3 flex-shrink-0"
        style={{ width: "35%", marginLeft: "35px" }}
      >
        <div>
          <div className="form-check form-switch form-switch-right form-switch-md">
            <input
              className="form-check-input code-switcher"
              type="checkbox"
              value={value}
              defaultValue="Complete"
              id="form-grid-showcode"
              onChange={handleCheckboxChange}
              defaultChecked
            />
            <label
              htmlFor="form-grid-showcode"
              className="form-check-label switch-label"
              defaultValue="Complete"
              data-incomplete="Incomplete"
              data-complete="Complete"
            >
              Status
            </label>
          </div>
        </div>
      </div>

      <div className="col-xxl-3 col-sm-4">
        <Flatpickr
          placeholder="Select date range"
          className="form-control bg-light border-light"
          options={{
            mode: "range",
            dateFormat: "d M, Y",
            minDate: new Date().fp_incr(-365),
          }}
          value={selectedDates}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

const FilterAdminBenchmark = ({
  globalFilter,
  setGlobalFilter,
  useAsyncDebounce,
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [organizationOptions, setOrganizationOptions] = useState([]);
  console.log(organizationOptions, "OOP");
  const [value, setValue] = React.useState(globalFilter);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    getAllAdminBenchmarks()
      .then((res) => {
        const options = res.map((bench) => {
          return {
            value: bench.organization,
            label: bench.organization,
          };
        });
        const uniqueArray = Array.from(
          options
            .reduce((map, obj) => map.set(obj.value, obj), new Map())
            .values()
        );
        setOrganizationOptions(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const handleCheckboxChange = (event) => {
    const switchInput = document.getElementById("form-grid-showcode");
    const switchLabel = document.querySelector(".switch-label");
    const checkbox = event.target;

    if (checkbox.checked) {
      setValue(checkbox.value);
      switchInput.value = checkbox.value;
      switchLabel.innerText = switchLabel.getAttribute("data-complete");
    } else {
      setValue("Incomplete");
      switchInput.value = "Incomplete";
      switchLabel.innerText = switchLabel.getAttribute("data-incomplete");
    }

    onChange(checkbox.checked ? "Complete" : "Incomplete");
  };

  const handleChangeOrganization = (selectedOption) => {
    setSelectedOrganization(selectedOption);
    setValue(selectedOption ? selectedOption.value : globalFilter);
    onChange(selectedOption ? selectedOption.value : undefined);
  };

  const handleDateChange = (selectedDates) => {
    const formattedDates = selectedDates.map((date) => {
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return [year, month, day].join(" && ").split(" && ");
    });
    const year = formattedDates[0][0];
    const month = formattedDates[0][1];
    const day = formattedDates[0][2];

    const concatenatedValue = year && month && day;

    setSelectedDates(selectedDates);
    setValue(concatenatedValue);
    onChange(concatenatedValue);
  };

  return (
    <div className="d-flex w-100">
      <div
        className={"search-box me-2 mb-0 d-inline-block"}
        style={{ width: "100%" }}
      >
        <input
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          id="search-bar-0"
          style={{ width: "70%" }}
          type="text"
          className="form-control search /"
          placeholder="Search by Title"
          value={value || ""}
        />
        <i className="bx bx-search-alt search-icon"></i>
      </div>
      <div className="d-flex align-items-center gap-1 flex-shrink-0 w-10">
        <div>
          <span style={{ color: "black", fontSize: "11px" }}>Filter by </span>
        </div>
        <div className="w-75">
          <Select
            isClearable={true}
            name="country"
            placeholder="Organization"
            value={selectedOrganization}
            onChange={handleChangeOrganization}
            onBlur={() => handleChangeOrganization(selectedOrganization)}
            options={organizationOptions}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected &&
                  selected.map((value) => <Chip key={value} label={value} />)}
              </Box>
            )}
            MenuProps={MenuProps}
          />
        </div>
      </div>

      <div
        className=" d-flex align-items-center gap-3 flex-shrink-0"
        style={{ width: "29%" }}
      ></div>
      <div
        className=" d-flex align-items-center gap-3 flex-shrink-0"
        style={{ width: "11%" }}
      >
        <div>
          <div className="form-check form-switch form-switch-right form-switch-md">
            <input
              className="form-check-input code-switcher"
              type="checkbox"
              value={value}
              defaultValue="Complete"
              id="form-grid-showcode"
              onChange={handleCheckboxChange}
              defaultChecked
            />
            <label
              htmlFor="form-grid-showcode"
              className="form-check-label switch-label"
              defaultValue="Complete"
              data-incomplete="Incomplete"
              data-complete="Complete"
            >
              Status
            </label>
          </div>
        </div>
      </div>

      <div
        className="col-xxl-3 col-sm-4 w-15"
        style={{ width: "20%", marginRight: "20px" }}
      >
        <Flatpickr
          placeholder="Select date range"
          className="form-control bg-light border-light"
          options={{
            mode: "range",
            dateFormat: "d M, Y",
            minDate: new Date().fp_incr(-365),
          }}
          value={selectedDates}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};
const AdminRAFilters = ({
  globalFilter,
  setGlobalFilter,
  useAsyncDebounce,
  category,
  timeScale,
  reductionPotential,
  cost,
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [value, setValue] = React.useState(globalFilter);
  const [valueStatus, setValueStatus] = React.useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [potentialOptions, setpotentialOptions] = useState([]);
  const [selectedPotential, setSelectedPotential] = useState([]);

  const [costOptions, setCostOptions] = useState([]);
  const [selectedCost, setSelectedCost] = useState([]);

  const [timeScaleOptions, setTimeScaleOptions] = useState([]);
  const [selectedTimeScale, setSelectedTimeScale] = useState([]);

  useEffect(() => {
    setCategoryOptions(
      (category || []).map((value) => {
        return {
          label: value.title,
          value: value.title,
        };
      })
    );
    setpotentialOptions(
      (reductionPotential || []).map((value) => {
        return {
          label: value.title,
          value: value.title,
        };
      })
    );
    setCostOptions(
      (cost || []).map((value) => {
        return {
          label: value.title,
          value: value.title,
        };
      })
    );
    setTimeScaleOptions(
      (timeScale || []).map((value) => {
        return {
          label: value.title,
          value: value.title,
        };
      })
    );
  }, [category]);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const handleCheckboxChange = (event) => {
    const switchInput = document.getElementById("form-grid-showcode");
    const switchLabel = document.querySelector(".switch-label");
    const checkbox = event.target;

    if (checkbox.checked) {
      setValueStatus(checkbox.value ? "Completed" : "In Progress");
      switchInput.value = checkbox.value;
      // switchLabel.innerText = switchLabel.getAttribute("data-active");
    } else {
      setValueStatus(false);
      switchInput.value = false;
      // switchLabel.innerText = switchLabel.getAttribute("data-inActive");
    }

    onChange(checkbox.checked ? "Completed" : "In Progress");
  };

  const handleChangeCategory = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setValue(selectedOption ? selectedOption.value : globalFilter);
    onChange(selectedOption ? selectedOption.value : undefined);
  };
  const handleChangePotential = (selectedOption) => {
    setSelectedPotential(selectedOption);
    setValue(selectedOption ? selectedOption.value : globalFilter);
    onChange(selectedOption ? selectedOption.value : undefined);
  };
  const handleChangeCost = (selectedOption) => {
    setSelectedCost(selectedOption);
    setValue(selectedOption ? selectedOption.value : globalFilter);
    onChange(selectedOption ? selectedOption.value : undefined);
  };
  const handleChangeTimescale = (selectedOption) => {
    setSelectedTimeScale(selectedOption);
    setValue(selectedOption ? selectedOption.value : globalFilter);
    onChange(selectedOption ? selectedOption.value : undefined);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Col sm={3}>
          <div className="search-box">
            <Input
              type="text"
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              value={value || ""}
              className="form-control search"
              placeholder="Search for..."
            />
            <i className="ri-search-line search-icon"></i>
          </div>
        </Col>
        <Col
          lg={6}
          className="d-flex gap-2 w-50 align-items-center justify-content-end m-0"
        >
          <div>
            <Select
              isClearable={true}
              name="category"
              placeholder="Category"
              value={selectedCategory}
              onChange={handleChangeCategory}
              onBlur={() => handleChangeCategory(selectedCategory)}
              options={categoryOptions}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected &&
                    selected.map((value) => <Chip key={value} label={value} />)}
                </Box>
              )}
              MenuProps={MenuProps}
            />
          </div>
          <div className="form-check form-switch form-switch-right form-switch-md">
            <input
              className="form-check-input code-switcher"
              type="checkbox"
              value={valueStatus}
              defaultValue="Status"
              id="form-grid-showcode"
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="form-grid-showcode"
              className="form-check-label switch-label"
              defaultValue="Status"
              data-inActive="false"
              data-active="true"
            >
              Status
            </label>
          </div>
          <div>
            <Select
              isClearable={true}
              name="category"
              placeholder="Reduction Potential"
              value={selectedPotential}
              onChange={handleChangePotential}
              onBlur={() => handleChangePotential(selectedPotential)}
              options={potentialOptions}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected &&
                    selected.map((value) => <Chip key={value} label={value} />)}
                </Box>
              )}
              MenuProps={MenuProps}
            />
          </div>
          <div>
            <Select
              isClearable={true}
              name="Cost"
              placeholder="Cost"
              value={selectedCost}
              onChange={handleChangeCost}
              onBlur={() => handleChangeCost(selectedCost)}
              options={potentialOptions}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected &&
                    selected.map((value) => <Chip key={value} label={value} />)}
                </Box>
              )}
              MenuProps={MenuProps}
            />
          </div>
          <div>
            <Select
              isClearable={true}
              name="timescale"
              placeholder="Timescale"
              value={selectedTimeScale}
              onChange={handleChangeTimescale}
              onBlur={() => handleChangeTimescale(selectedTimeScale)}
              options={timeScaleOptions}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected &&
                    selected.map((value) => <Chip key={value} label={value} />)}
                </Box>
              )}
              MenuProps={MenuProps}
            />
          </div>
        </Col>
      </div>
    </>
  );
};

const CustomersGlobalFilter = () => {
  const [customerStatus, setcustomerStatus] = useState(null);

  function handlecustomerStatus(customerStatus) {
    setcustomerStatus(customerStatus);
  }

  const customerstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: "All" },
        { label: "Active", value: "Active" },
        { label: "Block", value: "Block" },
      ],
    },
  ];

  return (
    <React.Fragment>
      <Col xl={7}>
        <Row className="g-3">
          <Col sm={4}>
            <div className="">
              <Flatpickr
                className="form-control"
                id="datepicker-publish-input"
                placeholder="Select a date"
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  mode: "multiple",
                  dateFormat: "d.m.y",
                }}
              />
            </div>
          </Col>

          <Col sm={4}>
            <div>
              <Select
                value={customerStatus}
                onChange={() => {
                  handlecustomerStatus();
                }}
                options={customerstatus}
                name="choices-single-default"
                id="idStatus"
              ></Select>
            </div>
          </Col>

          <Col sm={4}>
            <div>
              <button type="button" className="btn btn-primary w-100">
                {" "}
                <i className="ri-equalizer-fill me-2 align-bottom"></i>
                Filters
              </button>
            </div>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
};

const FilterLeaderBoard = ({ item, selectedData }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex gap-3">
        <Col
          className="d-flex align-items-center border border-dark p-1 rounded"
          style={{ height: "37px" }}
        >
          <i className="bx bx-search-alt search-icon"></i>
          <input
            className="border-0"
            placeholder="Search by name"
            type="text"
          />
        </Col>
        <div>
          <select disable className="form-select">
            <option hidden selected>
              Orgnaisation
            </option>
          </select>
        </div>
      </div>
      <Col lg={6} className="d-flex align-items-center gap-3">
        <Col lg={2} className="border border-gray rounded p-1">
          <label className="m-0">Points</label>
          <input className="w-100 p-0 border-bottom border-0" type="text" />
        </Col>
        <Col>
          <select disable className="form-select">
            <option hidden selected>
              Points Type
            </option>
            <option>Total Points</option>
            <option>Action points</option>
            <option>Collaboration points</option>
            <option>Discussion points</option>
          </select>
        </Col>
        <Col>
          <select disable className="form-select">
            <option hidden selected>
              Realtionship
            </option>
            <option>Greater Than (>)</option>
            <option>Equal to (=)</option>
            <option>Not Equal to (!)</option>
            <option>Greater than or Equal to (>=)</option>
          </select>
        </Col>
      </Col>
      <div>
        <Button
          // href="/leaderboardtablecard"
          onClick={() => {
            navigate("/leaderboardtablecard", {
              state: { data: selectedData },
            });
          }}
          disabled={selectedData?.length >= 2 ? false : true}
        >
          Compare
        </Button>
      </div>
    </div>
  );
};

const OrderGlobalFilter = () => {
  const [orderStatus, setorderStatus] = useState([]);
  const [orderPayement, setorderPayement] = useState(null);

  function handleorderStatus(orderstatus) {
    setorderStatus(orderstatus);
  }

  function handleorderPayement(orderPayement) {
    setorderPayement(orderPayement);
  }

  const orderstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: "All" },
        { label: "Pending", value: "Pending" },
        { label: "Inprogress", value: "Inprogress" },
        { label: "Cancelled", value: "Cancelled" },
        { label: "Pickups", value: "Pickups" },
        { label: "Returns", value: "Returns" },
        { label: "Delivered", value: "Delivered" },
      ],
    },
  ];

  const orderpayement = [
    {
      options: [
        { label: "Select Payment", value: "Select Payment" },
        { label: "All", value: "All" },
        { label: "Mastercard", value: "Mastercard" },
        { label: "Paypal", value: "Paypal" },
        { label: "Visa", value: "Visa" },
        { label: "COD", value: "COD" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <Col sm={6} className="col-xxl-2">
        <div>
          <Flatpickr
            className="form-control"
            id="datepicker-publish-input"
            placeholder="Select a date"
            options={{
              altInput: true,
              altFormat: "F j, Y",
              mode: "multiple",
              dateFormat: "d.m.y",
            }}
          />
        </div>
      </Col>

      <Col sm={4} className="col-xxl-2">
        <div>
          <Select
            value={orderStatus}
            onChange={(e) => {
              handleorderStatus(e);
            }}
            options={orderstatus}
            name="choices-single-default"
            id="idStatus"
          ></Select>
        </div>
      </Col>

      <Col sm={4} className="col-xxl-2">
        <div>
          <Select
            value={orderPayement}
            onChange={() => {
              handleorderPayement();
            }}
            options={orderpayement}
            name="choices-payment-default"
            id="idPayment"
          ></Select>
        </div>
      </Col>

      <Col sm={4} className="col-xxl-1">
        <div>
          <button type="button" className="btn btn-primary w-100">
            {" "}
            <i className="ri-equalizer-fill me-1 align-bottom"></i>
            Filters
          </button>
        </div>
      </Col>
    </React.Fragment>
  );
};

const ContactsGlobalFilter = () => {
  const [sortBy, setsortBy] = useState(null);

  function handlesortBy(sortBy) {
    setsortBy(sortBy);
  }

  const sortbyname = [
    {
      options: [
        { label: "Owner", value: "Owner" },
        { label: "Company", value: "Company" },
        { label: "Location", value: "Location" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <div className="col-lg">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">Filter by: </span>
          <Col lg={4}>
            <Select
              className="mb-0"
              value={sortBy}
              onChange={() => {
                handlesortBy();
              }}
              options={sortbyname}
              id="choices-single-default"
              placeholder="Orgnaization"
            ></Select>
          </Col>
          <span className="text-muted">Filter by: </span>
          <Col lg={4}>
            <Select
              className="mb-0"
              value={sortBy}
              onChange={() => {
                handlesortBy();
              }}
              options={sortbyname}
              id="choices-single-default"
              placeholder="Duty Station"
            ></Select>
          </Col>
        </div>
      </div>
    </React.Fragment>
  );
};

const CompaniesGlobalFilter = () => {
  const [sortBy, setsortBy] = useState("Owner");

  function handlesortBy(sortBy) {
    setsortBy(sortBy);
  }

  const sortbyname = [
    {
      options: [
        { label: "Owner", value: "Owner" },
        { label: "Company", value: "Company" },
        { label: "Location", value: "Location" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <div className="col-md-auto ms-auto">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">Sort by: </span>
          <Select
            className="mb-0"
            value={sortBy}
            onChange={() => {
              handlesortBy();
            }}
            options={sortbyname}
            id="choices-single-default"
          ></Select>
        </div>
      </div>
    </React.Fragment>
  );
};

const CryptoOrdersGlobalFilter = () => {
  return (
    <React.Fragment>
      <Col xl={2} md={6}>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <i className="ri-calendar-2-line"></i>
          </span>
          <Flatpickr
            placeholder="Select date"
            className="form-control"
            options={{
              mode: "range",
              dateFormat: "d M, Y",
            }}
          />
        </div>
      </Col>
      <Col xl={2} md={4}>
        <select
          className="form-control"
          data-choices
          data-choices-search-false
          name="choices-single-default"
          id="choices-single-default"
        >
          <option defaultValue="all">Select Type</option>
          <option value="Buy">Sell</option>
          <option value="Sell">Buy</option>
        </select>
      </Col>
      <Col xl={2} md={4}>
        <select
          className="form-control"
          data-choices
          data-choices-search-false
          name="choices-single-default2"
          id="choices-single-default2"
        >
          <option defaultValue="all">Select Status</option>
          <option value="Successful">Successful</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Pending">Pending</option>
        </select>
      </Col>
      <Col xl={1} md={4}>
        <button className="btn btn-primary w-100">Filters</button>
      </Col>
    </React.Fragment>
  );
};

const InvoiceListGlobalSearch = () => {
  const [isStatus, setisStatus] = useState(null);

  function handleisStatus(isStatus) {
    setisStatus(isStatus);
  }

  const allstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: "All" },
        { label: "Unpaid", value: "Unpaid" },
        { label: "Paid", value: "Paid" },
        { label: "Cancel", value: "Cancel" },
        { label: "Refund", value: "Refund" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <Col sm={4} xxl={3}>
        <Flatpickr
          className="form-control bg-light border-light"
          id="datepicker-publish-input"
          placeholder="Select a date"
          options={{
            altInput: true,
            altFormat: "F j, Y",
            mode: "multiple",
            dateFormat: "d.m.y",
          }}
        />
      </Col>

      <Col sm={4} xxl={3}>
        <div className="input-light">
          <Select
            value={isStatus}
            onChange={() => {
              handleisStatus();
            }}
            options={allstatus}
            name="choices-single-default"
            id="idStatus"
          ></Select>
        </div>
      </Col>

      <Col sm={4} xxl={1}>
        <Button color="info" className="w-100">
          <i className="ri-equalizer-fill me-1 align-bottom"></i> Filters
        </Button>
      </Col>
    </React.Fragment>
  );
};

const TicketsListGlobalFilter = () => {
  return (
    <React.Fragment>
      <Col xxl={3} sm={4}>
        <Flatpickr
          className="form-control"
          placeholder="Select date range"
          options={{
            mode: "range",
            dateFormat: "d M, Y",
          }}
        />
      </Col>
      <Col xxl={3} sm={4}>
        <div className="input-light">
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="choices-single-default"
            id="idStatus"
          >
            <option value="">Status</option>
            <option defaultValue="all">All</option>
            <option value="Open">Open</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Closed">Closed</option>
            <option value="New">New</option>
          </select>
        </div>
      </Col>
      <Col xxl={1} sm={4}>
        <button type="button" className="btn btn-info w-100">
          {" "}
          <i className="ri-equalizer-fill me-1 align-bottom"></i>
          Filters
        </button>
      </Col>
    </React.Fragment>
  );
};

const NFTRankingGlobalFilter = () => {
  return (
    <React.Fragment>
      <Col xxl={2} sm={4} className="ms-auto">
        <div>
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="choices-single-default"
            id="idStatus"
          >
            <option value="All Time" defaultValue>
              All Time
            </option>
            <option value="1 Day">1 Day</option>
            <option value="7 Days">7 Days</option>
            <option value="15 Days">15 Days</option>
            <option value="1 Month">1 Month</option>
            <option value="6 Month">6 Month</option>
          </select>
        </div>
      </Col>
    </React.Fragment>
  );
};

const TaskListGlobalFilter = () => {
  return (
    <React.Fragment>
      <div className="col-xxl-3 col-sm-4">
        <Flatpickr
          placeholder="Select date range"
          className="form-control bg-light border-light"
          options={{
            mode: "range",
            dateFormat: "d M, Y",
          }}
        />
      </div>

      <div className="col-xxl-3 col-sm-4">
        <div className="input-light">
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="status"
            id="idStatus"
          >
            <option value="">Status</option>
            <option defaultValue="all">All</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="col-xxl-1 col-sm-4">
        <button type="button" className="btn btn-info w-100">
          {" "}
          <i className="ri-equalizer-fill me-1 align-bottom"></i>
          Filters
        </button>
      </div>
    </React.Fragment>
  );
};

const LeadsGlobalFilter = ({ onClickDelete }) => {
  return (
    <React.Fragment>
      <div className="col-sm-auto ms-auto">
        <div className="hstack gap-2">
          <button className="btn btn-soft-danger" onClick={onClickDelete}>
            <i className="ri-delete-bin-2-line"></i>
          </button>
          <button
            type="button"
            className="btn btn-info"
            //  onClick={toggleInfo}
          >
            <i className="ri-filter-3-line align-bottom me-1"></i> Fliters
          </button>
          <button
            type="button"
            className="btn btn-success add-btn"
            id="create-btn"
            // onClick={() => { setIsEdit(false); toggle(); }}
          >
            <i className="ri-add-line align-bottom me-1"></i> Add Leads
          </button>
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn btn-soft-info btn-icon fs-14"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="ri-settings-4-line"></i>
            </DropdownToggle>
            <DropdownMenu>
              <li>
                <DropdownItem>Copy</DropdownItem>
              </li>
              <li>
                <DropdownItem>Move to pipline</DropdownItem>
              </li>
              <li>
                <DropdownItem>Add to exceptions</DropdownItem>
              </li>
              <li>
                <DropdownItem>Switch to common form view</DropdownItem>
              </li>
              <li>
                <DropdownItem>Reset form view to default</DropdownItem>
              </li>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </React.Fragment>
  );
};

export {
  AdminRAFilters,
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
  LeadsGlobalFilter,
  FilterA,
  FilterAction,
  AllQaFilters,
  FilterBenchmarkAction,
  FilterLeaderBoard,
  FilterAdminBenchmark,
};
