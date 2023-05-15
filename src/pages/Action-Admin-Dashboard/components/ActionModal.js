import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as moment from "moment";
import {
  Col,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import CropSquareIcon from "@mui/icons-material/CropSquare";

import { Checkbox } from "@mui/material";

const ActionModal = ({ modal_grid, setmodal_grid }) => {
  console.log("modal", modal_grid);
  const [isGrey, setIsGrey] = useState(false);
  const [isGrey2, setIsGrey2] = useState(false);
  const [isGrey3, setIsGrey3] = useState(false);
  const [isGrey4, setIsGrey4] = useState(false);
  const [isGrey5, setIsGrey5] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const handleClick = (language) => {
    setSelectedLanguage(language);
  };
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(true);
  const [isChecked6, setIsChecked6] = useState(true);

  const handleCheckboxChange1 = (event) => {
    setIsChecked1(!isChecked1);
  };
  const handleCheckboxChange2 = (event) => {
    setIsChecked2(!isChecked2);
  };
  const handleCheckboxChange3 = (event) => {
    setIsChecked3(!isChecked3);
  };
  const handleCheckboxChange4 = (event) => {
    setIsChecked4(!isChecked4);
  };
  const handleCheckboxChange5 = (event) => {
    setIsChecked5(!isChecked5);
  };
  const handleCheckboxChange6 = (event) => {
    setIsChecked6(!isChecked6);
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
                <select lg={12} disable className="form-select mb-3">
                  <option hidden selected>
                    Select Category
                  </option>
                  <option value="Choices1">General</option>
                  <option value="Choices1">Data Section</option>
                  <option value="Choices1">Vehicle Profile</option>
                  <option value="Choices1">Occupancy & Utilsation Rates</option>
                  <option value="Choices1">Other</option>
                </select>
              </Col>
              <Col className="p-0 border rounded">
                <div className="border p-3  d-flex justify-content-between ">
                  Answer Options{" "}
                </div>
                <div
                  className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center   "
                  style={{ color: isGrey ? "black" : "#cccccc" }}
                >
                  <div>
                    <Checkbox
                      onChange={() => setIsGrey(!isGrey)}
                      icon={<CropSquareIcon />}
                      checkedIcon={<SquareRoundedIcon />}
                    />
                    YES{" "}
                  </div>
                  <div className="form-check form-switch form-switch-right form-switch-md ">
                    <Label
                      htmlFor="form-grid-showcode"
                      className="form-label text-muted"
                    >
                      Include Explanation
                    </Label>
                    <Input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      value="active"
                      checked={isChecked2}
                      onChange={handleCheckboxChange2}
                      style={{
                        backgroundColor: isChecked2 ? "#88C756" : "#fff",
                        width: "50px",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center "
                  style={{ color: isGrey2 ? "black" : "#cccccc" }}
                >
                  <div>
                    <Checkbox
                      onChange={() => setIsGrey2(!isGrey2)}
                      icon={<CropSquareIcon />}
                      checkedIcon={<SquareRoundedIcon />}
                    />
                    No{" "}
                  </div>
                  <div className="form-check form-switch form-switch-right form-switch-md ">
                    <Label
                      htmlFor="form-grid-showcode"
                      className="form-label text-muted"
                    >
                      Include Explanation
                    </Label>
                    <Input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      value="active"
                      checked={isChecked3}
                      onChange={handleCheckboxChange3}
                      style={{
                        backgroundColor: isChecked3 ? "#88C756" : "#fff",
                        width: "50px",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center  "
                  style={{ color: isGrey3 ? "black" : "#cccccc" }}
                >
                  <div>
                    <Checkbox
                      onChange={() => setIsGrey3(!isGrey3)}
                      icon={<CropSquareIcon />}
                      checkedIcon={<SquareRoundedIcon />}
                    />
                    I DON'T KNOW{" "}
                  </div>
                  <div className="form-check form-switch form-switch-right form-switch-md ">
                    <Label
                      htmlFor="form-grid-showcode"
                      className="form-label text-muted"
                    >
                      Include Explanation
                    </Label>
                    <Input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      value="active"
                      checked={isChecked4}
                      onChange={handleCheckboxChange4}
                      style={{
                        backgroundColor: isChecked4 ? "#88C756" : "#fff",
                        width: "50px",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center "
                  style={{ color: isGrey4 ? "black" : "#cccccc" }}
                >
                  <div>
                    <Checkbox
                      onChange={() => setIsGrey4(!isGrey4)}
                      icon={<CropSquareIcon />}
                      checkedIcon={<SquareRoundedIcon />}
                    />
                    WE DO NOT HAVE A POLICY{" "}
                  </div>
                  <div className="form-check form-switch form-switch-right form-switch-md ">
                    <Label
                      htmlFor="form-grid-showcode"
                      className="form-label text-muted"
                    >
                      Include Explanation
                    </Label>
                    <Input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      value="active"
                      onChange={handleCheckboxChange5}
                      style={{
                        backgroundColor: isChecked5 ? "#88C756" : "#fff",
                        width: "50px",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="border p-3 pt-1 pb-1 bg-white"
                  style={{ color: isGrey5 ? "black" : "#cccccc" }}
                >
                  <div>
                    <Checkbox
                      onChange={() => setIsGrey5(!isGrey5)}
                      icon={<CropSquareIcon />}
                      checkedIcon={<SquareRoundedIcon />}
                    />
                    PERCENTAGE
                  </div>
                </div>
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
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ActionModal;
