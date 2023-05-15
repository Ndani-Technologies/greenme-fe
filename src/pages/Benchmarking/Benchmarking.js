import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Layouts from "../../Layouts";

const column = [
  {
    id: 1,
    Title: "Question 1.",
    Question: "Does your organisation have environmental commitments?",
    Info: "Information point: Environmental commitment depicts the methods, tasks, principles, and standards implemented by a business to minimise its negative impacts on the natural environment (Colwell and Joshi, 2013)",
    btnArray: ["Yes", "No", "Don't Know"],
    description: false,
  },
  {
    id: 4,
    Title: "Question 4.",
    Question:
      "Does your fleet policy include guidance to use the vehicle with the lowest environmental impact?",
    btnArray: ["Yes", "No", "  WE DON’T HAVE A POLICY", "Don't Know"],
    description: false,
  },
  {
    id: 2,
    Title: "Question 2.",
    Question: "Does your organisation have have a ‘green’ strategy?",
    Info: "Information point: By Green strategy, carbon reduction strategy, environmental roadmap/action plan…we mean a stream of actions adopted by your organization to realize green indicators and actions of environmental footprint reduction.",
    btnArray: ["Yes", "No", "Don't Know"],
    description: false,
  },
  {
    id: 5,
    Title: "Question 5.",
    Question:
      "Do you have standardised fleet procurement (global framework agreement…)??",
    Info: "Define: standardised",
    btnArray: ["Yes", "No", "Don't Know"],
    description: false,
  },
  {
    id: 3,
    Title: "Question 3.",
    Question:
      "Does your fleet policy contain references to a green strategy or environmental sustainability? For example, how to reduce emissions or waste?",
    btnArray: ["Yes", "No", "WE DON’T HAVE A POLICY", "Don't Know"],
    description: false,
  },

  {
    id: 6,
    Title: "Question 6.",
    Question: "Do you use sustainability criteria to assess/ select suppliers?",
    Info: "(ex: rental car providers, garage waste management, engine technology…)Information point: Define sustainability criteria",
    btnArray: ["Yes", "No", "Don't Know"],
    description: false,
  },
  {
    id: 7,
    Title: "Question 7.",
    Question: "Does your organisation have environmental commitments?",
    Info: "Information point: Environmental commitment depicts the methods, tasks, principles, and standards implemented by a business to minimise its negative impacts on the natural environment (Colwell and Joshi, 2013)",
    btnArray: ["Yes", "No", "Don't Know"],
    description: false,
  },
  {
    id: 8,
    Title: "Question 8.",
    Question:
      "Does your fleet policy include guidance to use the vehicle with the lowest environmental impact?",
    btnArray: ["Yes", "No", "  WE DON’T HAVE A POLICY", "Don't Know"],
    description: false,
  },
  {
    id: 9,
    Title: "Question 9.",
    Question: "Does your organisation have have a ‘green’ strategy?",
    Info: "Information point: By Green strategy, carbon reduction strategy, environmental roadmap/action plan…we mean a stream of actions adopted by your organization to realize green indicators and actions of environmental footprint reduction.",
    btnArray: ["Yes", "No", "Don't Know"],
    description: false,
  },
  {
    id: 10,
    Title: "Question 10.",
    Question:
      "Do you have standardised fleet procurement (global framework agreement…)??",
    Info: "Define: standardised",
    btnArray: ["Yes", "No", "Don't Know"],
    description: false,
  },
  {
    id: 11,
    Title: "Question 11.",
    Question:
      "Does your fleet policy contain references to a green strategy or environmental sustainability? For example, how to reduce emissions or waste?",
    btnArray: ["Yes", "No", "WE DON’T HAVE A POLICY", "Don't Know"],
    description: false,
  },

  {
    id: 12,
    Title: "Question 12.",
    Question: "Do you use sustainability criteria to assess/ select suppliers?",
    Info: "(ex: rental car providers, garage waste management, engine technology…)Information point: Define sustainability criteria",
    btnArray: ["Yes", "No", "Don't Know"],
    description: false,
  },
];

const Benchmarking = () => {
  const [justifyPillsTab, setjustifyPillsTab] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const numPages = 6; // total number of pages
  const [col, setCol] = useState(column);

  const justifyPillsToggle = (tab) => {
    if (justifyPillsTab !== tab) {
      setjustifyPillsTab(tab);
    }
  };

  const handleButtonClick = (index, btnIndex, ob) => {
    const updatedCol = [...col];
    updatedCol[index].activeButton = btnIndex;
    if (updatedCol[index].btnArray[btnIndex] === "No") {
      console.log("btn", updatedCol[index].btnArray[btnIndex]);
      updatedCol[index].description = true;
    } else {
      updatedCol[index].description = false;
    }
    setCol(updatedCol);
  };
  const renderedQuestions = col
    .slice((currentPage - 1) * numPages, currentPage * numPages)
    .map((item, index) => {
      const activeButton = item.activeButton;
      return (
        <div className="row w-50" key={index}>
          <h5>{item.Title}</h5>
          <p className="w-75 fs-5">{item.Question}</p>
          <p>{item.Info}</p>
          {item.description && (
            <textarea
              type="text"
              className="w-75 p-2"
              rows={3}
              placeholder="Comments"
            />
          )}
          <div className="d-flex mt-4">
            {item.btnArray &&
              item.btnArray.map((btn, btnIndex) => (
                <div className="buttons-container" key={btnIndex}>
                  <button
                    className={`button ${
                      activeButton === btnIndex ? "active" : ""
                    }`}
                    onClick={() =>
                      handleButtonClick(
                        (currentPage - 1) * numPages + index,
                        btnIndex,
                        btn
                      )
                    }
                  >
                    {btn}
                  </button>
                </div>
              ))}
          </div>
        </div>
      );
    });
  return (
    <React.Fragment>
      <Layouts>
        <div className="page-content overflow-auto ">
          <div className="Main-sec mx-n4 mt-n4 w-100">
            <h1>Benchmarking</h1>
            <p>
              This is a page where users can take self-assessment questionnaires
              and view their results. It will feature the ability for users to
              save progress and return to the assessment later as well as an
              option to skip or go back to previous questions. Also the option
              for the user to view their score and their benchmark results
            </p>
          </div>
          <Col lg={12} className="m-auto">
            <Card style={{ marginTop: "50px" }}>
              <CardBody className="pl-1 pr-1">
                <Nav pills className="nav-justified mb-3 mt-3">
                  <NavItem>
                    <NavLink
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      className={classnames({
                        active: justifyPillsTab === "1",
                      })}
                      onClick={() => {
                        justifyPillsToggle("1");
                      }}
                    >
                      General
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      className={classnames({
                        active: justifyPillsTab === "2",
                      })}
                      onClick={() => {
                        justifyPillsToggle("2");
                      }}
                      disabled
                    >
                      Data Section
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      className={classnames({
                        active: justifyPillsTab === "3",
                      })}
                      onClick={() => {
                        justifyPillsToggle("3");
                      }}
                      disabled
                    >
                      Vehicle Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      className={classnames({
                        active: justifyPillsTab === "4",
                      })}
                      onClick={() => {
                        justifyPillsToggle("4");
                      }}
                      disabled
                    >
                      Occupancy & Utilisation Rates
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      className={classnames({
                        active: justifyPillsTab === "5",
                      })}
                      onClick={() => {
                        justifyPillsToggle("5");
                      }}
                      disabled
                    >
                      Maintenance, waste & fuel
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      className={classnames({
                        active: justifyPillsTab === "6",
                      })}
                      onClick={() => {
                        justifyPillsToggle("6");
                      }}
                      disabled
                    >
                      Skills & competencies
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      className={classnames({
                        active: justifyPillsTab === "7",
                      })}
                      onClick={() => {
                        justifyPillsToggle("7");
                      }}
                      disabled
                    >
                      Transport/ Mobility demand management
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  activeTab={justifyPillsTab}
                  className="text-muted p-4 pt-0"
                >
                  <TabPane tabId="1" id="pill-justified-home-1">
                    <div className="row d-flex gap-5 justify-content-between w-100 mt-4 pt-4 pb-4 border-top border-dark">
                      {renderedQuestions}
                    </div>
                    <div>
                      <div className="d-flex align-items-center border-top border-dark">
                        <div className="w-50">
                          <Pagination className="mt-4">
                            <PaginationItem>
                              <PaginationItem disabled={currentPage === 1}>
                                {" "}
                                <PaginationLink
                                  to="#"
                                  onClick={() =>
                                    setCurrentPage(() => currentPage - 1)
                                  }
                                >
                                  {" "}
                                  ← &nbsp; prev{" "}
                                </PaginationLink>{" "}
                              </PaginationItem>
                            </PaginationItem>
                            <PaginationItem>
                              {" "}
                              <PaginationLink
                                to="#"
                                onClick={() => setCurrentPage(1)}
                              >
                                {" "}
                                1{" "}
                              </PaginationLink>{" "}
                            </PaginationItem>
                            <PaginationItem>
                              {" "}
                              <PaginationLink
                                to="#"
                                onClick={() => setCurrentPage(2)}
                              >
                                {" "}
                                2{" "}
                              </PaginationLink>{" "}
                            </PaginationItem>
                            <PaginationItem>
                              {" "}
                              <PaginationLink
                                to="#"
                                onClick={() => setCurrentPage(3)}
                              >
                                {" "}
                                3{" "}
                              </PaginationLink>{" "}
                            </PaginationItem>
                            <PaginationItem>
                              {" "}
                              <PaginationLink
                                to="#"
                                disabled={currentPage === numPages}
                                onClick={() =>
                                  setCurrentPage(() => currentPage + 1)
                                }
                              >
                                {" "}
                                Next &nbsp; →{" "}
                              </PaginationLink>{" "}
                            </PaginationItem>
                          </Pagination>
                          <Card className=" border-none mt-3">
                            <CardBody className="p-0">
                              <div className="d-flex align-items-center mb-2 mt-4">
                                <div className="flex-grow-1 d-flex justify-content-between w-100">
                                  <h5 className="card-title mb-0">
                                    <span>60% </span> Benchmark progress
                                  </h5>
                                  <h5>40% to go!</h5>
                                </div>
                              </div>
                              <div className="progress animated-progress custom-progress progress-label mt-3">
                                <div
                                  className="progress-bar bg- "
                                  role="progressbar"
                                  style={{ width: "60%" }}
                                  aria-valuenow="30"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {/* <div className="label">40%</div> */}
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                        <Col>
                          <div className="d-flex flex-column align-items-end">
                            <p className="w-75 text-end mb-2 ">
                              Do you consent to other users contacting you based
                              on the topics where you have answered yes?
                            </p>
                            <div class="form-check form-switch mb-2">
                              <input
                                class="form-check-input "
                                type="checkbox"
                                id="form-grid-showcode"
                                defaultChecked
                              />
                              <label
                                class="form-check-label ml-auto"
                                for="form-grid-showcode"
                              >
                                Yes
                              </label>
                            </div>
                          </div>
                          <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-primary">
                              SAVE
                            </button>
                            <button type="button" className="btn btn-secondary">
                              SUBMIT
                            </button>
                          </div>
                        </Col>
                      </div>
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </div>
      </Layouts>
    </React.Fragment>
  );
};
export default Benchmarking;
