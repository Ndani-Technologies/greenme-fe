import React, { useState, useEffect, useCallback } from "react";
import { team } from "./cardData";
import { Col, Container, Row } from "reactstrap";

const LeaderBoardCards = () => {
  return (
    <div>
      <Row>
        {team.map((item) => {
          return (
            <Col className="profile-offcanvas p-0 " lg={4} xxl={3}>
              <div className="m-2 shadow-lg">
                <div className="team-cover">
                  <img src={item.backgroundImg} alt="" className="img-fluid" />
                </div>
                <div className="Card">
                  <img
                    src={item.userImage}
                    alt=""
                    className="avatar-lg img-thumbnail rounded-circle mx-auto mb-3"
                  />
                  <h5>{item.name}</h5>
                  <p className="mb-3">{item.userShortName}</p>
                  <Row className="text-muted text-start">
                    <Col xs={6} className="border-end border-end-dashed">
                      <h5 className="mb-1">{item.projectCount}</h5>
                      <p className="text-muted mb-0">
                        Leaderboard <br /> Position
                      </p>
                    </Col>
                    <Col className="text-center" xs={6}>
                      <h5 className="mb-1">197</h5>
                      <p className="text-muted  mb-0">
                        Leaderboard <br /> Points
                      </p>
                    </Col>
                    <div className="d-flex justify-content-between mt-3">
                      <p>Last seeen: {item.lastSeen}</p>
                      <div className="d-flex gap-3 justify-content-center w-50">
                        <i class="ri-phone-line"></i>
                        <i class="ri-question-answer-line"></i>
                        <i class="ri-mail-line"></i>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default LeaderBoardCards;
