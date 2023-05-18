import React from "react";
import Germany from "../../../assets/images/Banchmarking/Germany-flag.png";
import John from "../../../assets/images/Banchmarking/John.png";

const Comparison = () => {
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <div className="Main  mx-n4 mt-n4 w-100 Comparison">
          <h1>Benchmarking Comparison</h1>
          <p>
            This is a page where users can take self-assessment questionnaires
            and view their results. It will feature the ability for users to
            save progress and return to the assessment later as well as an
            option to skip or go back to previous questions. Also the option for
            the user to view their score and their benchmark results.
          </p>
        </div>
        <div className="table-responsive table-card mt-5 ">
          <table className="table align-middle table-nowrap table-striped-columns mb-0">
            <tbody className="d-flex justify-content-between align-items-center">
              <thead>
                <th className="p-0">
                  <div className="trr top">
                    <tr></tr>
                  </div>
                  <div className="trr">
                    <tr>Benchmark Title</tr>
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default Comparison;
