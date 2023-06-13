import React, { useState } from "react";
import { Col, Card, CardBody, Table, Row } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
const TableCard = () => {
  const location = useLocation();
  const { data } = location?.state;
  console.log("data", data);
  return (
    <div>
      <React.Fragment>
        <div className="page-content overflow-auto ">
          <Row lg={12} className="d-flex">
            {data &&
              data.map((item) => {
                return (
                  <Col lg={4} className="pb-2">
                    <Card id="contact-view-detail">
                      <CardBody className="text-center">
                        <div className="position-relative d-inline-block">
                          <img
                            src={item?.Image}
                            alt=""
                            className="avatar-lg rounded-circle img-thumbnail"
                          />
                          <span className="contact-active position-absolute rounded-circle bg-success">
                            <span className="visually-hidden"></span>
                          </span>
                        </div>
                        <h5 className="mt-4 mb-1">{item.name}</h5>
                        <p className="text-muted">{item.Orgnaisation}</p>

                        <ul className="list-inline mb-0">
                          <li className="list-inline-item avatar-xs">
                            <Link
                              to="#"
                              className="avatar-title bg-soft-success text-success fs-15 rounded"
                            >
                              <i class="ri-phone-line"></i>
                            </Link>
                          </li>
                          <li className="list-inline-item avatar-xs">
                            <Link
                              to="#"
                              className="avatar-title bg-soft-danger text-danger fs-15 rounded"
                            >
                              <i className="ri-mail-line"></i>
                            </Link>
                          </li>
                          <li className="list-inline-item avatar-xs">
                            <Link
                              to="#"
                              className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                            >
                              <i className="ri-question-answer-line"></i>
                            </Link>
                          </li>
                        </ul>
                      </CardBody>
                      <CardBody>
                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                          Personal itemrmation
                        </h6>
                        <p className="text-muted mb-4">
                          Hello, I'm {item.name || "Tonya Noble"}, The most
                          effective objective is one that is tailored to the job
                          you are applying for. It states what kind of career
                          you are seeking, and what skills and experiences.
                        </p>
                        <div className="table-responsive table-card">
                          <Table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td className="fw-medium">Designation</td>
                                <td>{item?.Position}</td>
                              </tr>
                              <tr>
                                <td className="fw-medium">Email ID</td>
                                <td>{item?.email}</td>
                              </tr>
                              <tr>
                                <td className="fw-medium">Phone No</td>
                                <td>{item?.phone}</td>
                              </tr>
                              <tr>
                                <td className="fw-medium">Lead Score</td>
                                <td>{item.lead_score}</td>
                              </tr>
                              <tr>
                                <td className="fw-medium">Tags</td>
                                <td>{item?.tags}</td>
                              </tr>
                              <tr>
                                <td className="fw-medium">Last Contacted</td>
                                <td>{item.last_contacted}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </React.Fragment>
    </div>
  );
};

export default TableCard;
