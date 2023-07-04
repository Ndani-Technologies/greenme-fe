import React, { useState } from "react";
import {
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CardBody,
  Table,
} from "reactstrap";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link, useNavigate } from "react-router-dom";
import Tanzania from "../../../src/assets/images/Tanzania.png";
import Kenya from "../../assets/images/Kenya-1.png";
import moment from "moment";
import { useDispatch } from "react-redux";
import { storeChosenChatDetails } from "../../slices/thunks";

const CategoryModal = ({ modal, setModal, card }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("authUser"));
  const createdAt = card.createdAt;
  const formattedTime = moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");

  // Calculate the time difference
  const now = moment();
  const diffDuration = moment.duration(now.diff(createdAt));
  const days = diffDuration.asDays();
  const weeks = diffDuration.asWeeks();
  const months = diffDuration.asMonths();
  const years = diffDuration.asYears();

  let timeAgo;
  if (days <= 1) {
    timeAgo = `${Math.floor(diffDuration.asHours())} hours ago`;
  } else if (weeks <= 1) {
    timeAgo = `${Math.floor(days)} days ago`;
  } else if (months <= 1) {
    timeAgo = `${Math.floor(weeks)} weeks ago`;
  } else if (years <= 1) {
    timeAgo = `${Math.floor(months)} months ago`;
  } else {
    timeAgo = `${Math.floor(years)} years ago`;
  }
  return (
    <Modal size="md p-5" className="postion-relative" isOpen={modal}>
      <div
        className="postion-absolute top-0 start-0 translate-middle bg-white rounded-circle d-flex justify-content-center align-items-center shadow-lg bg-body rounded"
        style={{ width: "35px", height: "35px" }}
      >
        <Button
          type="button"
          onClick={() => {
            setModal(false);
          }}
          className="btn-close color-black bg-white border border-dark rounded-circle "
          aria-label="close"
        />
      </div>
      <ModalBody className="text-center">
        <CardBody>
          <div className="position-relative d-inline-block">
            <img
              src={card.profilePic}
              alt=""
              className="avatar-lg rounded-circle img-thumbnail"
            />
            <span className="contact-active position-absolute rounded-circle bg-success">
              <span className="visually-hidden" />
            </span>
          </div>
          <h5 className="mt-4 mb-1">
            {card.firstName} {card.lastName}
          </h5>
          <p className="text-muted">{card.organization}</p>
          <ul className="list-inline mb-0">
            <li className="list-inline-item avatar-xs">
              <Link
                to="#"
                className="avatar-title bg-soft-success text-success fs-15 rounded"
              >
                <i className="ri-phone-line" />
              </Link>
            </li>
            <li className="list-inline-item avatar-xs">
              <Link
                to="#"
                className="avatar-title bg-soft-danger text-danger fs-15 rounded"
              >
                <i className="ri-mail-line" />
              </Link>
            </li>
            <li className="list-inline-item avatar-xs">
              <div
                className="avatar-title bg-soft-warning text-warning fs-15 rounded cursor-pointer"
                onClick={() => {
                  navigate("/collaborationChat");
                  if (user) {
                    dispatch(
                      storeChosenChatDetails({
                        author: user._id,
                        receiver: card._id,
                        receiverProfilePicture: card.profilePic,
                        receiverFullName: card.firstName + card.lastName,
                      })
                    );
                  }
                }}
              >
                <i className="ri-question-answer-line" />
              </div>
            </li>
          </ul>
        </CardBody>
        <CardBody>
          <div className="table-responsive table-card mt-3">
            <Col className="p-2">
              <div className="d-flex justify-content-between gap-3 text-start">
                <div className="text-center">
                  <h6> Leader Board points</h6>
                  <span>{card.leaderboardPosition}</span>
                </div>
                <div className="text-center">
                  <h6> Action</h6>
                  <span>{card.actionPoints}</span>
                </div>
                <div className="text-center">
                  <h6> Discussion</h6>
                  <span>{card.discussionPoints}</span>
                </div>
                <div className="text-center">
                  <h6> Collaboration</h6>
                  <span>{card.collaborationPoints}</span>
                </div>
                <div className="text-center">
                  <h6> Total</h6>
                  <span>{card.totalPoint}</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <h6 className="mb-3 mt-3">{card.organization}</h6>
                <span>Fleet management</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <h6 className="m-0">Countries</h6>
                <div className="d-flex gap-3 ms-5 ps-2">
                  <div className="d-flex align-items-center gap-1 p-0">
                    <img src={Kenya} />
                    {card.country}
                  </div>
                  {card?.otherCountries?.map((country) => {
                    return (
                      <div className="d-flex align-items-center gap-1 p-0">
                        <img src={Tanzania} />
                        {country}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <h6 className="mb-0 me-3">Last Active</h6>
                <span className="ms-5">{formattedTime}</span>
              </div>
            </Col>
          </div>
        </CardBody>
      </ModalBody>
    </Modal>
  );
};

export default CategoryModal;
