import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Layouts from "../../Layouts";
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
    // console.log("benchmark single", bench, benchmark)
    setCategory(uniqueArr);
    const benchmarkByCategory = bench?.questionnaire.filter((value, index) => {
      if (value.category?._id === arr[0]._id) return value;
    });
    setQuestions(benchmarkByCategory);
  };
  useEffect(() => {
    callApi();
    getProgressPercentage();

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

  const [user_resp, setUser_resp] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState({});
  const [selectedAnswerIds, setSelectedAnswerIds] = useState([]);

  const handleButtonClick = (
    questionIndex,
    buttonIndex,
    answerOption,
    qid,
    aid
  ) => {
    setActiveIndexes((prevState) => ({
      ...prevState,
      [questionIndex]: buttonIndex,
    }));

    setUser_resp((prevUserResp) => {
      const newUserResp = [...prevUserResp];
      const userRespIndex = newUserResp.findIndex((resp) => resp.qid === qid);

      if (userRespIndex !== -1) {
        const updatedUserResp = {
          ...newUserResp[userRespIndex],
          aid: [...newUserResp[userRespIndex].aid],
        };

        if (updatedUserResp.aid.includes(aid)) {
          // Remove the answer ID if it already exists in the array
          updatedUserResp.aid = updatedUserResp.aid.filter((id) => id !== aid);
        } else {
          // Add the answer ID if it doesn't exist in the array
          updatedUserResp.aid.push(aid);
        }

        newUserResp[userRespIndex] = updatedUserResp;
      } else {
        // Add new user response to the array
        let arr = [];
        arr.push(aid);
        newUserResp.push({
          qid: qid,
          aid: arr,
        });
      }

      return newUserResp;
    });

    console.log("user_resp", user_resp);
    // Your other logic here
  };

  //
  //  {benchmark.user_resp?.length > 0
  //   ? item.answerOptions &&
  //     item.answerOptions.map((btn, btnIndex) => (
  //       <>
  //         {btn.includeExplanation &&
  //           activeButtonIndex === btnIndex && (
  //             <div className="ck-editor-reverse">
  //               <CKEditor
  //                 editor={ClassicEditor}
  //                 onChange={(e, editor) => {
  //                   const value = editor.getData();
  //                   const div = document.createElement("div");
  //                   div.innerHTML = value;
  //                   const pValue = div.querySelector("p").innerHTML;
  //                   handleExplanationChange(pValue);
  //                 }}
  //                 validate={{
  //                   required: { value: true },
  //                 }}
  //                 class="form-control"
  //                 placeholder="Description"
  //                 id="floatingTextarea"
  //                 value={comment}
  //                 style={{
  //                   height: "120px",
  //                   overflow: "hidden",
  //                   backgroundColor: "#dfdfdf",
  //                 }}
  //               />
  //             </div>

  //             // <textarea
  //             //   type="text"
  //             //   className="w-75 p-2"
  //             //   rows={3}
  //             //   key={btnIndex}
  //             //   placeholder="Comments"
  //             //   onChange={handleExplanationChange}
  //             // />
  //           )}
  //       </>
  //     ))
  //   : item.answerOptions.map((btn, btnIndex) => (
  //       <>
  //         {/* {btn.includeExplanation && activeButtonIndex === btnIndex && ( */}

  //         {btn.includeExplanation && (
  //           <textarea
  //             type="text"
  //             className="w-75 p-2"
  //             rows={3}
  //             placeholder="Comments"
  //             onChange={handleExplanationChange}
  //           />
  //         )}
  //       </>
  //     ))}
  //

  const [flag, setFlag] = useState(true);
  const [activeButtonIndexes, setActiveButtonIndexes] = useState([]);

  const renderedQuestions =
    questions?.length >= 0 &&
    questions
      .slice((currentPage - 1) * numPages, currentPage * numPages)
      .map((item, index) => {
        const activeButtonIndex = activeIndexes[index];

        // Find the user response for the current question
        const userResponse = benchmark?.user_resp?.find(
          (resp) => resp?.questionId === item?._id
        );

        // Get the index of the selected option
        const selectedOptionIndex = item.answerOptions.findIndex(
          (option) =>
            option?._id === userResponse?.selectedOption.map((val) => val)
        );

        const selectedOption = item?.answerOptions?.find(
          (option) => option?._id === userResponse?.selectedOption[0]
        );

        return (
          <div className={rowClassName} key={index}>
            <h5>Question {item.index}</h5>
            <p className="w-75 fs-5">{item.title}</p>
            <p>{item.description}</p>
            {benchmark.user_resp?.length > 0 ? (
              <div className="d-flex mt-4">
                {item.answerOptions &&
                  item.answerOptions.map((btn, btnIndex) => {
                    // Check if the answer is already selected for the current question
                    const isSelected =
                      selectedAnswerIds[item._id]?.includes(btn._id) || false;

                    let buttonClass = "button";

                    if (
                      selectedAnswerIds[item._id] &&
                      selectedAnswerIds[item._id].includes(btn._id)
                    ) {
                      buttonClass += " active";
                    }

                    if (
                      selectedOption?._id !== undefined
                        ? selectedOption?._id === btn._id
                        : activeButtonIndex === btnIndex
                    ) {
                      buttonClass += " active";
                    }

                    // let buttonClass = "button";
                    // if (
                    //   selectedAnswerIds[item._id] &&
                    //   selectedAnswerIds[item._id].includes(btn._id)
                    // ) {
                    //   buttonClass += " active";
                    // }

                    return (
                      <div className="buttons-container" key={btnIndex}>
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
                              btn._id
                              // selectedAnswerIds[btn._id] || [] // Pass the selected answer IDs for the current question
                            );
                          }}
                          className={buttonClass}
                        >
                          {btn.answerOption}
                        </button>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="d-flex mt-4">
                {item.answerOptions &&
                  item.answerOptions.map((btn, btnIndex) => {
                    // Check if the answer is already selected for the current question
                    const isSelected =
                      selectedAnswerIds[item._id]?.includes(btn._id) || false;

                    let buttonClass = "button";
                    if (
                      selectedAnswerIds[item._id] &&
                      selectedAnswerIds[item._id].includes(btn._id)
                    ) {
                      buttonClass += " active";
                    }

                    return (
                      <div className="buttons-container" key={btnIndex}>
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
                              btn._id
                            );
                          }}
                          className={buttonClass}
                        >
                          {btn.answerOption}
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        );
      });

  const handleSubmit = () => {
    toast.success("benchmark is successfully submitted");
    dispatch(updateUserResp(benchmark?._id, user_resp, navigate));
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
                    <div className="d-flex align-items-center border-top border-dark">
                      <div className="w-50">
                        <Card className=" border-none mt-3">
                          {progressPercentage && (
                            <CardBody className="p-0">
                              <div className="d-flex align-items-center mb-2 mt-4">
                                <div className="flex-grow-1 d-flex justify-content-between w-100">
                                  <h5 className="card-title mb-0">
                                    <span>{progressPercentage}</span> Benchmark
                                    progress
                                  </h5>
                                  <h5>{100 - progressPercentage} to go!</h5>
                                </div>
                              </div>
                              <div className="progress animated-progress custom-progress progress-label mt-3">
                                <div
                                  className="progress-bar bg- "
                                  role="progressbar"
                                  style={{
                                    width: progressPercentage.toString() + "%",
                                  }}
                                  aria-valuenow={progressPercentage}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {/* <div className="label">40%</div> */}
                                </div>
                              </div>
                            </CardBody>
                          )}
                        </Card>
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
                              updateUserResp(benchmark?._id, user_resp);
                              // dispatch(
                              //   updateUserRespSave(benchmark?._id, user_resp)
                              // );
                            }}
                          >
                            SAVE
                          </button>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-secondary"
                          >
                            SUBMIT
                          </button>
                        </div>
                      </Col>
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
