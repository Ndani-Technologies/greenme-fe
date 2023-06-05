import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Col,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";

const RelationModal = ({ modal_grid, setmodal_grid }) => {
  const [select, setSelect] = useState(false);
  const [list, setList] = useState(false);
  const [open, isOpen] = useState(false);
  const [lists, setLists] = useState(false);
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
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
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
          <div className="p-0 d-flex align-items-center justify-content-between gap-3">
            <h4 className="modal-title">Add New Relationship</h4>
            <div className="flex-shrink-0 border p-3 pt-1 pb-1 d-flex justify-content-end rounded">
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
                    border: "1px solid #CED4DA",
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
                    border: "1px solid #CED4DA",
                  }}
                />
              </div>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="p-4 pt-2 pb-2" action="#">
            <Col className="border border-grey rounded mb-3">
              <Col xxl={12} className="p-0">
                <Col
                  lg={12}
                  onClick={() => setList(!list)}
                  disable
                  className="form-select"
                >
                  Select Benchmark Questions
                </Col>
                {list && (
                  <ul className="p-3 m-0">
                    <li
                      value="Choices1"
                      onClick={() => handleClicks(1)}
                      className="list-unstyled border border-grey p-2 rounded d-flex gap-3 fs-5 mb-2"
                      style={
                        isClick === 1
                          ? {
                              backgroundColor: "#C7D7E3",
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
                      {" "}
                      Does your organisation have environmental commitments?
                    </li>
                    <li
                      value="Choices1"
                      onClick={() => handleClicks(2)}
                      className="list-unstyled border border-grey p-2 rounded d-flex gap-3 fs-5 mb-2"
                      style={
                        isClick === 2
                          ? {
                              backgroundColor: "#C7D7E3",
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
                      Do you use sustainability criteria to assess/ select
                      suppliers?
                    </li>
                    <li
                      value="Choices1"
                      onClick={() => handleClicks(3)}
                      className="list-unstyled border border-grey p-2 rounded d-flex gap-3 fs-5 mb-2"
                      style={
                        isClick === 3
                          ? {
                              backgroundColor: "#C7D7E3",
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
                      {" "}
                      How do you dispose of vehicles?
                    </li>
                  </ul>
                )}
              </Col>
            </Col>
            <Col className="d-flex align-items-center gap-2 mb-3">
              <Col lg={6} className="p-0">
                <select lg={6} disable className="form-select ">
                  <option hidden selected>
                    Select answer option
                  </option>
                </select>
              </Col>
              <Col lg={5} className="p-0">
                <select lg={5} disable className="form-select ">
                  <option hidden selected>
                    Select answer option
                  </option>
                </select>
              </Col>
              <div className="d-flex gap-2">
                <i style={{ color: "#C7C9CA" }} class="ri-add-circle-fill"></i>
                <i
                  style={{ color: "#C7C9CA" }}
                  class="ri-delete-bin-2-line"
                ></i>
              </div>
            </Col>

            <Col lg={12} className="d-flex gap-3">
              <Col lg={4} className="p-0 ">
                <Col
                  lg={4}
                  onClick={() => isOpen(!open)}
                  disable
                  className="form-select "
                >
                  Select answer option 2
                </Col>
                <div style={{ position: "relative" }}>
                  {open && (
                    <Col
                      lg={12}
                      className="p-1 mb-3 border-top-0 border border-grey "
                    >
                      <li
                        onClick={() => handleClicks(4)}
                        className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                        style={
                          isClick === 4
                            ? {
                                backgroundColor: "#C7D7E3",
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
                        YES
                      </li>
                      <li
                        onClick={() => handleClicks(5)}
                        className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                        style={
                          isClick === 5
                            ? {
                                backgroundColor: "#C7D7E3",
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
                        NO
                      </li>
                      <li
                        onClick={() => handleClicks(6)}
                        className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                        style={
                          isClick === 6
                            ? {
                                backgroundColor: "#C7D7E3",
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
                        I DON’T KNOW
                      </li>
                      <li
                        onClick={() => handleClicks(7)}
                        className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                        style={
                          isClick === 7
                            ? {
                                backgroundColor: "#C7D7E3",
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
                        PERCENTAGE
                      </li>
                    </Col>
                  )}
                </div>
              </Col>

              <Col lg={4}>
                <Col
                  lg={4}
                  onClick={() => setLists(!lists)}
                  disable
                  className="form-select "
                >
                  Select Condition
                </Col>
                <div style={{ position: "relative" }}>
                  {lists && (
                    <Col
                      lg={12}
                      className="p-1 mb-3 border-top-0  border border-grey"
                    >
                      <li
                        onClick={() => handleClicks(8)}
                        className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                        style={
                          isClick === 8
                            ? {
                                backgroundColor: "#C7D7E3",
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
                        Greater Than (>7)
                      </li>
                      <li
                        onClick={() => handleClicks(9)}
                        className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                        style={
                          isClick === 9
                            ? {
                                backgroundColor: "#C7D7E3",
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
                        Equal to (=)
                      </li>
                      <li
                        onClick={() => handleClicks(10)}
                        className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                        style={
                          isClick === 10
                            ? {
                                backgroundColor: "#C7D7E3",
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
                        Not Equal to (!)
                      </li>
                      <li
                        onClick={() => handleClicks(11)}
                        className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                        style={
                          isClick === 11
                            ? {
                                backgroundColor: "#C7D7E3",
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
                        Greater than or Equal to (>=)
                      </li>
                    </Col>
                  )}
                </div>
              </Col>

              <Col
                className="d-flex border border-gray rounded p-2"
                lg={3}
                style={{ height: "max-content" }}
              >
                <button
                  className="bg-light rounded border-0"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  className="w-100 border-0 text-center"
                  type="number"
                  value={count}
                  readOnly
                />
                <button
                  className="bg-light rounded border-0"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </Col>
              <div className="d-flex gap-1">
                <i style={{ color: "#C7C9CA" }} class="ri-add-circle-fill"></i>
                <i
                  style={{ color: "#C7C9CA" }}
                  class="ri-delete-bin-2-line"
                ></i>
              </div>
            </Col>

            <Col className="border border-grey rounded mt-3 mb-3">
              <Col xxl={12} className="p-0">
                <Col
                  lg={12}
                  onClick={() => setSelect(!select)}
                  disable
                  className="form-select"
                >
                  Select Recommended Actions
                </Col>
                {select && (
                  <ul className="p-3 m-0">
                    <li
                      value="Choices1"
                      className="list-unstyled border border-grey p-2 rounded d-flex gap-3 fs-5 mb-2"
                    >
                      {" "}
                      <Input type="checkbox" /> Switch to electric vehicles
                    </li>
                    <li
                      value="Choices1"
                      className="list-unstyled border border-grey p-2 rounded d-flex gap-3 fs-5 mb-2"
                    >
                      {" "}
                      <Input type="checkbox" /> Design all job description
                      templates to include sustainability
                    </li>
                    <li
                      value="Choices1"
                      className="list-unstyled border border-grey p-2 rounded d-flex gap-3 fs-5 mb-2"
                    >
                      {" "}
                      <Input type="checkbox" /> Design content of driver
                      meetings and track issues
                    </li>
                  </ul>
                )}
              </Col>
            </Col>
            <div className="col-lg-12 d-flex gap-3">
              <div className="hstack gap-2 justify-content-start">
                <Button className="btn btn-danger p-4 pt-2 pb-2">Cancel</Button>
              </div>
              <div className="hstack gap-2 justify-content-start">
                <Button className="p-4 pt-2 pb-2" color="secondary">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RelationModal;
