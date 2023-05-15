import React from "react";
import Layouts from "../../Layouts";
import Germany from "../../assets/images/Banchmarking/Germany-flag.png";
import John from "../../assets/images/Banchmarking/John.png";
import { Col } from "reactstrap";

const QAComparison = () => {
  return (
    <React.Fragment>
      <Layouts>
        <div className="page-content overflow-auto ">
          <div className="Main  mx-n4 mt-n4 w-100 Comparison">
            <h1>Benchmarking Q&A Comparison</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Aliquam placerat enim
              tristique nulla egestas vulputate quis. Eget id erat eget
              dignissim nisl nam magna elementum turpis. Odio nisi ultrices
              malesuada non mauris id quisque. Tempus et in facilisis leo. Et
              faucibus tristique amet suscipit pellentesque nunc. Ut tortor
              massa quam cras neque id neque vitae. Vitae interdum molestie sit
              egestas senectus.
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
                <th>
                  <div className="top">
                    <tr>One</tr>
                  </div>
                  <div className="tr">
                    <tr>
                      Does your organisation <br /> have environmental
                      commitments?
                    </tr>
                  </div>
                  <div className="tr">
                    <tr>15</tr>
                  </div>
                  <div className="tr">
                    <tr>In Active</tr>
                  </div>
                  <div className="tr">
                    <tr>Genral</tr>
                  </div>
                </th>
                <th>
                  <div className="top">
                    <tr>Two</tr>
                  </div>
                  <div className="tr">
                    <tr>
                      Does your organisation <br /> have a ‘green’ strategy?
                    </tr>
                  </div>
                  <div className="tr">
                    <tr>15</tr>
                  </div>
                  <div className="tr">
                    <tr>InActive</tr>
                  </div>
                  <div className="tr">
                    <tr>Genral</tr>
                  </div>
                </th>
                <th>
                  <div className="top">
                    <tr>Three</tr>
                  </div>
                  <div className="tr">
                    <tr>
                      Do you use sustainability <br /> criteria to assess/
                      select suppliers?
                    </tr>
                  </div>
                  <div className="tr">
                    <tr>15</tr>
                  </div>
                  <div className="tr">
                    <tr>Active</tr>
                  </div>
                  <div className="tr">
                    <tr>Genral</tr>
                  </div>
                </th>
                <th>
                  <div className="top">
                    <tr>Four</tr>
                  </div>
                  <div className="tr">
                    <tr>
                      Do you have standardised <br />
                      fleet procurement.
                    </tr>
                  </div>
                  <div className="tr">
                    <tr>15</tr>
                  </div>
                  <div className="tr">
                    <tr>Active </tr>
                  </div>
                  <div className="tr">
                    <tr>Genral</tr>
                  </div>
                </th>
              </tbody>
            </table>
          </Col>
        </div>
      </Layouts>
    </React.Fragment>
  );
};

export default QAComparison;
