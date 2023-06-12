import React, { useCallback, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
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
import { Cards } from "./TabsData";
import { Orgnaization } from "./TabsData";
import { widgetsActivities, widgetsTasks } from "../../common/data/index";
import { Link } from "react-router-dom";
import CategoryModal from "./cardModal";
import { Box, Select, Slider } from "@mui/material";

const CardsPerPage = [12, 4]; // Number of cards to display per page: [8 cards on first page, 4 cards on second page]

const Tabs = () => {
  const [modal, setModal] = useState(false);
  const [card, setCard] = useState(null);
  const [justifyTab, setjustifyTab] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCard = currentPage === 1 ? CardsPerPage[0] : CardsPerPage[1];
  const currentCards = Cards.slice(0, indexOfLastCard);

  const totalCards = Cards.length;
  const totalPages = CardsPerPage.length;

  const justifyToggle = (tab) => {
    if (justifyTab !== tab) {
      setjustifyTab(tab);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSelectedCard = (item) => {
    setCard(item);
    setModal(true);
  };
  const [value, setValue] = React.useState([8, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
  }
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
                <div className="d-flex gap-2">
                  <div
                    className="d-flex align-items-center border border-dark p-1 w-25 rounded"
                    style={{ height: "37px" }}
                  >
                    <i className="bx bx-search-alt search-icon"></i>
                    <input
                      className="border-0"
                      placeholder="Search by  Action"
                      type="text"
                    />
                  </div>
                  <div className="mb-5 w-25">
                    <select className="form-select mb-3">
                      <option hidden selected>
                        Orgnaisation
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
                  <div className="mb-5" style={{ width: "145px" }}>
                    <select className="form-select mb-3">
                      <option hidden selected>
                        Country
                      </option>
                    </select>
                  </div>
                </div>
                {currentCards.map((item, index) => (
                  <Col
                    xs={12}
                    md={6}
                    lg={4}
                    xxl={3}
                    key={index}
                    onClick={() => handleSelectedCard(item)}
                  >
                    <Col
                      className="d-flex  gap-2 border border-light rounded p-2 mb-2"
                      style={{ fontSize: "12px" }}
                    >
                      <div>
                        <img src={item.Image} />
                      </div>
                      <div>
                        <div className="text-dark fs-6 d-flex justify-content-between">
                          {item.Name}
                          <div>
                            <i
                              style={{ color: "grey", marginRight: "6px" }}
                              class="ri-question-answer-line"
                            ></i>
                            <i
                              style={{ color: "grey" }}
                              class="ri-mail-line"
                            ></i>
                          </div>
                        </div>
                        {item.Company}
                        <div className="d-flex align-items-center gap-1">
                          <img src={item.Medal} />
                          {item.Goal}
                        </div>
                        <div className="d-flex gap-3">
                          <div className="d-flex align-items-center gap-1">
                            <img src={item.Flag1} />
                            {item.Country1}
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <img src={item.Flag2} />
                            {item.Country2}
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <img src={item.Flag3} />
                            {item.Country3}
                          </div>
                        </div>
                        <div className="text-success">{item.Date}</div>
                      </div>
                    </Col>
                  </Col>
                ))}
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
              <div className="d-flex gap-2 ">
                {Orgnaization.map((item) => {
                  return (
                    <Col lg={3} className="border border-light rounded p-3">
                      <div>
                        <img className="mx-auto d-block" src={item.Image} />
                      </div>
                      <div className="text-center">{item.Name}</div>
                      <div className="d-flex justify-content-center gap-2">
                        <img src={item.Flg1} />
                        <img src={item.Flg2} />
                        <img src={item.Flg3} />
                        <img src={item.Flg4} />
                        <img src={item.Flg5} />
                        <img src={item.Flg6} />
                      </div>
                      <div className="d-flex mt-2">
                        <Col lg={4} className="border-end text-center">
                          No of Points <br /> 30
                        </Col>
                        <Col lg={5}>
                          {widgetsActivities.map((item, key) => (
                            <ListGroupItem className="ps-0" key={key}>
                              <Col className="col-sm-auto  text-center border-end">
                                <span>
                                  Active <br />
                                  users
                                </span>
                                <div className="avatar-group justify-content-center">
                                  {item.subItem.map((item, key) => (
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
                                  ))}
                                </div>
                              </Col>
                            </ListGroupItem>
                          ))}
                        </Col>
                        <Col className=" text-center">
                          No of Users <br />
                          15
                        </Col>
                      </div>
                    </Col>
                  );
                })}
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Tabs;
