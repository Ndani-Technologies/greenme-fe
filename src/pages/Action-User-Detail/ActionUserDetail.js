import React, { useState } from "react";
import Layouts from "../../Layouts";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import Details from "./Details";
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
import StarsRating from "./StarsRating";
import { useFormik } from "formik";
import he from "he";
import classnames from "classnames";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { updateAdminStep, updateSaveActionStep } from "../../slices/thunks";
import { toast, ToastContainer } from "react-toastify";
import { updateRecommendedActionStep } from "../../slices/RecommendedAction/thunk";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ActionUserDetail = () => {
  const [value, setValue] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  let { data } = location.state;
  const entities = {
    "&nbsp;": " ",
    "<br>": "\n",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'",
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      relevant: 0,
      difficult: 0,
      impactful: 0,
      init: 5,
    },
    onSubmit: async (values) => {
      let completedSteps = data.steps.filter((value) => value.isCompleted);

      let steps = stepData.map((value) => {
        if (value.isCheckBoxCompleted) {
          value.step.isCompleted = true;
          value.step.status = true;
        }
        return value.step;
      });
      completedSteps.forEach((value) => {
        if (steps.some((e) => e._id !== value._id)) {
          steps.push(value);
        }
        if (steps.length === 0) {
          steps.push(value);
        }
      });

      try {
        for (const stepObject of steps) {
          await updateRecommendedActionStep(stepObject._id, stepObject);
        }

        // Show a final toast message after all updates are completed
        toast.success("All steps successfully updated");
        navigate("/actionuserdashboard");
      } catch (err) {
        toast.error("Error in updating.");
      }
    },
  });

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
  console.log("data", data);
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
            ra_title={data.title}
          />
          <div className="card-wrapper">
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
                    <span className="span">
                      {data.isCompleted ? "Completed" : "inCompleted"}
                    </span>
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
                    <span className="span">
                      {" "}
                      {new Date(data.startdate).toLocaleDateString("en-US")}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-25 p-2  border-end custom-padding
                    }`}
                >
                  <span className="fs-7">Completion Date</span>
                  <div>
                    {isNaN(new Date(data.enddate)) ? (
                      <span className="span">In Progress</span>
                    ) : (
                      <span className="span">
                        {new Date(data.enddate).toLocaleDateString("en-US")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Col className="card-wrapper mb-5">
            <h4>Description</h4>
            <p dangerouslySetInnerHTML={{ __html: data.description }}></p>

            {/* <p>
              {data.description.replace(
                /(&nbsp;|<br>|&lt;|&gt;|&amp;|&quot;|&apos;)/g,
                (match) => entities[match]
              )}
            </p> */}
          </Col>
          <Col lg={12} className="card-wrapper">
            <Card className="card-wrapper-one">
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
                          <div
                            className="w-75"
                            dangerouslySetInnerHTML={{
                              __html: step.description,
                            }}
                          />

                          {/* {step.description.replace(
                            /(&nbsp;|<br>|&lt;|&gt;|&amp;|&quot;|&apos;)/g,
                            (match) => entities[match]
                          )} */}

                          <div
                            className="Discription"
                            style={{
                              width: "180px",
                              height: "80px",
                              padding: "5px",
                              borderRadius: "10px",
                              border: "1px solid grey",
                              backgroundColor: "#bec887",
                            }}
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
                                checked={step.isCompleted ? true : null}
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
          <Col lg={12} className="card-wrapper d-flex justify-content-between">
            <Col lg={5}>
              <h4 className="mb-4">Resource Links</h4>
              {data.resourcelinkId.map((item) => {
                const isExternal = item.title.includes(
                  "(greenme.fleetforum.org)"
                )
                  ? false
                  : true;
                const linkTarget = isExternal ? "_blank" : "_self";

                return (
                  <div className="hover" key={item.id}>
                    <div className="Links d-flex justify-content-between">
                      <a href={item.title} target={linkTarget}>
                        {item.title}
                      </a>
                      <span>
                        <i class="ri-arrow-right-line"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </Col>
            <Col lg={6} className="card-wrapper-one Feeedback">
              <h4>
                Here you can leave some feedback / experience that you have had.
              </h4>

              <textarea
                className="w-100 p-2"
                rows={4}
                placeholder="Leave us some feed back here"
                disabled
              />
              <Button disabled>Send</Button>
            </Col>
          </Col>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
            }}
            className="card-wrapper"
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
                <Button disabled>Contact Administrator</Button>
              </Col>
              <Col className="d-flex justify-content-center gap-2">
                <Button
                  onClick={() => {
                    setValue(0);
                    validation.resetForm();
                  }}
                  className="btn btn-dangeer"
                >
                  Reset
                </Button>
                <Button type="submit">Save</Button>
                <Button color="primary">Complete</Button>
              </Col>
            </Col>
          </form>
        </div>
        <ToastContainer closeButton={false} limit={1} />
      </React.Fragment>
      <style>
        {`
      .card-wrapper {
        margin-left: 30px;
        margin-right:23px
      }
      .card-wrapper-one {
        margin-right:45px
      }
    `}
      </style>
    </div>
  );
};

export default ActionUserDetail;
