import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  TabContent,
  TabPane,
  Input,
} from "reactstrap";
import classnames from "classnames";
import Layouts from "../../Layouts";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getSingleBenchmark,
  updateUserResp,
  updateUserRespSave,
  getUserProgress,
} from "../../slices/thunks";

import { BottomNavigation } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const Benchmarking = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [benchmark, setBenchmark] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const [user_resp, setUser_resp] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState({});
  const [selectedAnswerIds, setSelectedAnswerIds] = useState([]);
  const [includeExplanation, setIncludeExplanation] = useState("");
  const [includeInputField, setIncludeInputField] = useState("");
  const [category, setCategory] = useState([]);
  const callApi = async () => {
    const bench = await getSingleBenchmark(params.id);
    setBenchmark(bench);

    const arr = [];
    bench.questionnaire.forEach((element) => {
      arr.push(element.category);
    });
    const uniqueArr = Array.from(
      new Set(arr.map((item) => item?.titleEng))
    ).map((titleEng) => arr.find((item) => item?.titleEng === titleEng));
    if (uniqueArr.length > 0) setjustifyPillsTab(uniqueArr[0]._id);
    setCategory(uniqueArr);
    const benchmarkByCategory = bench?.questionnaire.filter((value, index) => {
      if (value.category?._id === arr[0]._id) return value;
    });
    setQuestions(benchmarkByCategory);
  };
  const location = useLocation();
  useEffect(() => {
    callApi();
    getProgressPercentage();
    // if(location?.state?.isDataUpdated){
    //   setUser_resp([...user_resp , benchmark.user_resp])
    // }

    // setBenchmark(benchmarkByCategory);
  }, []);

  //HANDLING STYLE CHANGE ON SCREEN SIZE CHANGE

  const [isBelow1440, setIsBelow1440] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsBelow1440(window.innerWidth < 1440);
    };

    // Add event listener to detect window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rowClassName = isBelow1440 ? "row w-100" : "row w-50";

  const getProgressPercentage = async () => {
    const obj = JSON.parse(sessionStorage.getItem("authUser"));

    const res = await getUserProgress(obj._id);

    const floorPercentage = Math.floor(res.percentage);

    setProgressPercentage(floorPercentage);
  };

  const [justifyPillsTab, setjustifyPillsTab] = useState(
    category.length > 0 ? category[0]._id : null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const numPages = 6; // total number of pages

  const justifyPillsToggle = (tab) => {
    if (justifyPillsTab !== tab) {
      const benchmarkByCategory = benchmark.questionnaire.filter(
        (value, index) => {
          if (value.category?._id === tab) return value;
        }
      );
      setQuestions(benchmarkByCategory);
      setjustifyPillsTab(tab);
    }
  };
  const [comment, SetComment] = useState("");
  const handleExplanationChange = (value) => {
    SetComment(value);
  };

  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const handleButtonClick = (
    questionIndex,
    buttonIndex,
    answerOption,
    qid,
    aid,
    isIncludeExplanation,
    isInlcudeInput,
    explanationValue,
    inputFieldValue
  ) => {
    setActiveIndexes((prevState) => ({
      ...prevState,
      [questionIndex]: buttonIndex,
    }));

    setUser_resp((prevUserResp) => {
      const newUserResp = [...prevUserResp];
      const userRespIndex = newUserResp.findIndex(
        (resp) => resp?.questionId === qid
      );

      if (userRespIndex !== -1) {
        const updatedUserResp = {
          ...newUserResp[userRespIndex],
          selectedOption: [...newUserResp[userRespIndex].selectedOption],
        };

        const optionIndex = updatedUserResp.selectedOption.findIndex(
          (option) => option.answerOption === aid
        );

        if (optionIndex !== -1) {
          // Update the existing option
          const selectedOption = updatedUserResp.selectedOption[optionIndex];
          updatedUserResp.selectedOption[optionIndex] = {
            ...selectedOption,
            includeExplanationValue:
              explanationValue || selectedOption.includeExplanationValue,
            includeInputFieldValue:
              inputFieldValue || selectedOption.includeInputFieldValue,
          };
        } else {
          // Find the option with empty values and update it
          // const emptyQuestionIndex = updateUserResp.findIndex((option)=>option.qid === qid)

          const emptyOptionIndex = updatedUserResp.selectedOption.findIndex(
            (option) =>
              (option.includeExplanationValue === "" &&
                option.includeInputFieldValue === "" &&
                option.includeInputField) ||
              option.includeExplanation
          );
          if (emptyOptionIndex !== -1) {
            updatedUserResp.selectedOption[emptyOptionIndex] = {
              ...updatedUserResp.selectedOption[emptyOptionIndex],
              answerOption: aid,
              includeExplanationValue: explanationValue || "",
              includeInputFieldValue: inputFieldValue || "",
            };
          } else {
            updatedUserResp.selectedOption.push({
              answerOption: aid,
              includeExplanationValue: explanationValue || "",
              includeInputFieldValue: inputFieldValue || "",
              includeExplanation: isIncludeExplanation,
              includeInputField: isInlcudeInput,
            });
          }
        }

        newUserResp[userRespIndex] = updatedUserResp;
      } else {
        // Add new user response to the array
        newUserResp.push({
          questionId: qid,
          selectedOption: [
            {
              answerOption: aid,
              includeExplanationValue: explanationValue || "",
              includeInputFieldValue: inputFieldValue || "",
              includeExplanation: isIncludeExplanation,
              includeInputField: isInlcudeInput,
            },
          ],
        });
      }

      return newUserResp;
    });
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const renderedQuestions =
    questions?.length >= 0 &&
    questions
      // .slice((currentPage - 1) * numPages, currentPage * numPages)
      .map((item, index) => {
        const activeButtonIndex = activeIndexes[index];

        const userResponse = benchmark?.user_resp?.find(
          (resp) => resp?.questionId === item?._id
        );

        const selectedOptionIndex = item.answerOptions.findIndex(
          (option) =>
            option?._id === userResponse?.selectedOption.map((val) => val)
        );
        const selectedOption = userResponse?.selectedOption.filter((selct) =>
          item?.answerOptions?.find((option) => {
            return selct.answerOption === option.answerOption._id;
          })
        );

        return (
          <div className={rowClassName} key={index}>
            <h5>Question {index + 1}</h5>
            <p className="w-75 fs-5">{item.title}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            ></p>
            {location?.state?.isDataUpdated ||
            benchmark.user_resp?.length > 0 ? (
              <div className="d-flex mt-4">
                {item.answerOptions &&
                  item.answerOptions.map((btn, btnIndex) => {
                    const isSelected =
                      selectedAnswerIds[item._id]?.includes(
                        (btn) => btn === btn.answerOption._id
                      ) || false;

                    let buttonClass = "button";

                    if (
                      selectedAnswerIds[item._id] &&
                      selectedAnswerIds[item._id].includes(btn.answerOption._id)
                    ) {
                      buttonClass += " active";
                    }

                    const check = selectedOption?.some((a) => {
                      return a.answerOption !== undefined;
                    });
                    const check2 = selectedOption?.some((a) => {
                      return a.answerOption === btn.answerOption._id;
                    });

                    const btn_user_resp = selectedOption?.find((a) => {
                      return a.answerOption === btn.answerOption._id;
                    });
                    if (check ? check2 : false) {
                      buttonClass += " active";
                    }
                    const inputFieldValue =
                      includeInputField[`${item._id}_${btn._id}`] || "";
                    const selectedAnswer = selectedOption?.some(
                      (option) => option.answerOption === btn.answerOption._id
                    );
                    const includeExplanationValue =
                      selectedAnswer?.includeExplanationValue || "";
                    return (
                      <div key={btnIndex}>
                        {isSelected || check ? (
                          <>
                            {btn_user_resp?.includeExplanation !== undefined &&
                              btn_user_resp.includeExplanation !== "false" && (
                                <div className="">
                                  <CKEditor
                                    editor={ClassicEditor}
                                    onReady={(editor) => {
                                      editor.setData(
                                        btn_user_resp.includeExplanationValue
                                      );
                                    }}
                                    onChange={(e, editor) => {
                                      const value = editor.getData();
                                      setIncludeExplanation((prevState) => ({
                                        ...prevState,
                                        [item._id]: value,
                                      }));
                                    }}
                                    onBlur={(e, editor) => {
                                      const value = editor.getData();
                                      setIncludeExplanation((prevState) => ({
                                        ...prevState,
                                        [item._id]: value,
                                      }));
                                      handleButtonClick(
                                        (currentPage - 1) * numPages + index,
                                        btnIndex,
                                        btn.answerOption,
                                        item?._id,
                                        btn.answerOption._id,
                                        btn.includeExplanation,
                                        btn.includeInputField,
                                        includeExplanation,
                                        includeExplanationValue
                                      );
                                    }}
                                    class="form-control"
                                    placeholder="Description"
                                    id="floatingTextarea"
                                    value=""
                                    style={{
                                      height: "120px",
                                      overflow: "hidden",
                                      backgroundColor: "#dfdfdf",
                                    }}
                                  />
                                </div>
                              )}
                          </>
                        ) : null}
                        {isSelected || check ? (
                          <>
                            {btn_user_resp?.includeInputField !== undefined &&
                            btn_user_resp.includeInputField !== "false" ? (
                              <div>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="input-field"
                                  placeholder=""
                                  value={
                                    includeInputField[
                                      `${item._id}_${btn.answerOption._id}`
                                    ] ||
                                    selectedOption.find(
                                      (a) =>
                                        a.answerOption === btn.answerOption._id
                                    )?.includeInputFieldValue ||
                                    "chekc"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setIncludeInputField((prevState) => ({
                                      ...prevState,
                                      [`${item._id}_${btn.answerOption._id}`]:
                                        value,
                                    }));
                                  }}
                                  onBlur={(e) => {
                                    const value = e.target.value;
                                    setIncludeInputField((prevState) => ({
                                      ...prevState,
                                      [`${item._id}_${btn.answerOption._id}`]:
                                        value,
                                    }));
                                    handleButtonClick(
                                      (currentPage - 1) * numPages + index,
                                      btnIndex,
                                      btn.answerOption,
                                      item?._id,
                                      btn.answerOption._id,
                                      btn.includeExplanation,
                                      btn.includeInputField,
                                      includeExplanation,
                                      includeExplanationValue
                                    );
                                  }}
                                />
                              </div>
                            ) : null}
                          </>
                        ) : null}
                        <div className="buttons-container">
                          <button
                            onClick={() => {
                              setSelectedAnswerIds((prevSelectedAnswerIds) => {
                                const questionId = item._id;
                                const selectedIds =
                                  prevSelectedAnswerIds[questionId] || [];

                                if (isSelected) {
                                  return {
                                    ...prevSelectedAnswerIds,
                                    [questionId]: selectedIds.filter(
                                      (id) => id !== btn.answerOption._id
                                    ),
                                  };
                                } else {
                                  return {
                                    ...prevSelectedAnswerIds,
                                    [questionId]: [
                                      ...selectedIds,
                                      btn.answerOption._id,
                                    ],
                                  };
                                }
                              });

                              handleButtonClick(
                                (currentPage - 1) * numPages + index,
                                btnIndex,
                                btn.answerOption,
                                item?._id,
                                btn.answerOption._id
                              );
                            }}
                            className={buttonClass}
                          >
                            {btn.answerOption.answerOption}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                ;
              </div>
            ) : (
              <div className="d-flex mt-4">
                {item.answerOptions &&
                  item.answerOptions.map((btn, btnIndex) => {
                    const isSelected =
                      selectedAnswerIds[item._id]?.includes(btn._id) || false;

                    let buttonClass = "button";
                    if (
                      selectedAnswerIds[item._id] &&
                      selectedAnswerIds[item._id].includes(btn._id)
                    ) {
                      buttonClass += " active";
                    }

                    // const explanationValue = includeExplanation[item._id] || ""; // Get the value for the explanation input field
                    const explanationValue = includeExplanation[item._id] || ""; // Get the value for the explanation input field
                    const inputFieldValue =
                      includeInputField[`${item._id}_${btn._id}`] || ""; // Get the value for the input field

                    return (
                      <div key={btnIndex}>
                        {isSelected ? (
                          <>
                            {btn.includeExplanation && (
                              <div className="">
                                <CKEditor
                                  editor={ClassicEditor}
                                  onReady={(editor) => {}}
                                  onChange={(e, editor) => {
                                    const value = editor.getData();
                                    setIncludeExplanation((prevState) => ({
                                      ...prevState,
                                      [item._id]: value,
                                    }));
                                  }}
                                  onBlur={(e, editor) => {
                                    const value = editor.getData();
                                    setIncludeExplanation((prevState) => ({
                                      ...prevState,
                                      [item._id]: value,
                                    }));
                                    handleButtonClick(
                                      (currentPage - 1) * numPages + index,
                                      btnIndex,
                                      btn.answerOption,
                                      item?._id,
                                      btn.answerOption._id,
                                      btn.includeExplanation,
                                      btn.includeInputField,
                                      explanationValue,
                                      inputFieldValue // Pass the explanation value to handleButtonClick
                                    );
                                  }}
                                  validate={{
                                    required: { value: true },
                                  }}
                                  class="form-control"
                                  placeholder="Description"
                                  id="floatingTextarea"
                                  value={explanationValue}
                                  style={{
                                    height: "120px",
                                    overflow: "hidden",
                                    backgroundColor: "#dfdfdf",
                                  }}
                                />
                              </div>
                            )}
                            {btn.includeInputField && (
                              <div>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="input-field"
                                  placeholder=""
                                  value={inputFieldValue}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setIncludeInputField((prevState) => ({
                                      ...prevState,
                                      [`${item._id}_${btn._id}`]: value,
                                    }));
                                  }}
                                  onBlur={(e) => {
                                    const value = e.target.value;
                                    setIncludeInputField((prevState) => ({
                                      ...prevState,
                                      [`${item._id}_${btn._id}`]: value,
                                    }));

                                    handleButtonClick(
                                      (currentPage - 1) * numPages + index,
                                      btnIndex,
                                      btn.answerOption,
                                      item?._id,
                                      btn.answerOption._id,
                                      btn.includeExplanation,
                                      btn.includeInputField,
                                      explanationValue,
                                      inputFieldValue
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </>
                        ) : null}
                        <div className="buttons-container">
                          <button
                            onClick={() => {
                              setSelectedAnswer(btn);
                              setSelectedAnswerIds((prevSelectedAnswerIds) => {
                                const questionId = item._id;
                                const selectedIds =
                                  prevSelectedAnswerIds[questionId] || [];

                                if (isSelected) {
                                  return {
                                    ...prevSelectedAnswerIds,
                                    [questionId]: selectedIds.filter(
                                      (id) => id !== btn._id
                                    ),
                                  };
                                } else {
                                  return {
                                    ...prevSelectedAnswerIds,
                                    [questionId]: [...selectedIds, btn._id],
                                  };
                                }
                              });

                              handleButtonClick(
                                (currentPage - 1) * numPages + index,
                                btnIndex,
                                btn.answerOption,
                                item?._id,
                                btn.answerOption._id,
                                btn.includeExplanation,
                                btn.includeInputField
                              );
                            }}
                            onBlur={() => {
                              handleButtonClick(
                                (currentPage - 1) * numPages + index,
                                btnIndex,
                                btn.answerOption,
                                item?._id,
                                btn.answerOption._id,
                                btn.includeExplanation,
                                btn.includeInputField
                              );
                            }}
                            className={buttonClass}
                          >
                            {btn.answerOption.answerOption}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        );
      });

  const obj = JSON.parse(sessionStorage.getItem("authUser"));
  const userId = obj._id;

  const handleSubmit = () => {
    const requestBody = {
      userId: userId,
      user_resp: user_resp,
    };
    const toastt_id = toast.loading("Please wait...");
    updateUserResp(benchmark?._id, requestBody, navigate).then((resp) => {
      toast.update(toastt_id, {
        render: "benchmark is successfully submitted",
        type: "success",
        isLoading: false,
      });
      // toast.success("benchmark is successfully submitted");
    });
  };

  const [benchmarkCreation, setbenchmarkCreation] = useState(false);

  const [modal_center, setmodal_center] = useState(false);

  const tog_center = () => {
    setmodal_center(!modal_center);
  };

  const handleSubmitModal = () => {
    tog_center();
  };
  const cancelCreation = () => {
    setbenchmarkCreation(!benchmarkCreation);
  };

  const requestBody = {
    userId: userId,
    user_resp: user_resp,
  };

  return (
    <React.Fragment>
      {/* <Layouts> */}
      <div className="page-content overflow-auto ">
        <div className="Main-sec mx-n4 mt-n4 w-100">
          <h1>Benchmarking</h1>
          <p>
            This is a page where users can take self-assessment questionnaires
            and view their results. It will feature the ability for users to
            save progress and return to the assessment later as well as an
            option to skip or go back to previous questions. Also the option for
            the user to view their score and their benchmark results
          </p>
        </div>
        <Col lg={12} className="m-auto">
          <Card style={{ marginTop: "50px" }}>
            <CardBody className="pl-1 pr-1">
              <Nav pills className="nav-justified mb-3 mt-3">
                {category.length >= 0 &&
                  category.map((value, index) => {
                    return (
                      <NavItem key={index}>
                        <NavLink
                          style={{ fontSize: "14px", cursor: "pointer" }}
                          className={classnames({
                            active: justifyPillsTab === value?._id,
                          })}
                          onClick={() => {
                            justifyPillsToggle(value?._id);
                          }}
                        >
                          {value.titleEng}
                        </NavLink>
                      </NavItem>
                    );
                  })}
              </Nav>

              <TabContent
                activeTab={justifyPillsTab}
                className="text-muted p-4 pt-0"
              >
                <TabPane tabId={justifyPillsTab} id="pill-justified-home-1">
                  <div className="row d-flex gap-5 justify-content-between w-100 mt-4 pt-4 pb-4 border-top border-dark">
                    {renderedQuestions}
                  </div>
                  <div>
                    <div className="">
                      <div className="d-flex justify-content-between border-top border-dark">
                        <Button
                          onClick={() => {
                            let currentIndex = category.findIndex(
                              (value) => value._id === justifyPillsTab
                            );
                            let previousIndex = currentIndex - 1;

                            if (previousIndex < 0) {
                              previousIndex = category.length - 1; // Go to the last index
                            }

                            setjustifyPillsTab(category[previousIndex]._id);
                            justifyPillsToggle(category[previousIndex]._id);
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => {
                            const currentIndex = category.findIndex(
                              (value) => value._id === justifyPillsTab
                            );
                            let nextIndex = currentIndex + 1;

                            if (nextIndex >= category.length) {
                              nextIndex = 0; // Go back to the first index
                            }

                            setjustifyPillsTab(category[nextIndex]._id);
                            justifyPillsToggle(category[nextIndex]._id);
                          }}
                        >
                          Next
                        </Button>
                      </div>
                      <div className="d-flex align-items-center ">
                        <div className="w-50">
                          <Card className=" border-none mt-3">
                            <CardBody className="p-0">
                              <div className="d-flex align-items-center mb-2 mt-4">
                                <div className="flex-grow-1 d-flex justify-content-between w-100">
                                  <h5 className="card-title mb-0">
                                    <span>
                                      {Math.floor(benchmark.completionLevel)}%{" "}
                                    </span>{" "}
                                    done
                                  </h5>
                                  <h5>
                                    {Math.ceil(100 - benchmark.completionLevel)}
                                    % to go
                                  </h5>
                                </div>
                              </div>
                              <div className="progress animated-progress custom-progress progress-label mt-3">
                                <div
                                  className="progress-bar bg- "
                                  role="progressbar"
                                  style={{
                                    width:
                                      Math.floor(benchmark.completionLevel) +
                                      "%",
                                  }}
                                  aria-valuenow={Math.floor(
                                    benchmark.completionLevel
                                  )}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {/* <div className="label">40%</div> */}
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </div>
                      <Col>
                        <div className="d-flex flex-column align-items-end">
                          <p className="w-75 text-end mb-2 ">
                            Do you consent to other users contacting you based
                            on the topics where you have answered yes?
                          </p>
                          <div class="form-check form-switch mb-2">
                            <input
                              class="form-check-input "
                              type="checkbox"
                              id="form-grid-showcode"
                              defaultChecked
                            />
                            <label
                              class="form-check-label ml-auto"
                              for="form-grid-showcode"
                            >
                              Yes
                            </label>
                          </div>
                        </div>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              if (location?.state?.isDataUpdated) {
                                // Update benchmark.user_resp based on the condition
                                const updatedUserResp = benchmark.user_resp
                                  ? [...benchmark.user_resp, ...user_resp]
                                  : user_resp;

                                // Create a new requestBody with the updated user_resp
                                const updatedRequestBody = {
                                  ...requestBody,
                                  user_resp: updatedUserResp,
                                };

                                // Call the updateUserRespSave function with the updated values
                                updateUserRespSave(
                                  benchmark?._id,
                                  updatedRequestBody
                                );
                              } else {
                                // Call the updateUserRespSave function with the original values
                                updateUserRespSave(benchmark?._id, requestBody);
                              }
                            }}
                          >
                            SAVE
                          </button>

                          <button
                            type="button"
                            onClick={handleSubmitModal}
                            className="btn btn-secondary"
                          >
                            SUBMIT
                          </button>
                        </div>
                      </Col>

                      <Modal
                        isOpen={modal_center}
                        toggle={() => {
                          tog_center();
                        }}
                        centered
                      >
                        <ModalHeader
                          className="d-flex justify-content-start"
                          style={{ border: "none" }}
                        >
                          Benchmark submission confirmation
                        </ModalHeader>
                        <ModalBody
                          className="d-flex justify-content-center"
                          style={{ fontSize: "20px" }}
                        >
                          {benchmark.user_resp?.length + user_resp?.length ===
                          benchmark?.questionnaire?.length ? (
                            <>
                              <p>
                                You have completed your benchmark. Upon
                                submission, you will be redirected to the
                                recommended actions that have been assigned to
                                you.
                              </p>
                              <p>Are you sure you want to proceed?</p>
                            </>
                          ) : (
                            <>
                              <p>
                                You have answered{" "}
                                <span style={{ fontSize: "24px" }}>
                                  {location?.state?.isDataUpdated
                                    ? benchmark.user_resp?.length +
                                      user_resp?.length
                                    : user_resp?.length}
                                </span>{" "}
                                questions out of{" "}
                                <span style={{ fontSize: "24px" }}>
                                  {benchmark?.questionnaire?.length}
                                </span>{" "}
                                questions, you will not be able to edit your
                                response after submitting. Upon submission, you
                                will be redirected to the recommended actions
                                that have been assigned to you.
                              </p>
                              <p>Are you sure you want to proceed?</p>
                            </>
                          )}
                        </ModalBody>
                        <ModalFooter className="d-flex justify-content-center">
                          <Button color="primary" onClick={handleSubmit}>
                            Confirm
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => tog_center()}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>

                      {/* <Modal
                        isOpen={benchmarkCreation}
                        toggle={cancelCreation}
                        centered
                        style={{ height: "300px" }}
                      >
                        <ModalHeader
                          toggle={cancelCreation}
                          className="d-flex justify-content-center"
                        >
                          Are you sure you want to submit your benchmark
                        </ModalHeader>
                        <ModalBody
                          className="d-flex justify-content-center"
                          style={{ fontSize: "20px" }}
                        >
                          <p>
                            You have answered{" "}
                            <span style={{ fontSize: "24px" }}>
                              {user_resp?.length}
                            </span>{" "}
                            questions out of{" "}
                            <span style={{ fontSize: "24px" }}>
                              {benchmark?.questionnaire?.length}
                            </span>{" "}
                            questions, and you will not be able to edit your
                            response after submitting
                          </p>
                        </ModalBody>
                        <ModalFooter className="d-flex justify-content-center">
                          <Button color="primary" onClick={handleSubmit}>
                            Confirm
                          </Button>
                          <Button color="secondary" onClick={cancelCreation}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal> */}
                    </div>
                  </div>
                </TabPane>
              </TabContent>
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </div>
      {/* </Layouts> */}
    </React.Fragment>
  );
};
export default Benchmarking;
