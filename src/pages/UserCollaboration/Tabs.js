import React, { useState, useEffect, useMemo, useRef } from "react";
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
import debounce from "lodash/debounce";
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
  const debounceRef = useRef(0);

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

  const debouncedSearch = useMemo(
    () =>
      debounce((value, type) => {
        debounceRef.current += 1;
        const LocalRef = debounceRef.current;
        setTimeout(() => {
          if (LocalRef === debounceRef.current) {
            if (type === "searchText") {
              handleFilter({ searchTextValue: value });
            }

            if (type === "slider") {
              handleFilter({ sliderValue: value });
            }
          }
        }, 1);
      }, 300),
    []
  );

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
        setUsersCountries([...new Set(usersData.map((user) => user.country))]);
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

  const handleFilter = ({
    organizationValue,
    countryValue,
    sliderValue,
    searchTextValue,
  }) => {
    let filteredUsers = allUsersDataSet;

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

    if (sliderValue && sliderValue?.length === 2) {
      filteredUsers = filteredUsers.filter((user) => {
        return (
          user.totalPoint >= sliderValue[0] && user.totalPoint <= sliderValue[1]
        );
      });
    }

    if (searchTextValue && searchTextValue !== "") {
      filteredUsers = filteredUsers.filter((user) => {
        return (
          (user?.firstName?.includes(searchTextValue) ||
            user?.lastName?.includes(searchTextValue)) &&
          user
        );
      });
    }

    setAllUsersData(filteredUsers);
    setTotalPages(Math.ceil(filteredUsers.length / 12));
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
                <div className="d-flex  gap-2">
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
                      onChange={(e) => {
                        const searchTextValue = e.target.value.trim();
                        setSearchText(searchTextValue);
                        if (searchTextValue?.length >= 3) {
                          debouncedSearch(searchTextValue, "searchText");
                        }
                      }}
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
                        All
                      </option>
                      {usersOrganizations.map((item) => {
                        return <option value={item}> {item} </option>;
                      })}
                    </select>
                  </div>
                  <div>
                    <Box sx={{ width: 120 }}>
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={sliderValue}
                        onChange={(event, value) => {
                          setSliderValue(value);
                          debouncedSearch(value, "slider");
                        }}
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
                      <option value="" selected>
                        All
                      </option>
                      {usersCountries?.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                  </div>
                </div>
                {loading ? (
                  <h5 className="mb-3 p-3 pb-0">Loading...</h5>
                ) : allUsersData?.length > 0 ? (
                  allUsersData
                    ?.slice((currentPage - 1) * 12, currentPage * 12)
                    ?.map((item, index) => (
                      <Col
                        xs={12}
                        md={6}
                        lg={4}
                        xl={4}
                        xxl={4}
                        key={index}
                        onClick={() => handleSelectedCard(item)}
                      >
                        <Col
                          className="d-flex gap-2 border border-light rounded p-2 mb-2"
                          style={{ fontSize: "12px" }}
                        >
                          <div>
                            <img src={item.profilePic} />
                          </div>
                          <div>
                            <div className="text-dark fs-6 d-flex justify-content-between">
                              {item.firstName} {item.lastName}
                              <div>
                                <i
                                  style={{ color: "grey", marginRight: "6px" }}
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
                              {moment(item.createdAt).format()}
                            </div>
                          </div>
                        </Col>
                      </Col>
                    ))
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
                                  return (
                                    <div className="avatar-group-item">
                                      <Link
                                        to="#"
                                        className="d-inline-block"
                                        id={user._id}
                                      >
                                        <img
                                          src={user.profilePic}
                                          alt=""
                                          className="rounded-circle avatar-xxs"
                                        />
                                      </Link>
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
