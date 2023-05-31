import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import Layouts from "../../Layouts";
import { getQAComparison } from "../../slices/thunks";

const QAComparison = () => {
  const [checkedQA, setCheckedQA] = useState([]);
  const location = useLocation();
  const getCheckedQA = () => {
    getQAComparison(location.state)
      .then((resp) => {
        setCheckedQA(resp);
      })
      .catch((err) => console.error(err, "error in bench adminSummary"));
  };
  useEffect(() => {
    getCheckedQA();
  }, []);

  console.log(checkedQA, "CHECKED QA");

  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <div className="Main  mx-n4 mt-n4 w-100 Comparison">
          <h1>Benchmarking Q&A Comparison</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Aliquam placerat enim
            tristique nulla egestas vulputate quis. Eget id erat eget dignissim
            nisl nam magna elementum turpis. Odio nisi ultrices malesuada non
            mauris id quisque. Tempus et in facilisis leo. Et faucibus tristique
            amet suscipit pellentesque nunc. Ut tortor massa quam cras neque id
            neque vitae. Vitae interdum molestie sit egestas senectus.
          </p>
        </div>
        <Col className="table-responsive table-card mt-5 w-100 ">
          <table className="table align-middle table-nowrap table-striped-columns mb-0">
            <tbody className="d-flex justify-content-between align-items-center">
              <thead>
                <th className="p-0">
                  <div className="trr top">
                    <tr></tr>
                  </div>
                  <div className="trr pt-4">
                    <tr>Question Title</tr>
                  </div>
                  <div className="trr pt-5">
                    <tr scope="col">% reponses</tr>
                  </div>
                  <div className="trr">
                    <tr scope="col">Status</tr>
                  </div>
                  <div className="trr">
                    <tr scope="col">Category</tr>
                  </div>
                </th>
              </thead>
              {checkedQA.map((question, index) => (
                <tr key={index}>
                  <th>
                    <div className="top">{index + 1}</div>
                    <div className="tr">
                      <div>{question.title}</div>
                    </div>
                    <div className="tr">
                      <div>{question.responses}</div>
                    </div>
                    <div className="tr">
                      <div>{question.status}</div>
                    </div>
                    <div className="tr">
                      <div>{question.category}</div>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default QAComparison;
