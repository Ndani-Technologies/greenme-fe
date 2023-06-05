import React, { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { BasicColumn, ColumnMarker } from "../ColumnCharts/ColumnCharts";
import { StoreVisitsCharts } from "../DashboardEcommerce/DashboardEcommerceCharts";
import { CircleRadialbar } from "../RadialbarCharts/RadialbarCharts";
import { PieChart } from "../ECharts/ECharts";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import Layouts from "../../Layouts";

const AdminReport = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };
  const [startDate, setStartDate] = useState(null);

  const handleDateChange = (date) => {
    setStartDate(date);
  };
  return (
    <React.Fragment>
      <div className="page-content overflow-hidden ">
        <ActionMain Title={"Recommended Actions - Report"} />
        <div className="card" style={{ width: "98%" }}>
          <div className="d-flex">
            <div className="d-flex justify-content-between w-25 border-end custom-padding">
              <div>
                <span className="fs-7">Total number of action</span>
                <div>
                  <span className="span">ASSIGNED</span>
                </div>
                <div>
                  <span className="fs-3">5/30</span>
                </div>
              </div>
              <i
                class="ri-arrow-up-circle-line"
                style={{ color: "#13C56B" }}
              ></i>
            </div>
            <div className="d-flex justify-content-between w-25 border-end p-15  custom-padding">
              <div>
                <span className="fs-7">Total number of action</span>
                <div>
                  <span className="span">NOT STARTED</span>
                </div>
                <div>
                  <span className="fs-3">10/30</span>
                </div>
              </div>
              <i
                class="ri-arrow-up-circle-line"
                style={{ color: "#13C56B" }}
              ></i>
            </div>
            <div className="d-flex justify-content-between w-25 border-end custom-padding ">
              <div>
                <span className="fs-7">Total number of action</span>
                <div>
                  <span className="span">IN PROGRESS</span>
                </div>
                <div>
                  <span className="fs-3">6/30</span>
                </div>
              </div>
              <i
                class="ri-arrow-down-circle-line"
                style={{ color: "#FF7F47" }}
              ></i>
            </div>
            <div className="d-flex justify-content-between w-25 border-end custom-padding ">
              <div>
                <span className="fs-7">Total number of action</span>
                <div>
                  <span className="span">COMPLETED</span>
                </div>
                <div>
                  <span className="fs-3">8/30</span>
                </div>
              </div>
              <i
                class="ri-arrow-up-circle-line"
                style={{ color: "#13C56B" }}
              ></i>
            </div>
            <div className="d-flex justify-content-between w-25 custom-padding border-end custom-padding ">
              <div>
                <span className="fs-7">Total number of action</span>
                <div>
                  <span className="span">UNASSIGNED</span>
                </div>
                <div>
                  <span className="fs-3">2/30</span>
                </div>
              </div>
              <i
                class="ri-arrow-down-circle-line"
                style={{ color: "#FF7F47" }}
              ></i>
            </div>
            <div className="d-flex justify-content-between w-25 custom-padding custom-padding ">
              <div>
                <span className="fs-7">Total number of action</span>
                <div>
                  <span className="span">ATTEMPTED</span>
                </div>
                <div>
                  <span className="fs-3">22/30</span>
                </div>
              </div>
              <i
                class="ri-arrow-up-circle-line"
                style={{ color: "#13C56B" }}
              ></i>
            </div>
          </div>
        </div>
        <Col className="bg-white  p-2" style={{ width: "98%" }}>
          <Col className="d-flex justify-content-between">
            <Col lg={2}>
              <div className="mb-5">
                <select className="form-select mb-3">
                  <option hidden selected>
                    User
                  </option>
                  <option value="Choices1"> Nancy Martino</option>
                  <option value="Choices1">Timothy Smith</option>
                  <option value="Choices2">Michael Morris</option>
                </select>
              </div>
            </Col>
            <Col lg={2}>
              <div className="mb-5">
                <select disable className="form-select mb-3">
                  <option hidden selected>
                    Organization
                  </option>
                </select>
              </div>
            </Col>
            <Col lg={2}>
              <Select
                placeholder="Country"
                options={options}
                value={value}
                onChange={changeHandler}
              />
            </Col>
            <Col lg={2}>
              <DatePicker
                className="form-select mb-3"
                selected={startDate}
                onChange={handleDateChange}
                placeholderText="Start Date"
              />
            </Col>
            <Col lg={2}>
              <DatePicker
                className="form-select mb-3"
                selected={startDate}
                onChange={handleDateChange}
                placeholderText="End Date"
              />
            </Col>
          </Col>
          <Col className="d-flex gap-2">
            <Col lg={5}>
              <Card className="pb-3">
                <CardHeader>
                  <h4 className="card-title mb-0 ">
                    Average spent on actions, by category (monthly)
                  </h4>
                </CardHeader>
                <CardBody>
                  <BasicColumn dataColors='["--vz-red", "--vz-primary", "--vz-green"]' />
                </CardBody>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="pb-3">
                <CardHeader>
                  <h4 className="card-title mb-0">
                    Total time spent on actions, by category
                  </h4>
                </CardHeader>
                <CardBody>
                  <ColumnMarker dataColors='["--vz-info", "--vz-primary"]' />
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="card-height-100 pb-3">
                <CardHeader className="align-items-center d-flex p-3 ">
                  <h4 className="card-title mb-0 flex-grow-1">View Graph</h4>
                  <div className="flex-shrink-0">
                    <UncontrolledDropdown
                      className="card-header-dropdown"
                      direction="start"
                    >
                      <DropdownToggle
                        tag="a"
                        className="text-reset dropdown-btn"
                        role="button"
                      >
                        <span className="text-muted">
                          Report<i className="mdi mdi-chevron-down ms-1"></i>
                        </span>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>Download Report</DropdownItem>
                        <DropdownItem>Export</DropdownItem>
                        <DropdownItem>Import</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </CardHeader>

                <div className="card-body">
                  <div dir="ltr">
                    <StoreVisitsCharts dataColors='["#5DCA29", "#770909", "#212529", "#772D2D", "#8B1C8D", "#8B1C8D","#8B1C8D"]' />
                  </div>
                </div>
              </Card>
            </Col>
          </Col>
          <Col className="d-flex gap-2">
            <Col lg={3}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">
                    Total point earned from all actions
                  </h4>
                </CardHeader>
                <CardBody>
                  <CircleRadialbar dataColors='["#50C3E6",  "--vz-danger", "#13C56B"]' />
                </CardBody>
              </Card>
            </Col>
            <Col lg={3}>
              <Card style={{ height: "391px" }}>
                <CardHeader>
                  <h4 className="card-title mb-0">
                    showing the distribution of points earned per question
                    category
                  </h4>
                </CardHeader>
                <div className="card-body">
                  <PieChart dataColors='["#6691E7", "#13C56B", "#E8BC52", "#ED5E5E", "#50C3E6"]' />
                </div>
              </Card>
            </Col>
            <Row className="d-flex gap-2">
              <Col className="p-1">
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">
                          Total time spent on actions
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          {/* <span className="counter-value" data-target="97.66">
                            <CountUp
                              
                              start={0}
                              end={97.66}
                              decimals={2}
                              duration={4}
                            />
                          </span> */}
                          3days: 4hrs
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-info rounded-circle fs-2">
                            <FeatherIcon
                              icon="activity"
                              className="text-info"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">
                          Average time spent per action
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          {/* <span className="counter-value" data-target="97.66">
                            <CountUp
                              
                              start={0}
                              end={97.66}
                              decimals={2}
                              duration={4}
                            />
                          </span> */}
                          4hrs
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-info rounded-circle fs-2">
                            <FeatherIcon
                              icon="activity"
                              className="text-info"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="card-animate">
                  <CardBody>
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="fw-medium text-muted mb-0">
                            Total time spent on actions
                          </p>
                          <h2 className="mt-1 ff-secondary fw-semibold">
                            {/* <span className="counter-value" data-target="97.66">
                            <CountUp
                              
                              start={0}
                              end={97.66}
                              decimals={2}
                              duration={4}
                            />
                          </span> */}
                            12
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-info rounded-circle fs-2">
                              <FeatherIcon
                                icon="activity"
                                className="text-info"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="m-0">To all users</p>
                    </div>
                  </CardBody>
                </Card>
                <div className="d-flex align-items-center pb-3">
                  <Card className=" border-none m-2 ml-0 mt-0 mb-0 pt-2 pb-2 bg-light">
                    <CardBody className="p-0">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 d-flex justify-content-between mr-2 w-100">
                          <span className="card-title mb-0">
                            <span>53%</span> Overall Benchmarking progress...
                          </span>
                        </div>
                      </div>
                      <div className="progress animated-progress custom-progress progress-label mt-3">
                        <div
                          className="progress-bar bg- "
                          role="progressbar"
                          style={{ width: "53%" }}
                          aria-valuenow="30"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="hstack gap-2 justify-content-end">
                    <button type="button" className="btn btn-secondary">
                      REFRESH
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default AdminReport;
