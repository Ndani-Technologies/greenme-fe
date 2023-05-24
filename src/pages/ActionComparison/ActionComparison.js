import React from "react";
import Germany from "../../assets/images/Banchmarking/Germany-flag.png";
import John from "../../assets/images/Banchmarking/John.png";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import { Col } from "reactstrap";

const ActionComparison = () => {
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <ActionMain
          Title={"Recommended Actions - Comparison"}
          Text={
            "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
          }
        />
        <Col className="table-responsive table-card mt-5 w-100 ">
          <table className="table align-middle table-nowrap table-striped-columns mb-0">
            <tbody className="d-flex justify-content-between align-items-center">
              <thead>
                <th className="p-0">
                  <div className="trr top">
                    <tr></tr>
                  </div>
                  <div className="trr">
                    <tr>Action Title</tr>
                  </div>
                  <div className="trr">
                    <tr scope="col">Country</tr>
                  </div>
                  <div className="trr">
                    <tr scope="col">Num of Yes</tr>
                  </div>
                  <div className="trr">
                    <tr scope="col">Num of No</tr>
                  </div>
                  <div className="trr">
                    <tr scope="col">Num of I don’t know</tr>
                  </div>
                  <div className="trr">
                    <tr scope="col">Status</tr>
                  </div>
                  <div className="trr">
                    <tr scope="col">Duration</tr>
                  </div>
                  <div className="trr">
                    <tr scope="col">Level of completion %</tr>
                  </div>
                </th>
              </thead>
              <th>
                <div className="top">
                  <tr>
                    {" "}
                    <div className="d-flex align-items-center gap-2">
                      <img src={John} /> John Doe
                    </div>
                  </tr>
                </div>
                <div className="tr">
                  <tr>Benchmark Title 2</tr>
                </div>
                <div className="tr">
                  <tr>
                    {" "}
                    <div className="d-flex gap-2 align-items-center">
                      <span>
                        <img src={Germany} />
                      </span>{" "}
                      <span>Germany</span>
                    </div>
                  </tr>
                </div>
                <div className="tr">
                  <tr>15</tr>
                </div>
                <div className="tr">
                  <tr>06</tr>
                </div>
                <div className="tr">
                  <tr>10</tr>
                </div>
                <div className="tr">
                  <tr>Inprogress</tr>
                </div>
                <div className="tr">
                  <tr>Jan 11, 2017 </tr>
                </div>
                <div className="tr">
                  <tr>20%</tr>
                </div>
              </th>
              <th>
                <div className="top">
                  <tr>
                    {" "}
                    <div className="d-flex align-items-center gap-2">
                      <img src={John} /> John Doe
                    </div>
                  </tr>
                </div>
                <div className="tr">
                  <tr>Benchmark Title 2</tr>
                </div>
                <div className="tr">
                  <tr>
                    {" "}
                    <div className="d-flex gap-2 align-items-center">
                      <span>
                        <img src={Germany} />
                      </span>{" "}
                      <span>Germany</span>
                    </div>
                  </tr>
                </div>
                <div className="tr">
                  <tr>15</tr>
                </div>
                <div className="tr">
                  <tr>34</tr>
                </div>
                <div className="tr">
                  <tr>34</tr>
                </div>
                <div className="tr">
                  <tr>Inprogress</tr>
                </div>
                <div className="tr">
                  <tr>April 21, 2019</tr>
                </div>
                <div className="tr">
                  <tr>55%</tr>
                </div>
              </th>
              <th>
                <div className="top">
                  <tr>
                    {" "}
                    <div className="d-flex align-items-center gap-2">
                      <img src={John} /> John Doe
                    </div>
                  </tr>
                </div>
                <div className="tr">
                  <tr>Benchmark Title 3</tr>
                </div>
                <div className="tr">
                  <tr>
                    {" "}
                    <div className="d-flex gap-2 align-items-center">
                      <span>
                        <img src={Germany} />
                      </span>{" "}
                      <span>Germany</span>
                    </div>
                  </tr>
                </div>
                <div className="tr">
                  <tr>11</tr>
                </div>
                <div className="tr">
                  <tr>17</tr>
                </div>
                <div className="tr">
                  <tr>02</tr>
                </div>
                <div className="tr">
                  <tr>Completed</tr>
                </div>
                <div className="tr">
                  <tr>May 03, 2020 - June 15, 2021</tr>
                </div>
                <div className="tr">
                  <tr>100%</tr>
                </div>
              </th>
            </tbody>
          </table>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default ActionComparison;
