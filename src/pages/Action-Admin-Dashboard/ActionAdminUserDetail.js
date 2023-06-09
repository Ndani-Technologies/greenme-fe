import React, { useState } from "react";
import Layouts from "../../Layouts";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import Details from "./components/Details2";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Col,
  Collapse,
  Input,
} from "reactstrap";
import { Links } from "./components/Details2";
import StarsRating from "./components/StarsRating";
import { useFormik } from "formik";

import classnames from "classnames";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { updateSaveActionStep } from "../../slices/thunks";
import { toast, ToastContainer } from "react-toastify";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ActionUserDetail = () => {
  const [value, setValue] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  let { data } = location.state;
  console.log("contact data1", data);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      relevant: 0,
      difficult: 0,
      impactful: 0,
      init: 5,
    },
    onSubmit: (values) => {
      console.log("in handle submit", values, stepData);
      let steps = stepData.map((value) => {
        if (value.isCheckBoxCompleted) {
          value.step.isCompleted = true;
          value.step.status = true;
        }
        return value.step;
      });

      console.log("steps", steps);
      updateSaveActionStep(data._id, steps)
        .then((resp) => {
          if (resp != undefined) {
            toast.success("Successfully submitted");
            navigate("/actionuserdashboard");
          }
        })
        .catch((err) => toast.error("error in updating."));
    },
  });
  // <!-- Left Icon Accordions -->

  const [lefticonCol1, setlefticonCol1] = useState(true);
  const [lefticonCol2, setlefticonCol2] = useState(false);
  const [lefticonCol3, setlefticonCol3] = useState(false);

  const t_lefticonCol1 = () => {
    setlefticonCol1(!lefticonCol1);
    setlefticonCol2(false);
    setlefticonCol3(false);
  };

  const t_lefticonCol2 = () => {
    setlefticonCol2(!lefticonCol2);
    setlefticonCol1(false);
    setlefticonCol3(false);
  };

  const t_lefticonCol3 = () => {
    setlefticonCol3(!lefticonCol3);
    setlefticonCol1(false);
    setlefticonCol2(false);
  };
  const entities = {
    "&nbsp;": " ",
    "<br>": "\n",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'",
  };
  const [activeIndex, setActiveIndex] = useState(null);
  const [checkboxValues, setCheckboxValues] = useState({});
  const [stepData, setStepData] = useState([]);

  const handleCheckBox = (step, index) => {
    const isChecked = checkboxValues[index] || false;
    setCheckboxValues((prevState) => ({
      ...prevState,
      [index]: !isChecked,
    }));

    const updatedStepData = [...stepData];
    if (!isChecked) {
      updatedStepData.push({ isCheckBoxCompleted: true, step });
    } else {
      const stepIndex = updatedStepData.findIndex(
        (data) => data.step._id === step._id
      );
      if (stepIndex !== -1) {
        updatedStepData.splice(stepIndex, 1);
      }
    }
    setStepData(updatedStepData);
  };

  const handleChange = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <div>
      <React.Fragment>
        <div className="page-content overflow-auto ">
          <ActionMain
            Title={"Recommended Actions - Details"}
            Text={
              "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
            }
          />
          <div className="card">
            <div className="d-flex">
              <div
                className={`w-25 p-2  border-end custom-padding
                    }`}
              >
                <span className="fs-7">Category</span>
                <div>
                  <span className="span">{data.categoryId.title}</span>
                </div>
              </div>
              <div
                className={`w-25 p-2  border-end custom-padding
                    }`}
              >
                <span className="fs-7">Status</span>
                <div>
                  <span className="span">{data.status}</span>
                </div>
              </div>
              <div
                className={`w-25 p-2  border-end custom-padding
                    }`}
              >
                <span className="fs-7">Potential</span>
                <div>
                  <span className="span">{data.potentialId.title}</span>
                </div>
              </div>
              <div
                className={`w-25 p-2  border-end custom-padding
                    }`}
              >
                <span className="fs-7">Cost</span>
                <div>
                  <span className="span">{data.costId.title}</span>
                </div>
              </div>
              <div
                className={`w-25 p-2  border-end custom-padding
                    }`}
              >
                <span className="fs-7">Time scale</span>
                <div>
                  <span className="span">{data.timescaleId.title}</span>
                </div>
              </div>
              <div
                className={`w-25 p-2  border-end custom-padding
                    }`}
              >
                <span className="fs-7">Start Date</span>
                <div>
                  <span className="span">{data.startdate}</span>g
                </div>
              </div>
              <div
                className={`w-25 p-2  border-end custom-padding
                    }`}
              >
                <span className="fs-7">End Date</span>
                <div>
                  <span className="span">{data.enddate}</span>
                </div>
              </div>
            </div>
          </div>
          <Col className="mb-5" lg={12}>
            <h4>Description</h4>
            {/* <Input
                  type="text"
                  placeholder="Some description should go  here"
                /> */}
            <p>
              {data.description.replace(
                /(&nbsp;|<br>|&lt;|&gt;|&amp;|&quot;|&apos;)/g,
                (match) => entities[match]
              )}
            </p>
          </Col>
          <Col lg={12}>
            <Card>
              <h4 className="mb-0 m-3">Action Steps</h4>
              <CardBody>
                <Accordion
                  className="lefticon-accordion custom-accordionwithicon accordion-border-box w-100 p-2"
                  id="accordionlefticon"
                >
                  {data.steps.map((step, index) => (
                    <AccordionItem key={step._id}>
                      <h2
                        className="accordion-header"
                        id={`accordionlefticonExample${index}`}
                      >
                        <button
                          className={classnames("accordion-button", {
                            collapsed: activeIndex !== index,
                          })}
                          type="button"
                          onClick={() => handleChange(index)}
                          style={{ cursor: "pointer" }}
                        >
                          Step {index + 1}: {step.title}
                        </button>
                      </h2>

                      <Collapse
                        isOpen={activeIndex === index}
                        className="accordion-collapse "
                        id={`accor_lefticonExamplecollapse${index + 1}`}
                      >
                        <div className="accordion-body d-flex justify-content-between">
                          {/* {step.description} */}
                          {step.description.replace(
                            /(&nbsp;|<br>|&lt;|&gt;|&amp;|&quot;|&apos;)/g,
                            (match) => entities[match]
                          )}

                          <div
                            className="Discription"
                            style={{ width: "200px" }}
                          >
                            <span>
                              Status:{" "}
                              {step?.status ? "Completed" : "Incomplete"}
                            </span>
                            <div>Points: {step.score}</div>
                            <div className="d-flex align-items-center gap-1">
                              <input
                                type="checkbox"
                                //isCompleted
                                onChange={() => handleCheckBox(step, index)}
                              />
                              <span>Mark as complete</span>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12} className="d-flex justify-content-between">
            <Col lg={5}>
              <h4 className="mb-4">Resource Links</h4>
              {data.resourcelinkId.map((item) => (
                <div className="hover">
                  <div className="Links d-flex justify-content-between">
                    <a>{item.title}</a>
                    <span>
                      <i class="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </div>
              ))}
            </Col>
            <Col lg={6} className="Feeedback">
              <h4>
                Here you can leave some feedback / experience that you have had.
              </h4>

              <textarea
                className="w-100 p-2"
                rows={4}
                placeholder="Leave us some feed back here"
              />
              <Button>Send</Button>
            </Col>
          </Col>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
            }}
          >
            <Col className="d-flex align-items-center justify-content-between pt-3">
              <Col className="Stars">
                <h4>Please leave a rating </h4>
                <div className="Rating">
                  <StarsRating
                    Title="Relevant"
                    Rating={` ${validation.values.relevant} out of 5`}
                    validation={validation}
                    value={value}
                  />
                  <StarsRating
                    Title="Difficult"
                    Rating={`${validation.values.difficult} out of 5`}
                    value={value}
                    validation={validation}
                  />
                  <StarsRating
                    Title="Impactful"
                    Rating={`${validation.values.impactful} out of 5`}
                    value={value}
                    validation={validation}
                  />
                </div>
              </Col>
              <Col className="Touch">
                <p>
                  Get in touch with the administrator <br /> for any
                  clarification need.
                </p>
                <Button>Contact Administrator</Button>
              </Col>
              <Col className="d-flex justify-content-center gap-2">
                <Button
                  onClick={() => {
                    setValue(0);
                    validation.resetForm();
                  }}
                >
                  Reset
                </Button>
                <Button type="submit">Save</Button>
                <Button>Complete</Button>
              </Col>
            </Col>
          </form>
        </div>
        <ToastContainer closeButton={false} limit={1} />
      </React.Fragment>
    </div>
  );
};

export default ActionUserDetail;
