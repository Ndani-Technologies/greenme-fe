import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Col,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import { getAllQA } from "../../slices/thunks";
import {
  createAnswerRelation,
  createRecommendActionRelation,
  updatedRecommendActionRelation,
} from "../../slices/RecommendedAction/thunk";

const answerRelationship = [
  {
    _id: 1,
    title: "Greater Than (>)",
  },
  {
    _id: 2,
    title: "Equal to (=)",
  },
  {
    _id: 3,
    title: "Less Than (<)",
  },
  {
    _id: 4,
    title: "Not Equal to (!)",
  },
];

const percentageOptions = [
  {
    _id: 1,
    title: "Greater Than (>)",
  },
  {
    _id: 2,
    title: "Equal to (=)",
  },
  {
    _id: 3,
    title: "Less Than (<)",
  },
  {
    _id: 4,
    title: "Not Equal to (!)",
  },
];

const RelationModal = ({
  modal_grid,
  setmodal_grid,
  questionList,
  recommendAction,
  setRecommendedRelation,
  recommendedRelation,
  info,
  setInfo,
}) => {
  const [isQuestionClicked, setIsQuestionClicked] = useState(0);
  const [selectedAnswerOptions, setSelectedAnswerOptions] = useState([]);
  const [selectedPercentageOptions, setSelectedPercentageOptions] = useState(
    []
  );
  const [isPercentageClicked, setIsPercentageClicked] = useState(false);
  const [benchmarkCounter, setBenchmarkCounter] = useState([{ id: 1 }]);
  const [selectedAnswerRelation, setSelectedAnswerRelation] = useState([]);
  const [isRecommendedActionOpen, setIsRecommendedActionOpen] = useState(false);
  const [list, setList] = useState(false);
  const [answerOpen, isAnswerOpen] = useState(false);
  const [answerOpen1, isAnswerOpen1] = useState(false);
  const [selectedRecommendAction, setSelectedRecommendAction] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("info ch", info);
    if (info !== null && info !== undefined) {
      const qIndex = questionList.findIndex(
        (value) => value._id === info.qid._id
      );
      console.log("info", info, qIndex);
      setIsQuestionClicked(qIndex);
      setList(!list);
      if (info.qid.answerOptions.length > 0) {
        setBenchmarkCounter(info.qid.answerOptions);
      }
      info.qid.answerOptions.forEach((value, index) => {
        setSelectedAnswerOptions((prevState) => {
          const updatedSelectedAnswerOptions = [...prevState];
          updatedSelectedAnswerOptions[index] = {
            qid: info.qid._id,
            aid: value._id,
          };
          return updatedSelectedAnswerOptions;
        });
      });
      isAnswerOpen(!answerOpen);
      setSelectedRecommendAction([
        ...selectedRecommendAction,
        info.recomendedActionId[0]._id,
      ]);
      setIsRecommendedActionOpen(!isRecommendedActionOpen);

      // const selectedAnswers = info.answer_option.split(",").filter(item => item.trim() !== "")
    }
  }, []);
  console.log("RA", selectedRecommendAction);
  const handleQuestionClicked = (index) => {
    setIsQuestionClicked(index);
  };

  const handleAnswerOptionChange = (qid, aid, index) => {
    setSelectedAnswerOptions((prevState) => {
      const updatedSelectedAnswerOptions = [...prevState];
      updatedSelectedAnswerOptions[index] = { qid, aid };
      return updatedSelectedAnswerOptions;
    });
  };
  const handleAnswerRelationChange = (arId) => {
    setSelectedAnswerRelation([arId]);
  };
  const handlePercentageOptionChange = (pid, index) => {
    setSelectedPercentageOptions((prevState) => {
      const updatedSelectedOptions = [...prevState];
      updatedSelectedOptions[index] = { pid };
      return updatedSelectedOptions;
    });
  };

  function addAnotherBenchmarkQuestion(index) {
    setBenchmarkCounter([
      ...benchmarkCounter,
      { id: benchmarkCounter.length + 1 },
    ]);
  }
  const removeBenchmarkQuestion = (index) => {
    // if(benchmarkCounter.length!==1){
    const updatedCounter = benchmarkCounter.filter((item) => item.id !== index);
    setBenchmarkCounter(updatedCounter);
    // }
  };

  const handleRecommendedAction = (id, index) => {
    if (!selectedRecommendAction.some((a) => a === id)) {
      setSelectedRecommendAction([...selectedRecommendAction, id]);
    } else {
      setSelectedRecommendAction((prev) => prev.filter((a) => a !== id));
    }
  };

  const handleSubmit = () => {
    if (
      selectedRecommendAction.length < 1 ||
      selectedAnswerOptions.length < 1
    ) {
      toast.error(
        "At least one Answer Option and one Recommended Action must be selected"
      );
    } else {
      const mappedData = {
        qid: selectedAnswerOptions[0]?.qid,
        aid: [],
        status,
        visibility,
        recomendedActionId: selectedRecommendAction,
      };
      selectedAnswerOptions.forEach((value) => {
        mappedData.aid.push(value.aid);
      });
      console.log("mapped", mappedData);
      if (info !== null) {
        const toastId = toast.loading("Updating Recommend Relation");
        updatedRecommendActionRelation(info._id, mappedData, toastId)
          .then((resp) => {
            console.log("resp", resp);
            let answers = "";
            resp?.qid?.answerOptions.forEach((element) => {
              answers += element.answerOption.answerOption + ",";
            });
            let data = {
              ...resp,
              status: resp.status ? "true" : false,
              ra_title: resp?.recomendedActionId[0]?.title,
              answr_option: answers,
              question_title: resp?.qid?.title,
              assignment_type: resp?.assignment_type
                ? resp.assignment_type
                : "Automatic",
              number_of_assignment: resp?.number_of_assignment,
            };
            setRecommendedRelation([...recommendedRelation, data]);

            // const currentRecommendedRelation = recommendedRelation.find((rr)=>rr._id === info._id)
          })
          .then(() => {
            setmodal_grid(false);
          })
          .catch((err) => {
            console.log("error", err);
            toast.error("Couldn't update the relation.");
          });
      } else {
        createRecommendActionRelation(mappedData)
          .then((resp) => {
            let answers = "";
            resp?.qid?.answerOptions.forEach((element) => {
              answers += element.answerOption.answerOption + ",";
            });
            let data = {
              ...resp,
              status: resp.status ? "true" : false,
              ra_title: resp?.recomendedActionId[0]?.title,
              answr_option: answers,
              question_title: resp?.qid?.title,
              assignment_type: resp?.assignment_type
                ? resp.assignment_type
                : "Automatic",
              number_of_assignment: resp?.number_of_assignment,
            };

            setRecommendedRelation([...recommendedRelation, data]);
            toast.success("Relation Succesfully Created.");
            setmodal_grid(false);
          })
          .catch((err) => toast.error("Couldn't create the relation."));
      }
    }
  };

  const [status, setStatus] = useState(true);
  const [visibility, setVisibility] = useState(true);

  const handleCheckboxChange5 = (event) => {
    setStatus(!status);
  };
  const handleCheckboxChange6 = (event) => {
    setVisibility(!visibility);
  };
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  function tog_grid() {
    setmodal_grid(!modal_grid);
  }

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
                  checked={status}
                  onChange={handleCheckboxChange5}
                  style={{
                    backgroundColor: status ? "#88C756" : "#fff",
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
                  checked={visibility}
                  onChange={handleCheckboxChange6}
                  style={{
                    backgroundColor: visibility ? "#88c765" : "#fff",
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
                  <ul
                    className="p-3 m-0"
                    style={{
                      maxHeight: "200px",
                      overflowY: questionList.length > 3 && "scroll",
                    }}
                  >
                    {questionList.map((question, index) => (
                      <li
                        key={index}
                        onClick={() => handleQuestionClicked(index)}
                        className="list-unstyled border border-grey p-2 rounded d-flex gap-3 fs-5 mb-2"
                        style={
                          isQuestionClicked === index
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
                        {question.title}
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
            </Col>
            {isQuestionClicked !== null && (
              <Col className="d-flex align-items-center gap-2  mb-3">
                <Col lg={12} className="p-0">
                  <Col
                    lg={12}
                    onClick={() => isAnswerOpen1(!answerOpen1)}
                    disabled
                    className="form-select"
                  >
                    Select answer relationship
                  </Col>

                  <div style={{ position: "relative" }}>
                    {answerOpen1 && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey"
                      >
                        {answerRelationship.map((option, optionIndex) => (
                          <li
                            key={option._id}
                            onClick={() =>
                              handleAnswerRelationChange(option._id)
                            }
                            className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                            style={
                              selectedAnswerRelation[0] === option._id
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
                            {option.title}
                          </li>
                        ))}
                      </Col>
                    )}
                  </div>
                </Col>
              </Col>
            )}
            {benchmarkCounter.map((value, index) => (
              <Col lg={12} className="d-flex gap-3" key={index}>
                <Col lg={4} className="p-0">
                  <Col
                    lg={8}
                    onClick={() => isAnswerOpen(!answerOpen)}
                    disable
                    className="form-select"
                  >
                    Select answer option {index + 1}
                  </Col>

                  <div style={{ position: "relative" }}>
                    {answerOpen && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey"
                      >
                        {questionList[isQuestionClicked]?.answerOptions.map(
                          (option, optionIndex) => (
                            <li
                              key={option._id}
                              onClick={() =>
                                handleAnswerOptionChange(
                                  questionList[isQuestionClicked]._id,
                                  option._id,
                                  index
                                )
                              }
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                selectedAnswerOptions[index]?.aid === option._id
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
                              {option.answerOption.answerOption}
                            </li>
                          )
                        )}
                      </Col>
                    )}
                  </div>
                </Col>

                {questionList[isQuestionClicked].answerOptions.some((a) => {
                  return (
                    a._id === selectedAnswerOptions[index]?.aid &&
                    a.answerOption.answerOption === "Percentage"
                  );
                }) && (
                  <>
                    <Col lg={4} key={index}>
                      <Col
                        lg={4}
                        onClick={() =>
                          setIsPercentageClicked(!isPercentageClicked)
                        }
                        disable
                        className="form-select "
                      >
                        Select Condition
                      </Col>
                      <div style={{ position: "relative" }}>
                        {isPercentageClicked && (
                          <Col
                            lg={12}
                            className="p-1 mb-3 border-top-0  border border-grey"
                          >
                            {percentageOptions.map(
                              (percentage, percentageIndex) => (
                                <li
                                  key={percentage._id}
                                  onClick={() =>
                                    handlePercentageOptionChange(
                                      percentage._id,
                                      index
                                    )
                                  }
                                  className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                                  style={
                                    selectedPercentageOptions[index]?.pid ===
                                    percentage._id
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
                                  {percentage.title}
                                </li>
                              )
                            )}
                          </Col>
                        )}
                      </div>
                    </Col>
                    <Col
                      key={index}
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
                  </>
                )}

                <div className="d-flex gap-1">
                  <i
                    style={{ color: "#C7C9CA" }}
                    onClick={() => {
                      if (
                        index + 1 <
                        questionList[isQuestionClicked]?.answerOptions.length
                      ) {
                        addAnotherBenchmarkQuestion();
                      } else {
                        toast.info(
                          `only ${selectedAnswerOptions.length} can be selected.`
                        );
                      }
                    }}
                    className="ri-add-circle-fill cursor-pointer"
                  ></i>
                  <i
                    style={{ color: "#C7C9CA" }}
                    onClick={() => {
                      if (benchmarkCounter.length === 1) {
                        toast.info(`Can't delete more.`);
                      } else {
                        removeBenchmarkQuestion(value.id);
                      }
                    }}
                    className="ri-delete-bin-2-line cursor-pointer"
                  ></i>
                </div>
                <ToastContainer closeButton={false} limit={1} />
              </Col>
            ))}
            <Col className="border border-grey rounded mt-3 mb-3">
              <Col xxl={12} className="p-0">
                <Col
                  lg={12}
                  onClick={() =>
                    setIsRecommendedActionOpen(!isRecommendedActionOpen)
                  }
                  disable
                  className="form-select"
                >
                  Select Recommended Actions
                </Col>
                {isRecommendedActionOpen && (
                  <ul className="p-3 m-0">
                    {recommendAction.map((value, index) => (
                      <li
                        key={value._id}
                        value="Choices1"
                        className="list-unstyled border border-grey p-2 rounded d-flex gap-3 fs-5 mb-2"
                      >
                        {" "}
                        <Input
                          type="checkbox"
                          checked={selectedRecommendAction.some(
                            (a) => a === value._id
                          )}
                          onChange={() =>
                            handleRecommendedAction(value._id, index)
                          }
                        />{" "}
                        {value.title}
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
            </Col>
            <div className="col-lg-12 d-flex gap-3">
              <div className="hstack gap-2 justify-content-start">
                <Button
                  className="btn btn-danger p-4 pt-2 pb-2"
                  onClick={() => {
                    setmodal_grid(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div className="hstack gap-2 justify-content-start">
                <Button
                  className="p-4 pt-2 pb-2"
                  color="secondary"
                  onClick={handleSubmit}
                >
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
