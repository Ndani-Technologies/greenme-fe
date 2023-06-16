import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { getSingleAction } from "../../slices/thunks";

const LeaderBoardCards = ({ allUsers }) => {
  console.log(allUsers, "USWERS");

  const [extractedDate, setExtractedDate] = useState();
  useEffect(() => {
    allUsers.forEach((user) => {
      getSingleAction(user._id)
        .then((res) => {
          const dateTimeString = res?.toString();
          const date = new Date(dateTimeString);
          const extractedDate = date?.toISOString().split("T")[0];
          setExtractedDate(extractedDate);
        })
        .catch((err) => console.log(err, "Unable to get Data"));
    });
  }, [allUsers]);

  return (
    <div>
      <Row>
        {allUsers.map((user) => {
          const firstInitial = user.firstName ? user.firstName[0] : "";

          // Get the first letter of the last name
          const lastInitial = user.lastName ? user.lastName[0] : "";

          // Create the nickname by combining the initials
          const nickname = firstInitial + lastInitial;

          return (
            <Col className="profile-offcanvas p-0 " lg={4} xxl={3}>
              <div className="m-2 shadow-lg">
                <div className="team-cover">
                  <img src={user.backgroundPic} alt="" className="img-fluid" />
                </div>
                <div className="Card">
                  <img
                    src={user.profilePic}
                    alt=""
                    className="avatar-lg img-thumbnail rounded-circle mx-auto mb-3"
                  />
                  <h5>{user.firstName}</h5>
                  <p className="mb-3">{nickname}</p>
                  <Row className="text-muted text-start">
                    <Col xs={6} className="border-end border-end-dashed">
                      {/* <h5 className="mb-1">{singleAction && singleAction}</h5> */}
                      <p className="text-muted mb-0">
                        Leaderboard <br /> Position:{user.leaderboardPosition}
                      </p>
                    </Col>
                    <Col className="text-center" xs={6}>
                      <h5 className="mb-1">197</h5>
                      <p className="text-muted  mb-0">
                        Leaderboard <br /> Points
                      </p>
                    </Col>
                    <div className="d-flex justify-content-between mt-3">
                      <p>Last Updated: {extractedDate}</p>
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
