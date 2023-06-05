import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Col,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
  Button,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
} from "reactstrap";
import classnames from "classnames";
import Medal from "../../../assets/images/Medal-1.png";
import {
  category,
  cost,
  potential,
  resourceData,
  scale,
  tabContent,
  tabs,
  weight,
} from "./ActionModalData";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Warning from "../../../assets/images/warning.png";
const ActionModal = ({ modal_grid, setmodal_grid, Tabs }) => {
  const [open, isOpen] = useState(false);
  const [isWeight, setIsWeight] = useState(false);
  const [isCost, setIsCost] = useState(false);
  const [isScale, setIsScale] = useState(false);
  const [isPotential, setIsPotential] = useState(false);
  console.log("modal", modal_grid);

  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const handleClick = (language) => {
    setSelectedLanguage(language);
  };
  const [isChecked5, setIsChecked5] = useState(true);
  const [isChecked6, setIsChecked6] = useState(true);

  const handleCheckboxChange5 = (event) => {
    setIsChecked5(!isChecked5);
  };
  const handleCheckboxChange6 = (event) => {
    setIsChecked6(!isChecked6);
  };
  const [activeArrowTab, setactiveArrowTab] = useState(1);
  const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
  function toggleArrowTab(index) {
    if (activeArrowTab !== index) {
      var modifiedSteps = [...passedarrowSteps, index];

      setactiveArrowTab(index);
    }
  }
  const [isClick, setIsClick] = useState(0);
  const handleClicks = (index) => {
    setIsClick(index);
  };
  return (
    <>
      <Modal
        size="lg p-5"
        className="postion-relative m-0 float-end"
        isOpen={modal_grid} //null
        toggle={() => {
          tog_grid();
        }}
      >
        <div
          className="postion-absolute top-0 start-0 translate-middle bg-white rounded-circle d-flex justify-content-center align-items-center shadow-lg bg-body rounded"
          style={{ width: "35px", height: "35px" }}
        >
          <Button
            type="button"
            onClick={() => {
              setmodal_grid(false);
            }}
            className="btn-close color-black bg-white border border-dark rounded-circle "
            aria-label="close"
          ></Button>
        </div>
        <ModalHeader className="border-bottom border-dark p-4 pt-0">
          <h4 className="modal-title">Add Action</h4>
        </ModalHeader>
        <ModalBody>
          <form className="p-4 pt-2 pb-2" action="#">
            <div className="row g-3">
              <div className="p-0 d-flex align-items-center justify-content-between">
                <Col lg={7} className="border p-2">
                  Language Selector:
                  <div className="d-flex justify-content-between pt-2">
                    <Button
                      onClick={() => handleClick("ENGLISH")}
                      style={
                        selectedLanguage === "ENGLISH"
                          ? { backgroundColor: "#4A7BA4" }
                          : {
                              backgroundColor: "#E9EBEC",
                              border: "none",
                            }
                      }
                    >
                      ENGLISH
                    </Button>
                    <Button
                      onClick={() => handleClick("FRENCH")}
                      style={
                        selectedLanguage === "FRENCH"
                          ? { backgroundColor: "#4A7BA4" }
                          : {
                              backgroundColor: "#E9EBEC",
                              border: "none",
                            }
                      }
                    >
                      FRENCH
                    </Button>
                    <Button
                      onClick={() => handleClick("SPANISH")}
                      style={
                        selectedLanguage === "SPANISH"
                          ? { backgroundColor: "#4A7BA4" }
                          : {
                              backgroundColor: "#E9EBEC",
                              border: "none",
                            }
                      }
                    >
                      SPANISH
                    </Button>
                    <Button
                      onClick={() => handleClick("ARABIC")}
                      style={
                        selectedLanguage === "ARABIC"
                          ? { backgroundColor: "#4A7BA4" }
                          : {
                              backgroundColor: "#E9EBEC",
                              border: "none",
                              lineHeight: "-5px",
                            }
                      }
                    >
                      ARABIC
                    </Button>
                  </div>
                </Col>
                <div>
                  <div className="flex-shrink-0 border p-3 pt-1 pb-1 mb-2 rounded">
                    <div className="form-check form-switch form-switch-right form-switch-md ">
                      <Label
                        htmlFor="form-grid-showcode"
                        className="form-label text-muted"
                      >
                        Status:
                      </Label>
                      <Input
                        className="form-check-input code-switcher"
                        type="checkbox"
                        value="active"
                        checked={isChecked5}
                        onChange={handleCheckboxChange5}
                        style={{
                          backgroundColor: isChecked5 ? "#88C756" : "#fff",
                          width: "80px",
                          border: "0",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 border p-3 pt-1 pb-1 d-flex justify-content-end rounded">
                    <div className="form-check form-switch form-switch-right form-switch-md">
                      <Label
                        htmlFor="form-grid-showcode"
                        className="form-label text-muted"
                      >
                        Visibility:
                      </Label>
                      <Input
                        className="form-check-input code-switcher"
                        type="checkbox"
                        value="active"
                        checked={isChecked6}
                        onChange={handleCheckboxChange6}
                        style={{
                          backgroundColor: isChecked6 ? "#88c765" : "#fff",
                          width: "50px",
                          border: "0",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Col xxl={12} className="p-0">
                <div>
                  <Input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Title"
                  />
                </div>
              </Col>
              <Col xxl={12} className="p-0">
                <div>
                  <textarea
                    class="form-control"
                    placeholder="Discription"
                    id="floatingTextarea"
                    style={{
                      height: "120px",
                      overflow: "hidden",
                      backgroundColor: "#dfdfdf",
                    }}
                  ></textarea>
                </div>
              </Col>
              <Col xxl={12} className="p-0">
                <Card>
                  <CardHeader className="d-flex align-iteems-center justify-content-between">
                    <h5 className="mt-2">Action Steps</h5>
                    <div
                      className="avatar-title bg-soft-info text-info fs-17 rounded p-1"
                      style={{ width: "30px" }}
                    >
                      <i className="ri-add-line"></i>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Form className="form-steps">
                      <div className="step-arrow-nav mb-4">
                        <Nav
                          className="nav-pills custom-nav nav-justified"
                          role="tablist"
                        >
                          {tabs.map((tab) => (
                            <NavItem key={tab.id}>
                              <NavLink
                                href="#"
                                id={`steparrow-gen-info-tab-${tab.id}`}
                                // Assuming activeArrowTab is the active tab's ID
                                className={classnames({
                                  active: activeArrowTab === tab.id,
                                  done:
                                    activeArrowTab <= tab.id + 1 &&
                                    activeArrowTab > tab.id,
                                })}
                                onClick={() => {
                                  toggleArrowTab(tab.id);
                                }}
                              >
                                {tab.tab}
                              </NavLink>
                            </NavItem>
                          ))}
                        </Nav>
                      </div>

                      <TabContent activeTab={activeArrowTab}>
                        {tabs.map((tab) => (
                          <TabPane
                            key={tab.id}
                            id={`steparrow-gen-info-${tab.id}`}
                            tabId={tab.id}
                          >
                            {tab.id == 1 && (
                              <Col xxl={12} className="p-0 mb-2">
                                <label>Add Title</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  placeholder="Title"
                                />
                                <div className=" d-flex gap-1 text-success">
                                  <div>
                                    <i class="ri-error-warning-line"></i>
                                  </div>
                                  <span>
                                    Please not to enter the words 'Step X', this
                                    will be generated by the system.
                                  </span>
                                </div>
                              </Col>
                            )}
                            {tab.id == 2 && (
                              <Col xxl={12} className="p-0 mb-2">
                                <label>Add Discription</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  placeholder="Discription"
                                />
                                <div className=" d-flex gap-1 text-success">
                                  <div>
                                    <i class="ri-error-warning-line"></i>
                                  </div>
                                  <span>
                                    Please not to enter the words 'Step X', this
                                    will be generated by the system.
                                  </span>
                                </div>
                              </Col>
                            )}
                            {tab.id == 3 && (
                              <Col xxl={12} className="p-0 mb-2">
                                <label>Add Value</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  placeholder="Value"
                                />
                                <div className=" d-flex gap-1 text-success">
                                  <div>
                                    <i class="ri-error-warning-line"></i>
                                  </div>
                                  <span>
                                    Please not to enter the words 'Step X', this
                                    will be generated by the system.
                                  </span>
                                </div>
                              </Col>
                            )}
                            <Col className="d-flex justify-content-between">
                              <div className="text-end mb-4">
                                <button className="btn btn-light btn-label left ms-auto">
                                  <i className="ri-arrow-left-line label-icon align-bottom fs-16 "></i>{" "}
                                  Back
                                </button>
                              </div>
                              <div className="text-end mb-4">
                                <button className="btn btn-info btn-label right ms-auto">
                                  <i className="ri-arrow-right-line label-icon align-bottom fs-16 ms-2"></i>{" "}
                                  Next
                                </button>
                              </div>
                            </Col>
                            {tab.id &&
                              tabContent.map((item) => {
                                return (
                                  <>
                                    <div className="border rounded mb-2 p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center">
                                      <div className="d-flex align-items-center justify-content-beetween w-100">
                                        <div className="d-flex align-items-center gap-2">
                                          <i
                                            className="ri-drag-move-2-line fs-24"
                                            style={{ color: "#4A7BA4" }}
                                          ></i>
                                          <h5 className="m-0">
                                            {item.content}
                                          </h5>
                                        </div>
                                        <div className="d-flex gap-2 justify-content-end w-25  mt-1">
                                          <img src={Medal} />
                                          20
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-end gap-2 w-25">
                                        <i
                                          className="ri-pencil-fill fs-18"
                                          style={{ color: "gray" }}
                                          // onClick={() => handleEdit(category.id)}
                                        ></i>
                                        <i
                                          className="ri-delete-bin-2-line fs-18"
                                          style={{ color: "red" }}
                                          // onClick={() => handleDelete(category.id)}
                                        ></i>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                          </TabPane>
                        ))}
                      </TabContent>
                    </Form>
                  </CardBody>
                </Card>
              </Col>

              <Col lg={12} className="border rounded p-0 bg-white">
                <Col className="p-3 border  rounded" lg={12}>
                  Manage Resource Links
                </Col>
                <Col className="p-3">
                  {resourceData.map((item) => {
                    return (
                      <div className="border rounded mb-2 p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i
                            className="ri-drag-move-2-line fs-24"
                            style={{ color: "#4A7BA4" }}
                          ></i>
                          <h5 className="m-0">{item.data}</h5>
                        </div>
                        <div className="d-flex justify-content-end gap-2 w-25">
                          <i
                            className="ri-pencil-fill fs-18"
                            style={{ color: "gray" }}
                          ></i>
                          <i
                            className="ri-delete-bin-2-line fs-18"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                  <Col xxl={12}>
                    <div>
                      <div className="form-icon right">
                        <Input
                          type="text"
                          className="form-control form-control-icon"
                          id="iconrightInput"
                          placeholder="Manage Resource link"
                        />
                        <i className="ri-add-line"></i>
                      </div>
                    </div>
                  </Col>
                </Col>
              </Col>
              <Col lg={12} className="d-flex justify-content-between">
                <Col lg={5} className="p-0 ">
                  <Col
                    lg={5}
                    onClick={() => isOpen(!open)}
                    disable
                    className="form-select "
                  >
                    Select a category
                  </Col>
                  <div style={{ position: "relative" }}>
                    {open && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey "
                      >
                        {category.map((item) => {
                          return (
                            <li
                              onClick={() => handleClicks(item.id)}
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                isClick === item.id
                                  ? {
                                      backgroundColor: "#C3C887",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {item.list}
                            </li>
                          );
                        })}
                      </Col>
                    )}
                  </div>
                </Col>
                <Col lg={5} className="p-0 ">
                  <Col
                    lg={5}
                    onClick={() => setIsWeight(!isWeight)}
                    disable
                    className="form-select "
                  >
                    Select Weight
                    <i class="fa fa-window-maximize" aria-hidden="true"></i>
                  </Col>
                  <div style={{ position: "relative" }}>
                    {isWeight && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey "
                      >
                        {weight.map((item) => {
                          return (
                            <li
                              onClick={() => handleClicks(item.id)}
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                isClick === item.id
                                  ? {
                                      backgroundColor: "#C3C887",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {item.list}
                            </li>
                          );
                        })}
                      </Col>
                    )}
                  </div>
                </Col>
              </Col>
              <Col className="d-flex gap-2 mt-2">
                <Col lg={4} className="p-0 ">
                  <Col
                    lg={4}
                    onClick={() => setIsCost(!isCost)}
                    disable
                    className="form-select "
                  >
                    Select a cost
                    <i class="fa fa-window-maximize" aria-hidden="true"></i>
                  </Col>
                  <div style={{ position: "relative" }}>
                    {isCost && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey "
                      >
                        {cost.map((item) => {
                          return (
                            <li
                              onClick={() => handleClicks(item.id)}
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                isClick === item.id
                                  ? {
                                      backgroundColor: "#C3C887",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {item.list}
                            </li>
                          );
                        })}
                      </Col>
                    )}
                  </div>
                </Col>
                <Col lg={4} className="p-0 ">
                  <Col
                    lg={4}
                    onClick={() => setIsScale(!isScale)}
                    disable
                    className="form-select "
                  >
                    Select Timescale
                    <i class="fa fa-window-maximize" aria-hidden="true"></i>
                  </Col>
                  <div style={{ position: "relative" }}>
                    {isScale && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey "
                      >
                        {scale.map((item) => {
                          return (
                            <li
                              onClick={() => handleClicks(item.id)}
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                isClick === item.id
                                  ? {
                                      backgroundColor: "#C3C887",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {item.list}
                            </li>
                          );
                        })}
                      </Col>
                    )}
                  </div>
                </Col>
                <Col lg={4} className="p-0 ">
                  <Col
                    lg={4}
                    onClick={() => setIsPotential(!isPotential)}
                    disable
                    className="form-select "
                  >
                    Select a cost
                    <i class="fa fa-window-maximize" aria-hidden="true"></i>
                  </Col>
                  <div style={{ position: "relative" }}>
                    {isPotential && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey "
                      >
                        {potential.map((item) => {
                          return (
                            <li
                              onClick={() => handleClicks(item.id)}
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                isClick === item.id
                                  ? {
                                      backgroundColor: "#C3C887",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {item.list}
                            </li>
                          );
                        })}
                      </Col>
                    )}
                  </div>
                </Col>
              </Col>
              <div className="col-lg-12 d-flex gap-3">
                <div className="hstack gap-2 justify-content-start">
                  <Button className="btn btn-danger p-4 pt-2 pb-2">
                    Cancel
                  </Button>
                </div>
                <div className="hstack gap-2 justify-content-start">
                  <Button className="p-4 pt-2 pb-2" color="secondary">
                    Save
                  </Button>
                </div>
                <Button color="primary">Update</Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ActionModal;
