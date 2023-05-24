import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { StoreVisitsCharts } from "../DashboardEcommerce/DashboardEcommerceCharts";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import Layouts from "../../Layouts";
const ActionUserSummary = () => {
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <ActionMain
          Title={"Recommended Actions - Summary"}
          Text={
            "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
          }
        />
        <div className="bg-white p-2 pb-0 pt-4">
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
                    <StoreVisitsCharts dataColors='["--vz-primary-rgb, 0.90", "--vz-secondary-rgb, 0.85", "--vz-primary-rgb, 0.40",   "--vz-topbar-search-bg","--vz-primary-rgb, 0.75","--vz-primary-rgb, 0.75"]' />
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

export default ActionUserSummary;
