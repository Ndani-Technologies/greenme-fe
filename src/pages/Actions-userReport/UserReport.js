import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import Layouts from "../../Layouts";
import { BasicColumn, ColumnMarker } from "../ColumnCharts/ColumnCharts";

const UserReport = () => {
  return (
    <React.Fragment>
      <Layouts>
        <div className="page-content overflow-auto ">
          <div className="Main mx-n4 mt-n4 w-100">
            <h1>Recommended Actions - Report</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus
              vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus
              mattis urna adipiscing dolor nam sem sit vel netus. Egestas
              vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt
              sit turpis est dolor convallis viverra enim aliquet euismod.{" "}
            </p>
          </div>
          <div className="card">
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
          <Col className="d-flex">
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">
                    Average spent on actions, by category (monthly)
                  </h4>
                </CardHeader>
                <CardBody>
                  <BasicColumn dataColors='["--vz-red", "--vz-primary", "--vz-green"]' />
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card>
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
          </Col>
        </div>
      </Layouts>
    </React.Fragment>
  );
};

export default UserReport;
