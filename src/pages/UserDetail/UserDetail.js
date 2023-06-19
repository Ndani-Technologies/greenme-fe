import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import countryList from "react-select-country-list";
import Flatpickr from "react-flatpickr";

//import images
import progileBg from "../../../src/assets/images/profile-bg.jpg";
import avatar1 from "../../../src/assets/images/users/avatar-1.jpg";
import Layouts from "../../Layouts";
import { Icon } from "leaflet";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateUser, getUserProgress } from "../../slices/thunks";
import * as Countries from "./Countries";
import { Box, Chip, MenuItem, OutlinedInput, useTheme } from "@mui/material";
import Select from "react-select";
import { Padding } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  document.title = "Profile | GreenMe";
  const [rightColumn, setRightColumn] = useState(true);
  const [coverPhoto, setCoverPhoto] = useState(progileBg);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const theme = useTheme();
  const [countryName, setCountryName] = React.useState([]);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };
  const [activeTab, setActiveTab] = useState("1");

  const getProgressPercentage = async () => {
    getUserProgress(userObj._id)
      .then((res) => {
        setProgressPercentage(res);
      })
      .catch((err) => console.log("error in percentage benchmarking"));
  };

  const [userObj, setUserObj] = useState(
    JSON.parse(sessionStorage.getItem("authUser"))
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (
        event.storageArea === window.sessionStorage &&
        event.key === "authUser"
      ) {
        setUserObj(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const userDutyStationCountry = {
    value: userObj.country,
    label: userObj.country,
  };

  const [countryOptions, setCountryOptions] = useState([]);
  const [scopeOptions, setScopeOptions] = useState([]);

  const [bgPic, setBgPic] = useState("");


  const scopesOptions = [
    { key: "Global Level", value: "Global Level" },
    { key: "Country Level", value: "Country Level" },
    { key: "Regional Level", value: "Regional Level" },
  ];

  const [userPercentage, setUserPercentage] = useState(0);
  const [selectedScope, setSelectedScope] = useState([]);
  const [bgUpdate, setBgUpdate] = useState(false);

  useEffect(() => {
    getProgressPercentage();
    setSelectedCountry(userDutyStationCountry);
    setSelectedCountries(userObj.otherCountries);
    const options = Countries.map((country) => {
      return {
        value: country.value,
        label: country.value,
      };
    });
    setCountryOptions(options);

    setSelectedScope(userObj.scope);
    setBgPic(userObj.backgroundPic);


    const scopeValuess = scopesOptions.map((scope) => {
      return {
        value: scope.value,
        label: scope.value,
      };
    });

    setScopeOptions(scopeValuess);
    if (userPercentage < 1) {
      if (userObj.firstName) {
        setUserPercentage((prev) => prev + 12.5);
      }
      if (userObj.lastName) {
        setUserPercentage((prev) => prev + 12.5);
      }

      if (userObj.email) {
        setUserPercentage((prev) => prev + 12.5);
      }

      if (userObj.organization) {
        setUserPercentage((prev) => prev + 12.5);
      }
      if (userObj?.scope.length > 0) {
        setUserPercentage((prev) => prev + 12.5);
      }
      if (userObj.country) {
        setUserPercentage((prev) => prev + 12.5);
      }
      if (userObj.otherCountries.length > 0) {
        setUserPercentage((prev) => prev + 12.5);
      }
      if (userObj?.role?.title) {
        setUserPercentage((prev) => prev + 12.5);
      }
    }
  }, []);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstName: userObj?.firstName || "",
      lastName: userObj?.lastName || "",
      email: userObj?.email || "",
      organization: userObj?.organization || "",
      role: userObj?.role || "",
      scope: userObj?.scope || [],
      country: userObj?.country || "",
      otherCountries: userObj?.otherCountries || [],
    },

    onSubmit: (values, { resetForm }) => {
      const mappedData = {
        ...values,

        scope: selectedScope && selectedScope,

        country: selectedCountry.value && selectedCountry.value,
        otherCountries: selectedCountries && selectedCountries,
        banner: coverPhoto && coverPhoto,
      };
      updateUser(userObj._id, mappedData)
        .then((res) => toast.success("Updated Successfully"))
        .catch((err) => {
          toast.error("Unable to Update");
          console.log(err);
        });
    },
  });

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

  function getStyles(name, countryName, theme) {
    return {
      fontWeight:
        countryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleCoverPhotoChange = (event) => {
    setBgUpdate(true);
    const file = event.target.files[0];
    const fileSizeLimit = 100 * 1024; // 100 KB

    if (file && file.size > fileSizeLimit) {
      // File size exceeds the limit
      toast.error("Cannot upload a file greater than 100 KB");
      setCoverPhoto(bgPic);
      return;
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataURL = e.target.result;
      setCoverPhoto(dataURL);
    };

    reader.readAsDataURL(file);
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleChange1 = (selectedOption) => {
    if (selectedOption) {
      setSelectedCountry(selectedOption);
    } else {
      setSelectedCountry(userDutyStationCountry);
    }
  };

  const handleChange2 = (selectedOption) => {

    if (selectedOption) {
      setSelectedScope([selectedOption.value]);
    } else {
      setSelectedScope(userObj.scope);
    }

  };

  const handleChange = (selectedOptions) => {
    if (selectedOptions) {
      setSelectedCountries(selectedOptions.map((option) => option.value));
    } else {
      setSelectedCountries(userObj.otherCountries);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              {coverPhoto && (
                <img
                  src={bgUpdate ? coverPhoto : bgPic}
                  className="profile-wid-img"
                  alt=""
                />
              )}
              <div className="overlay-content">
                <div className="text-end p-3">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <Input
                      id="profile-foreground-img-file-input"
                      type="file"
                      className="profile-foreground-img-file-input"
                      onChange={handleCoverPhotoChange}
                      disabled
                    />
                    <Label
                      htmlFor="profile-foreground-img-file-input"
                      className="profile-photo-edit btn btn-light"
                    >
                      <i className="ri-image-edit-line align-bottom me-1"></i>{" "}
                      Change Cover
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5">
                <h1
                  style={{
                    marginTop: "-100px",
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "400",
                  }}
                >
                  My Profile
                </h1>
                <CardBody className="p-4">
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      <img
                        src={userObj?.profilePic}
                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        alt="user-profile"
                      />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <Input
                          id="profile-img-file-input"
                          type="file"
                          className="profile-img-file-input"
                          disabled
                        />
                        <Label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs"
                        >
                          <span className="avatar-title rounded-circle bg-light text-body ">
                            <i className="ri-camera-fill "></i>
                          </span>
                        </Label>
                      </div>
                    </div>
                    <h5 className="fs-16 mb-1">
                      {userObj?.firstName} {userObj?.lastName}{" "}
                    </h5>
                    <p className="text-muted mb-0">{userObj?.position}</p>
                    <p className="text-muted mb-0">{userObj?.organization}</p>
                    <p className="text-muted mb-0">{userObj?.country}</p>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="d-flex align-items-center mb-5">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0">Profile Completion</h5>
                    </div>
                  </div>
                  <div className="progress animated-progress custom-progress progress-label">
                    <div
                      className="progress-bar bg-"
                      role="progressbar"
                      style={{ width: userPercentage + "%" }}
                      aria-valuenow="80%"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      if{}
                      <div className="label">{userPercentage}%</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xxl={9}>
              <div className="mt-xxl-n5 card">
                <div className="d-flex">
                  <div className="d-flex justify-content-between w-25 border-end custom-padding">
                    <div>
                      <span className="fs-7">BENCHMARKING</span>
                      <div>
                        <span className="fs-3">0/0</span>
                      </div>
                    </div>
                    <i
                      class="ri-arrow-up-circle-line"
                      style={{ color: "#11D1BD" }}
                    ></i>
                  </div>
                  <div className="d-flex justify-content-between w-25 border-end p-15  custom-padding">
                    <div>
                      <span className="fs-7">RECOMMENDED ACTIONS</span>
                      <div>
                        <span className="fs-3">0/0</span>
                      </div>
                    </div>
                    <i
                      class="ri-arrow-up-circle-line"
                      style={{ color: "#11D1BD" }}
                    ></i>
                  </div>
                  <div className="d-flex justify-content-between w-25 border-end custom-padding ">
                    <div>
                      <span className="fs-7">DISCUSSIONS</span>
                      <div>
                        <span className="fs-3">0 Active</span>
                      </div>
                    </div>
                    <i
                      class="ri-arrow-down-circle-line"
                      style={{ color: "#FF7F47" }}
                    ></i>
                  </div>
                  <div className="d-flex justify-content-between w-25 border-end custom-padding ">
                    <div>
                      <span className="fs-7">COLLABORATIONS</span>
                      <div>
                        <span className="fs-3">0 Active</span>
                      </div>
                    </div>
                    <i
                      class="ri-arrow-up-circle-line"
                      style={{ color: "#11D1BD" }}
                    ></i>
                  </div>
                  <div className="d-flex justify-content-between w-25 custom-padding custom-padding ">
                    <div>
                      <span className="fs-7">LEADERBOARD</span>
                      <div>
                        <span className="fs-3">0 points</span>
                      </div>
                    </div>
                    <i
                      class="ri-arrow-down-circle-line"
                      style={{ color: "#FF7F47" }}
                    ></i>
                  </div>
                </div>
              </div>
              <Card className="mt-xxl-n2">
                <CardHeader>
                  <Nav
                    className="nav-tabs-custom rounded card-header-tabs border-bottom-0 d-flex justify-content-between"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          tabChange("1");
                        }}
                      >
                        Personal Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        // className={classnames({ active: activeTab === "2" })}
                        // onClick={() => {
                        //     tabChange("2");
                        // }}
                        type="button"
                      >
                        Benchmarking
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        // className={classnames({ active: activeTab === "3" })}
                        // onClick={() => {
                        //     tabChange("3");
                        // }}
                        type="button"
                      >
                        Recommended Actions
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        // className={classnames({ active: activeTab === "3" })}
                        // onClick={() => {
                        //     tabChange("3");
                        // }}
                        type="button"
                      >
                        Discussions
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        // className={classnames({ active: activeTab === "3" })}
                        // onClick={() => {
                        //     tabChange("3");
                        // }}
                        type="button"
                      >
                        Collaborations
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        // className={classnames({ active: activeTab === "3" })}
                        // onClick={() => {
                        //     tabChange("3");
                        // }}
                        type="button"
                      >
                        Leaderboard
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label"
                              >

                                Full Name:
                              </Label>
                              {validation.values.firstName +
                                validation.values.lastName}

                              {/* <Input
                                type="text"
                                className="form-control"
                                id="firstnameInput"
                                placeholder="Enter your firstname"
                                defaultValue="Dave"
                                value=
                                disabled
                              /> */}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="emailInput"
                                className="form-label"
                              >
                                Email Address:
                              </Label>
                              {validation.values.email}
                              {/* <Input
                                type="email"
                                value=
                                className="form-control"
                                id="emailInput"
                                placeholder="Enter your email"
                                defaultValue="daveadame@velzon.com"
                                disabled
                              /> */}
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="Orgnaization"
                                className="form-label"
                              >
                                Orgnaization:
                              </Label>
                              {validation.values.organization}
                              {/* <Input
                                value=
                                type="Orgnaization"
                                className="form-control"
                                id="Orgnaization"
                                placeholder="FleetMGT Co. X"
                                disabled
                              /> */}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="skillsInput"
                                className="form-label"
                              >
                                Scope
                              </Label>
                              <Select
                                value={

                                  selectedScope[0] && selectedScope[0].value
                                }
                                onChange={handleChange2}
                                defaultValue={{
                                  value: userObj.scope[0],
                                  label: userObj.scope[0],
                                }}

                                options={scopeOptions}
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
                                MenuProps={MenuProps}
                              />
                              {/* <select className="form-select mb-3">
                                <option hidden selected>
                                  {validation.values.scope[0]}
                                </option>
                                {userObj.scope &&
                                  userObj.scope.map((value, index) => (
                                    <option key={index} value={`${value}`}>
                                      {value}
                                    </option>
                                  ))}
                              </select> */}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="countryInput"
                                className="form-label"
                              >
                                Duty Station Country
                              </Label>
                              <Select
                                isClearable={true}
                                value={selectedCountry}
                                onChange={handleChange1}
                                defaultValue={{
                                  value: userObj.country,
                                  label: userObj.country,
                                }}
                                options={countryOptions}
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
                                MenuProps={MenuProps}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="skillsInput"
                                className="form-label"
                              >
                                Other Countries of Operation
                              </Label>
                              <Select
                                isMulti={true}
                                onChange={handleChange} // Pass the callback function without invoking it
                                options={countryOptions}
                                sx={{ width: "100%" }}
                                defaultValue={userObj.otherCountries.map(
                                  (country) => ({
                                    value: country,
                                    label: country,
                                  })
                                )}
                                placeholder=""
                                style={{ padding: "1px" }} // Correct the casing of 'padding'
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
                                MenuProps={MenuProps}
                              />
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                              <button type="submit" className="btn btn-primary">
                                Update
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft-info $primary"
                              >
                                Cancel
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>

                    <TabPane tabId="2">
                      <Form>
                        <Row className="g-2">
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="oldpasswordInput"
                                className="form-label"
                              >
                                Old Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="oldpasswordInput"
                                placeholder="Enter current password"
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="newpasswordInput"
                                className="form-label"
                              >
                                New Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="newpasswordInput"
                                placeholder="Enter new password"
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="confirmpasswordInput"
                                className="form-label"
                              >
                                Confirm Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="confirmpasswordInput"
                                placeholder="Confirm password"
                              />
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="mb-3">
                              <Link
                                to="#"
                                className="link-primary text-decoration-underline"
                              >
                                Forgot Password ?
                              </Link>
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="text-end">
                              <button type="button" className="btn btn-info">
                                Change Password
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <div className="mt-4 mb-3 border-bottom pb-2">
                        <div className="float-end">
                          <Link to="#" className="link-primary">
                            All Logout
                          </Link>
                        </div>
                        <h5 className="card-title">Login History</h5>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-smartphone-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>iPhone 12 Pro</h6>
                          <p className="text-muted mb-0">
                            Los Angeles, United States - March 16 at 2:47PM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-tablet-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>Apple iPad Pro</h6>
                          <p className="text-muted mb-0">
                            Washington, United States - November 06 at 10:43AM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-smartphone-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>Galaxy S21 Ultra 5G</h6>
                          <p className="text-muted mb-0">
                            Conneticut, United States - June 12 at 3:24PM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-macbook-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>Dell Inspiron 14</h6>
                          <p className="text-muted mb-0">
                            Phoenix, United States - July 26 at 8:10AM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                    </TabPane>

                    <TabPane tabId="3">
                      <form>
                        <div id="newlink">
                          <div id="1">
                            <Row>
                              <Col lg={12}>
                                <div className="mb-3">
                                  <Label
                                    htmlFor="jobTitle"
                                    className="form-label"
                                  >
                                    Job Title
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="jobTitle"
                                    placeholder="Job title"
                                    defaultValue="Lead Designer / Developer"
                                  />
                                </div>
                              </Col>

                              <Col lg={6}>
                                <div className="mb-3">
                                  <Label
                                    htmlFor="companyName"
                                    className="form-label"
                                  >
                                    Company Name
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    placeholder="Company name"
                                    defaultValue="Themesbrand"
                                  />
                                </div>
                              </Col>

                              <Col lg={6}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="experienceYear"
                                    className="form-label"
                                  >
                                    Experience Years
                                  </label>
                                  <Row>
                                    <Col lg={5}>
                                      <select
                                        className="form-control"
                                        data-choices
                                        data-choices-search-false
                                        name="experienceYear"
                                        id="experienceYear"
                                      >
                                        <option defaultValue="">
                                          Select years
                                        </option>
                                        <option value="Choice 1">2001</option>
                                        <option value="Choice 2">2002</option>
                                        <option value="Choice 3">2003</option>
                                        <option value="Choice 4">2004</option>
                                        <option value="Choice 5">2005</option>
                                        <option value="Choice 6">2006</option>
                                        <option value="Choice 7">2007</option>
                                        <option value="Choice 8">2008</option>
                                        <option value="Choice 9">2009</option>
                                        <option value="Choice 10">2010</option>
                                        <option value="Choice 11">2011</option>
                                        <option value="Choice 12">2012</option>
                                        <option value="Choice 13">2013</option>
                                        <option value="Choice 14">2014</option>
                                        <option value="Choice 15">2015</option>
                                        <option value="Choice 16">2016</option>
                                        <option value="Choice 17">2017</option>
                                        <option value="Choice 18">2018</option>
                                        <option value="Choice 19">2019</option>
                                        <option value="Choice 20">2020</option>
                                        <option value="Choice 21">2021</option>
                                        <option value="Choice 22">2022</option>
                                      </select>
                                    </Col>

                                    <div className="col-auto align-self-center">
                                      to
                                    </div>

                                    <Col lg={5}>
                                      <select
                                        className="form-control"
                                        data-choices
                                        data-choices-search-false
                                        name="choices-single-default2"
                                      >
                                        <option defaultValue="">
                                          Select years
                                        </option>
                                        <option value="Choice 1">2001</option>
                                        <option value="Choice 2">2002</option>
                                        <option value="Choice 3">2003</option>
                                        <option value="Choice 4">2004</option>
                                        <option value="Choice 5">2005</option>
                                        <option value="Choice 6">2006</option>
                                        <option value="Choice 7">2007</option>
                                        <option value="Choice 8">2008</option>
                                        <option value="Choice 9">2009</option>
                                        <option value="Choice 10">2010</option>
                                        <option value="Choice 11">2011</option>
                                        <option value="Choice 12">2012</option>
                                        <option value="Choice 13">2013</option>
                                        <option value="Choice 14">2014</option>
                                        <option value="Choice 15">2015</option>
                                        <option value="Choice 16">2016</option>
                                        <option value="Choice 17">2017</option>
                                        <option value="Choice 18">2018</option>
                                        <option value="Choice 19">2019</option>
                                        <option value="Choice 20">2020</option>
                                        <option value="Choice 21">2021</option>
                                        <option value="Choice 22">2022</option>
                                      </select>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>

                              <Col lg={12}>
                                <div className="mb-3">
                                  <Label
                                    htmlFor="jobDescription"
                                    className="form-label"
                                  >
                                    Job Description
                                  </Label>
                                  {/* <textarea className="form-control" id="jobDescription"
                                                                    defaultValue=""
                                                                        rows="3"
                                                                        placeholder="Enter description">You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. </textarea> */}
                                </div>
                              </Col>

                              <div className="hstack gap-2 justify-content-end">
                                <Link className="btn btn-info" to="#">
                                  Delete
                                </Link>
                              </div>
                            </Row>
                          </div>
                        </div>
                        <div id="newForm" style={{ display: "none" }}></div>

                        <Col lg={12}>
                          <div className="hstack gap-2">
                            <button type="submit" className="btn btn-info">
                              Update
                            </button>
                            <Link to="#" className="btn btn-primary">
                              Add New
                            </Link>
                          </div>
                        </Col>
                      </form>
                    </TabPane>

                    <TabPane tabId="4">
                      <div className="mb-4 pb-2">
                        <h5 className="card-title text-decoration-underline mb-3">
                          Security:
                        </h5>
                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                          <div className="flex-grow-1">
                            <h6 className="fs-14 mb-1">
                              Two-factor Authentication
                            </h6>
                            <p className="text-muted">
                              Two-factor authentication is an enhanced security
                              meansur. Once enabled, you'll be required to give
                              two types of identification when you log into
                              Google Authentication and SMS are Supported.
                            </p>
                          </div>
                          <div className="flex-shrink-0 ms-sm-3">
                            <Link to="#" className="btn btn-sm btn-primary">
                              Enable Two-facor Authentication
                            </Link>
                          </div>
                        </div>
                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                          <div className="flex-grow-1">
                            <h6 className="fs-14 mb-1">
                              Secondary Verification
                            </h6>
                            <p className="text-muted">
                              The first factor is a password and the second
                              commonly includes a text with a code sent to your
                              smartphone, or biometrics using your fingerprint,
                              face, or retina.
                            </p>
                          </div>
                          <div className="flex-shrink-0 ms-sm-3">
                            <Link to="#" className="btn btn-sm btn-primary">
                              Set up secondary method
                            </Link>
                          </div>
                        </div>
                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                          <div className="flex-grow-1">
                            <h6 className="fs-14 mb-1">Backup Codes</h6>
                            <p className="text-muted mb-sm-0">
                              A backup code is automatically generated for you
                              when you turn on two-factor authentication through
                              your iOS or Android Twitter app. You can also
                              generate a backup code on twitter.com.
                            </p>
                          </div>
                          <div className="flex-shrink-0 ms-sm-3">
                            <Link to="#" className="btn btn-sm btn-primary">
                              Generate backup codes
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <h5 className="card-title text-decoration-underline mb-3">
                          Application Notifications:
                        </h5>
                        <ul className="list-unstyled mb-0">
                          <li className="d-flex">
                            <div className="flex-grow-1">
                              <label
                                htmlFor="directMessage"
                                className="form-check-label fs-14"
                              >
                                Direct messages
                              </label>
                              <p className="text-muted">
                                Messages from people you follow
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="directMessage"
                                  defaultChecked
                                />
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <div className="flex-grow-1">
                              <Label
                                className="form-check-label fs-14"
                                htmlFor="desktopNotification"
                              >
                                Show desktop notifications
                              </Label>
                              <p className="text-muted">
                                Choose the option you want as your default
                                setting. Block a site: Next to "Not allowed to
                                send notifications," click Add.
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="desktopNotification"
                                  defaultChecked
                                />
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <div className="flex-grow-1">
                              <Label
                                className="form-check-label fs-14"
                                htmlFor="emailNotification"
                              >
                                Show email notifications
                              </Label>
                              <p className="text-muted">
                                {" "}
                                Under Settings, choose Notifications. Under
                                Select an account, choose the account to enable
                                notifications for.{" "}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="emailNotification"
                                />
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <div className="flex-grow-1">
                              <Label
                                className="form-check-label fs-14"
                                htmlFor="chatNotification"
                              >
                                Show chat notifications
                              </Label>
                              <p className="text-muted">
                                To prevent duplicate mobile notifications from
                                the Gmail and Chat apps, in settings, turn off
                                Chat notifications.
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="chatNotification"
                                />
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <div className="flex-grow-1">
                              <Label
                                className="form-check-label fs-14"
                                htmlFor="purchaesNotification"
                              >
                                Show purchase notifications
                              </Label>
                              <p className="text-muted">
                                Get real-time purchase alerts to protect
                                yourself from fraudulent charges.
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="purchaesNotification"
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="card-title text-decoration-underline mb-3">
                          Delete This Account:
                        </h5>
                        <p className="text-muted">
                          Go to the Data & Privacy section of your profile
                          Account. Scroll to "Your data & privacy options."
                          Delete your Profile Account. Follow the instructions
                          to delete your account :
                        </p>
                        <div>
                          <Input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            placeholder="Enter your password"
                            defaultValue="make@321654987"
                            style={{ maxWidth: "265px" }}
                          />
                        </div>
                        <div className="hstack gap-2 mt-3">
                          <Link to="#" className="btn btn-soft-info">
                            Close & Delete This Account
                          </Link>
                          <Link to="#" className="btn btn-light">
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Profile;
