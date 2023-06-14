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
  UncontrolledDropdown,
} from "reactstrap";
import { StoreVisitsCharts } from "../DashboardEcommerce/DashboardEcommerceCharts";
import kenya from "../../assets/images/Banchmarking/Kenya.png";
import Select from "react-select";
import countryList from "react-select-country-list";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import Layouts from "../../Layouts";

const ActionAdminSummary = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <ActionMain
          Title={"Recommended Actions - Summary"}
          Text={
            "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
          }
        />
        <div
          className="d-flex justify-content-between align-items-center bg-white p-3 pt-4 pb-4 rounded"
          style={{ marginTop: "-20px", width: "98%" }}
        >
          <div className=" d-flex">
            <Label className="m-2">Filter by</Label>
            <div>
              <select disable className="form-select">
                <option hidden selected>
                  Organization
                </option>
              </select>
            </div>
          </div>
          <div>
            <select className="form-select">
              <option hidden selected>
                User
              </option>
              <option value="Choices1"> Nancy Martino</option>
              <option value="Choices1">Timothy Smith</option>
              <option value="Choices2">Michael Morris</option>
            </select>
          </div>
          <Col lg={2}>
            <Select
              placeholder="Country"
              options={options}
              value={value}
              onChange={changeHandler}
            />
          </Col>
          <span>
            <b>Full Name:</b> Timothy Smith
          </span>
          <div>
            <span>
              <b>Country:</b> Kenya
            </span>
            <img style={{ marginLeft: "8px", height: "13px" }} src={kenya} />
          </div>
          <span>
            <b>Org:</b> FleetMGT Co. C
          </span>
        </div>
        <div className=" mt-4 p-2 pb-0 pt-4" style={{ width: "98%" }}>
          <div className="d-flex gap-5 justify-content-center w-100 mt-4 pt-4 pb-3 border-top border-dark border-bottom border-dark">
            <Col xl={7} className="mt-2">
              <Col xl={12}>
                <div className="column">
                  <div className="d-flex justify-content-between align-items-center p-2">
                    <p className="m-0">Total number of action ASSIGNED</p>
                    <span>5/30</span>
                  </div>
                </div>
              </Col>
              <Col xl={12}>
                <div className="column">
                  <div className="d-flex justify-content-between align-items-center p-2 m-0">
                    <p className="m-0">Total number of actions NOT STARTED</p>
                    <span>10/30</span>
                  </div>
                </div>
              </Col>
              <Col xl={12}>
                <div className="column">
                  <div className="d-flex justify-content-between align-items-center p-2">
                    <p className="m-0">Total number of actions IN PROGRESS</p>
                    <span>12/30</span>
                  </div>
                </div>
              </Col>
              <Col xl={12}>
                <div className="column">
                  <div className="d-flex justify-content-between align-items-center p-2 m-0">
                    <p className="m-0">Total number of actions COMPLETED</p>
                    <span>8/30</span>
                  </div>
                </div>
              </Col>
              <Col xl={12}>
                <div className="column">
                  <div className="d-flex justify-content-between align-items-center p-2">
                    <p className="m-0">Total number of actions UNASSIGNED</p>
                    <span>2/30</span>
                  </div>
                </div>
              </Col>
              <Col xl={12}>
                <div className="column">
                  <div className="d-flex justify-content-between align-items-center p-2 m-0">
                    <p className="m-0">Total number of actions ATTEMPTED </p>
                    <span>22/30</span>
                  </div>
                </div>
              </Col>
            </Col>
            <Col xl={4}>
              <Card className="card-height-100 mt-2">
                <CardHeader className="align-items-center d-flex p-3">
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
                    <StoreVisitsCharts dataColors='["#6691E7", "#13C56B", "#E8BC52", "#ED5E5E", "#50C3E6"]' />
                  </div>
                </div>
              </Card>
            </Col>
          </div>
          <div className="d-flex align-items-center justify-content-between m-4 mt-4 mb-0 pb-3">
            <Card className=" border-none mt-3 w-50 bg-light">
              <CardBody className="p-0">
                <div className="d-flex align-items-center mb-2 mt-4">
                  <div className="flex-grow-1 d-flex justify-content-between w-100">
                    <h5 className="card-title mb-0">
                      <span>60% </span> Overall Benchmarking progress...
                    </h5>
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default ActionAdminSummary;
