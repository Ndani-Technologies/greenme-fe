import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Pagination,
  PaginationItem,
  PaginationLink,
  Tooltip,
  ListGroupItem,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import CategoryModal from "./cardModal";
import { Box, Slider } from "@mui/material";
import axios from "axios";
import Medal from "../../assets/images/Medal.png";
import Tanzania from "../../../src/assets/images/Tanzania.png";
import Kenya from "../../assets/images/Kenya-1.png";
import moment from "moment";
import WFP from "../../assets/images/WFP.png";
import getOrganizationsData from "../../common/getOrganizationsData";

const Tabs = () => {
  const [modal, setModal] = useState(false);
  const [card, setCard] = useState(null);
  const [justifyTab, setJustifyTab] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsersData, setAllUsersData] = useState([]);
  const [allUsersDataSet, setAllUsersDataSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [usersOrganizations, setUsersOrganizations] = useState([]);
  const [usersCountries, setUsersCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sliderValue, setSliderValue] = React.useState([0, 0]);
  const [usersOrganizationsData, setUsersOrganizationsData] = useState([]);
  const loggedInUser = JSON.parse(sessionStorage.getItem("authUser"));

  const justifyToggle = (tab) => {
    if (justifyTab !== tab) {
      setJustifyTab(tab);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectedCard = (item) => {
    setCard(item);
    setModal(true);
  };

  const handleInputChange = (e) => {
    const searchTextValue = e.target.value;
    setSearchText(searchTextValue);
    // if (searchTextValue.length >= 3) {
    let filteredUsers = allUsersDataSet;

    if (searchTextValue && searchTextValue !== "") {
      filteredUsers = filteredUsers.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchTextValue.toLowerCase());
      });
      setAllUsersData(filteredUsers);
    } else {
      setAllUsersData(allUsersData);
    }
  };

  const handleSliderChange = (e) => {
    const sliderRangeValue = e.target.value;
    setSliderValue(sliderRangeValue);
    let filteredUsers = allUsersDataSet;
    if (sliderRangeValue && sliderRangeValue.length === 2) {
      filteredUsers = filteredUsers.filter((user) => {
        return (
          user.totalPoint >= sliderRangeValue[0] &&
          user.totalPoint <= sliderRangeValue[1]
        );
      });
      setAllUsersData(filteredUsers);
    } else {
      setAllUsersData(allUsersData);
    }
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_USER_URL}user`);
      if (response) {
        const usersData = response.filter(
          (user) => user._id !== loggedInUser._id
        );
        setAllUsersData(usersData);
        setAllUsersDataSet(usersData);
        setTotalPages(Math.ceil(usersData.length / 12));
        setUsersOrganizations([
          ...new Set(usersData.map((user) => user.organization)),
        ]);
        setUsersCountries([
          ...new Set(usersData?.map((user) => user?.country).filter(Boolean)),
        ]);
        setUsersOrganizationsData(getOrganizationsData(usersData));
      }
    } catch (error) {
      toast.error(error?.message ?? "Something Went Wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleFilter = (filterValues) => {
    const { organizationValue, countryValue, searchTextValue } = filterValues;

    let filteredUsers = allUsersDataSet && allUsersDataSet;

    if (organizationValue && organizationValue !== "") {
      filteredUsers = filteredUsers.filter(
        (user) => user.organization === organizationValue
      );
    }

    if (countryValue && countryValue !== "") {
      filteredUsers = filteredUsers.filter(
        (user) => user.country === countryValue
      );
    }

    setAllUsersData(filteredUsers);
    setTotalPages(Math.ceil(filteredUsers.length / 12));
  };
  const [hoveredAvatar, setHoveredAvatar] = useState(null);

  const handleMouseEnter = (avatarId) => {
    setHoveredAvatar(avatarId);
  };

  const handleMouseLeave = () => {
    setHoveredAvatar(null);
  };
  return (
    <Col className="p-4 " xxl={12}>
      <h5 className="mb-3 p-3 pb-0">User details</h5>
      <Card>
        <CardBody>
          <Nav tabs className="nav-tabs nav-justified mb-3">
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({ active: justifyTab === "1" })}
              onClick={() => justifyToggle("1")}
            >
              User
            </NavLink>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({ active: justifyTab === "2" })}
                onClick={() => justifyToggle("2")}
              >
                Organization
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={justifyTab} className="text-muted">
            <TabPane tabId="1" id="base-justified-home">
              <Row>
                <div className="d-flex  gap-3">
                  <div
                    className="d-flex align-items-center"
                    style={{ height: "37px" }}
                  >
                    <i
                      style={{ color: "blue" }}
                      className="bx bx-filter-alt filter-icon"
                    />
                  </div>

                  <div
                    className="d-flex align-items-center border border-dark p-1 w-25 rounded"
                    style={{ height: "37px" }}
                  >
                    <i className="bx bx-search-alt search-icon"></i>
                    <input
                      className="border-0"
                      placeholder="Search By Name"
                      type="text"
                      value={searchText}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <div className="mb-5 w-25">
                    <select
                      className="form-select mb-3"
                      onChange={(event) =>
                        handleFilter({ organizationValue: event.target.value })
                      }
                    >
                      <option selected value="">
                        Organisation
                      </option>
                      {usersOrganizations.map((item) => {
                        return <option value={item}> {item} </option>;
                      })}
                    </select>
                  </div>
                  <div style={{ width: "180px", textAlign: "-webkit-center" }}>
                    <Box sx={{ width: 120 }}>
                      <label style={{ color: "black" }}>Position</label>

                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={sliderValue}
                        onChange={(e) => handleSliderChange(e)}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </div>
                  <div className="mb-5" style={{ width: "145px" }}>
                    <select
                      className="form-select mb-3"
                      onChange={(event) => {
                        handleFilter({ countryValue: event.target.value });
                      }}
                    >
                      <option value="">Country</option>
                      {usersCountries
                        ?.sort((a, b) => a.localeCompare(b)) // Sort the country names alphabetically
                        .map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {loading ? (
                  <h5 className="mb-3 p-3 pb-0">Loading...</h5>
                ) : allUsersData?.length > 0 ? (
                  allUsersData
                    ?.slice((currentPage - 1) * 12, currentPage * 12)
                    ?.map((item, index) => {
                      const createdAt = item.createdAt;

                      // Format the createdAt time
                      const formattedTime = moment(createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      );

                      // Calculate the time difference
                      const now = moment();
                      const diffDuration = moment.duration(now.diff(createdAt));
                      const days = diffDuration.asDays();
                      const weeks = diffDuration.asWeeks();
                      const months = diffDuration.asMonths();
                      const years = diffDuration.asYears();

                      let timeAgo;
                      if (days <= 1) {
                        timeAgo = `${Math.floor(
                          diffDuration.asHours()
                        )} hours ago`;
                      } else if (weeks <= 1) {
                        timeAgo = `${Math.floor(days)} days ago`;
                      } else if (months <= 1) {
                        timeAgo = `${Math.floor(weeks)} weeks ago`;
                      } else if (years <= 1) {
                        timeAgo = `${Math.floor(months)} months ago`;
                      } else {
                        timeAgo = `${Math.floor(years)} years ago`;
                      }

                      return (
                        <Col xs={12} md={6} lg={4} xl={4} xxl={4} key={index}>
                          <Col
                            className="d-flex gap-2 border border-light rounded p-2 mb-2"
                            style={{ fontSize: "12px" }}
                          >
                            <div
                              className="cursor-pointer"
                              onClick={() => handleSelectedCard(item)}
                            >
                              <img src={item.profilePic} />
                            </div>
                            <div style={{ width: "300px" }}>
                              <div className="text-dark fs-6 d-flex justify-content-between">
                                <p
                                  className="text-dark"
                                  // style={{ color: "black", fontWeight: "500" }}
                                >
                                  {item.firstName} {item.lastName}
                                </p>
                                <div className="ms-auto align-self-center">
                                  <i
                                    style={{
                                      color: "grey",
                                      marginRight: "6px",
                                    }}
                                    class="ri-question-answer-line"
                                  />
                                  <i
                                    style={{ color: "grey" }}
                                    class="ri-mail-line"
                                  />
                                </div>
                              </div>
                              {item.organization}
                              <div className="d-flex align-items-center gap-1">
                                <img src={Medal} />
                                {item.totalPoint}
                              </div>
                              <div className="d-flex gap-3">
                                <div className="d-flex align-items-center gap-1">
                                  <img src={Kenya} />
                                  {item.country}
                                </div>
                                {item?.otherCountries?.map((country) => {
                                  return (
                                    <div className="d-flex align-items-center gap-1">
                                      <img src={Tanzania} />
                                      {country}
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="text-success">
                                <p>{formattedTime}</p>
                                <p>Last Active: {timeAgo}</p>
                              </div>
                            </div>
                          </Col>
                        </Col>
                      );
                    })
                ) : (
                  <h5 className="mb-3 p-3 pb-0">No Record Found</h5>
                )}
              </Row>

              {modal && (
                <CategoryModal modal={modal} setModal={setModal} card={card} />
              )}

              <Pagination>
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    previous
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </PaginationLink>
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <PaginationItem
                      key={index}
                      active={currentPage === pageNumber}
                    >
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink
                    next
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </TabPane>

            <TabPane tabId="2" id="product">
              <Row>
                {usersOrganizationsData?.map((item) => {
                  return (
                    <Col
                      lg={3}
                      xs={12}
                      md={6}
                      xl={4}
                      xxl={4}
                      className="border border-light rounded p-3"
                    >
                      <div>
                        <img className="mx-auto d-block" src={WFP} />
                      </div>
                      <div className="text-center">{item.name}</div>
                      <div className="d-flex justify-content-center gap-2">
                        {item?.countries?.map((country) => {
                          return <span>{country}</span>;
                        })}
                        {/* <img src={item.Flg1} />
                        <img src={item.Flg2} />
                        <img src={item.Flg3} />
                        <img src={item.Flg4} />
                        <img src={item.Flg5} />
                        <img src={item.Flg6} /> */}
                      </div>
                      <div className="d-flex mt-2">
                        <Col lg={4} className="border-end text-center">
                          No of Points <br /> {item.number_of_points}
                        </Col>
                        <Col lg={5}>
                          <ListGroupItem className="ps-0">
                            <Col className="col-sm-auto  text-center border-end">
                              <span>
                                Active <br />
                                users
                              </span>
                              <div className="avatar-group justify-content-center">
                                {item?.active_users?.map((user) => {
                                  const tooltipTarget = `tooltip-${user._id}`;
                                  return (
                                    <div className="avatar-group-item">
                                      <Link
                                        to="#"
                                        className="d-inline-block"
                                        id={`tooltip-${user._id}`}
                                        onMouseEnter={() =>
                                          handleMouseEnter(user._id)
                                        }
                                        onMouseLeave={handleMouseLeave}
                                      >
                                        <img
                                          src={user.profilePic}
                                          alt=""
                                          className="rounded-circle avatar-xxs"
                                        />
                                      </Link>
                                      <Tooltip
                                        placement="top"
                                        isOpen={hoveredAvatar === user._id}
                                        target={`tooltip-${user._id}`}
                                        toggle={handleMouseLeave}
                                      >
                                        {user.firstName}
                                      </Tooltip>
                                    </div>
                                  );
                                })}
                                {/* {item.subItem.map((item, key) => (
                                    <React.Fragment key={key}>
                                      {item.img ? (
                                        <div className="avatar-group-item">
                                          <Link
                                            to="#"
                                            className="d-inline-block"
                                            id={item.targetId}
                                          >
                                            <img
                                              src={item.img}
                                              alt=""
                                              className="rounded-circle avatar-xxs"
                                            />
                                          </Link>
                                        </div>
                                      ) : (
                                        <div className="avatar-group-item">
                                          <Link to="#">
                                            <div className="avatar-xxs">
                                              <span
                                                className={
                                                  "avatar-title rounded-circle text-white " +
                                                  item.bgcolor
                                                }
                                              >
                                                {item.imgNumber}
                                              </span>
                                            </div>
                                          </Link>
                                        </div>
                                      )}
                                    </React.Fragment>
                                  ))} */}
                              </div>
                            </Col>
                          </ListGroupItem>
                          {/* {widgetsActivities.map((item, key) => (
                          ))} */}
                        </Col>
                        <Col className=" text-center">
                          No of Users <br />
                          {item.number_of_users}
                        </Col>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Tabs;
