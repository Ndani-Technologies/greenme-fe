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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

const CategoryModal = ({ modal, setModal, card }) => {
  console.log("-->", card);
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
        ></Button>
      </div>
      <ModalBody className="text-center">
        <CardBody>
          <div className="position-relative d-inline-block">
            <img
              src={card.Image}
              alt=""
              className="avatar-lg rounded-circle img-thumbnail"
            />
            <span className="contact-active position-absolute rounded-circle bg-success">
              <span className="visually-hidden"></span>
            </span>
          </div>
          <h5 className="mt-4 mb-1">{card.Name}</h5>
          <p className="text-muted">{card.Company}</p>
          <ul className="list-inline mb-0">
            <li className="list-inline-item avatar-xs">
              <Link
                to="#"
                className="avatar-title bg-soft-success text-success fs-15 rounded"
              >
                <i className="ri-phone-line"></i>
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
                to="/collaborationChat"
                className="avatar-title bg-soft-warning text-warning fs-15 rounded"
              >
                <i className="ri-question-answer-line"></i>
              </Link>
            </li>
          </ul>
        </CardBody>
        <CardBody>
          <div className="table-responsive table-card mt-3">
            <Col className="p-2">
              <div className="d-flex justify-content-between gap-3 text-start">
                <div className="text-center">
                  <h6> Leader Board points</h6>
                  <span>{card.boardPoints}</span>
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
                  <span>{card.totalPoints}</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <h6 className="mb-3 mt-3">Areas of Expertise</h6>
                <span>Fleet management</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <h6 className="m-0">Countries</h6>
                <div className="d-flex gap-3 ms-5 ps-2">
                  <div className="d-flex align-items-center gap-1 p-0">
                    <img src={card.Flag1} />
                    {card.Country1}
                  </div>
                  <div className="d-flex align-items-center gap-1 p-0">
                    <img src={card.Flag2} />
                    {card.Country2}
                  </div>
                  <div className="d-flex align-items-center gap-1 p-0">
                    <img src={card.Flag3} />
                    {card.Country3}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <h6 className="mb-0 me-3">Last Active</h6>
                <span className="ms-5">{card.Date}</span>
              </div>
            </Col>
          </div>
        </CardBody>
      </ModalBody>
    </Modal>
  );
};

export default CategoryModal;
