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
    console.log("benchmark by cateogry", benchmarkByCategory);
    setQuestions(benchmarkByCategory);
  };
  useEffect(() => {
    callApi();
    getProgressPercentage();

    // setBenchmark(benchmarkByCategory);
  }, []);

  const getProgressPercentage = async () => {
    const obj = JSON.parse(sessionStorage.getItem("authUser"));
    console.log(obj, "user object");
    const res = await getUserProgress(obj._id);
    console.log(res, "percentage API result");
    setProgressPercentage(res);
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
      console.log("benchmark by cateogry", benchmarkByCategory);
      setQuestions(benchmarkByCategory);
      setjustifyPillsTab(tab);
    }
  };
  const [comment, SetComment] = useState("");
  const handleExplanationChange = (event) => {
    const { value } = event.target;
    SetComment(value);
  };

  const [activeIndexes, setActiveIndexes] = useState({});
  const [user_resp, setUser_resp] = useState([]);

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
    const mapData = {
      questionId: qid,
      selectedOption: aid,
      comment: comment,
    };
    setUser_resp([...user_resp, mapData]);
    console.log("mapdata user resp", mapData);
    // Your other logic here
  };
  const [flag, setFlag] = useState(true);
  const [activeButtonIndexes, setActiveButtonIndexes] = useState([]);

  let [benchmark2, setBenchmark2] = useState({
    title: "Benchmark",
    status: "Active",
    completion_level: 100,
    country: "uk",
    start_date: "2023-05-24T13:46:12.874Z",
    end_data: "2023-05-24T17:48:52.227Z",
    _id: "646e1524d4faa913432362b3",
    user: {
      _id: "6468d0ebe01631c2604a2376",
      email: "info@ndani.co.ke",
      organization: "Fleet Forum",
      firstName: "Ndani",
      lastName: "Tester 1",
      scope: [],
      otherCountries: [],
      areaOfExpertise: [],
      profilePic:
        "https://knowledge.fleetforum.org/public/avatars/128x128_default-avatar.png",
      uid: 1380,
      role: {
        _id: "6467ade8a992a3cf078ac815",
        title: "user",
        permissions: [
          {
            _id: "6467adbfa992a3cf078ac810",
            title: "get user",
            route: "can get users",
            createdAt: "2023-05-19T17:11:27.244Z",
            updatedAt: "2023-05-19T17:11:27.244Z",
            __v: 0,
          },
        ],
        createdAt: "2023-05-19T17:12:08.959Z",
        updatedAt: "2023-05-19T17:12:08.959Z",
        __v: 0,
      },
      timezone: "GMT",
      state: "active",
      createdAt: "2023-05-20T13:53:47.519Z",
      updatedAt: "2023-05-22T13:12:21.765Z",
      __v: 0,
      country: "",
    },
    questionnaire: [
      {
        whoHasAnswer: {
          userId: [],
          totalUsers: 0,
        },
        _id: "646debeea8104724da361852",
        languageSelector: "English",
        status: true,
        visibility: true,
        title:
          "Does your fleet management reference documents (policy/ manual/ procedure/ handbook) contain references to a green strategy or environmental sustainability? ",
        description: "For example, how to reduce emissions or waste?",
        category: {
          _id: "646ba306f9cf2ce9b1d5669d",
          language: "English",
          titleEng: "Data",
          __v: 0,
        },
        answerOptions: [
          {
            _id: "646d05b2a8104724da360f73",
            language: "English",
            answerOption: "Yes",
            includeExplanation: false,
            __v: 0,
          },
          {
            _id: "646d05b5a8104724da360f75",
            language: "English",
            answerOption: "No",
            includeExplanation: false,
            __v: 0,
          },
          {
            _id: "646b4ba4be4f8222b0b44b8d",
            language: "English",
            answerOption: "We don't have a policy",
            includeExplanation: false,
            __v: 0,
          },
        ],
        __v: 1,
      },
      {
        whoHasAnswer: {
          userId: [],
          totalUsers: 0,
        },
        _id: "646decb2a8104724da36186f",
        languageSelector: "English",
        status: true,
        visibility: true,
        title:
          "Does your fleet management reference documents (policy/ manual/ procedure/ handbook) include guidance to use the best option vehicle with the lowest environmental impact? ",
        description:
          "Does your fleet management reference documents (policy/ manual/ procedure/ handbook) include guidance to use the best option vehicle with the lowest environmental impact? ",
        category: {
          _id: "646ba306f9cf2ce9b1d5669d",
          language: "English",
          titleEng: "Data",
          __v: 0,
        },
        answerOptions: [
          {
            _id: "646d05b2a8104724da360f73",
            language: "English",
            answerOption: "Yes",
            includeExplanation: false,
            __v: 0,
          },
          {
            _id: "646d05b5a8104724da360f75",
            language: "English",
            answerOption: "No",
            includeExplanation: false,
            __v: 0,
          },
          {
            _id: "646b4ba4be4f8222b0b44b8d",
            language: "English",
            answerOption: "We don't have a policy",
            includeExplanation: false,
            __v: 0,
          },
        ],
        __v: 0,
      },
    ],
    completionLevel: 100,
    user_resp: [
      {
        questionId: "646debeea8104724da361852",
        selectedOption: "646d05b5a8104724da360f75",
        comment: "",
        _id: "646e4e04d4faa9134323699a",
      },
      {
        questionId: "646decb2a8104724da36186f",
        selectedOption: "646b4ba4be4f8222b0b44b8d",
        comment: "",
        _id: "646e4e04d4faa9134323699b",
      },
    ],
    __v: 0,
    end_date: "2023-05-24T17:48:52.227Z",
  });
  const renderedQuestions =
    questions?.length >= 0 &&
    questions
      .slice((currentPage - 1) * numPages, currentPage * numPages)
      .map((item, index) => {
        const activeButtonIndex = activeIndexes[index];

        // Find the user response for the current question
        const userResponse = benchmark.user_resp.find(
          (resp) => resp.questionId === item?._id
        );
        console.log("userResponse", userResponse);
        // Get the index of the selected option
        const selectedOptionIndex = item.answerOptions.findIndex(
          (option) => option?._id === userResponse?.selectedOption
        );
        const selectedOption = item.answerOptions.find(
          (option) => option?._id === userResponse?.selectedOption
        );
        return (
          <div className="row w-50" key={index}>
            <h5>Question {item.index}</h5>
            <p className="w-75 fs-5">{item.title}</p>
            <p>{item.description}</p>
            {benchmark.user_resp?.length > 0
              ? item.answerOptions &&
                item.answerOptions.map((btn, btnIndex) => (
                  <>
                    {btn.includeExplanation &&
                      activeButtonIndex === btnIndex && (
                        <textarea
                          type="text"
                          className="w-75 p-2"
                          rows={3}
                          key={btnIndex}
                          placeholder="Comments"
                          onChange={handleExplanationChange}
                        />
                      )}
                  </>
                ))
              : item.answerOptions.map((btn, btnIndex) => (
                  <>
                    {/* {btn.includeExplanation && activeButtonIndex === btnIndex && ( */}

                    {btn.includeExplanation && (
                      <textarea
                        type="text"
                        className="w-75 p-2"
                        rows={3}
                        placeholder="Comments"
                        onChange={handleExplanationChange}
                      />
                    )}
                  </>
                ))}

            {benchmark.user_resp?.length > 0 ? (
              <div className="d-flex mt-4">
                {item.answerOptions &&
                  item.answerOptions.map((btn, btnIndex) => {
                    let isSelected;
                    // let isCheck =!seletectedArrayIndexes.includes(index)
                    // if( flag) {
                    //   console.log("question", index, "button", btn.answerOption,btnIndex, "selected", selectedOptionIndex )
                    //   isSelected = selectedOptionIndex === btnIndex;
                    //   seletectedArrayIndexes.push(index)
                    // }
                    console.log("isSelected", isSelected);
                    // const isUserResponse =
                    //   userResponse?.selectedOption === btn?._id;

                    let buttonClass =
                      selectedOption?._id !== undefined
                        ? selectedOption?._id === btn._id
                          ? "button active"
                          : "button "
                        : activeButtonIndex === btnIndex
                        ? "button active"
                        : "button ";
                    // let buttonClass = index == btnIndex ? "button active" : "button"

                    return (
                      <div className="buttons-container" key={btnIndex}>
                        <button
                          onClick={() => {
                            // setFlag(selectedOptionIndex == userResponse?.selectedOption)
                            // isSelected = false
                            setBenchmark((prevState) => {
                              // find index of the current user response
                              const userRespIndex =
                                prevState.user_resp.findIndex(
                                  (resp) => resp.questionId === item._id
                                );
                              // copy previous state
                              const newUserResp = [...prevState.user_resp];
                              // update selectedOption of the current user response
                              newUserResp[userRespIndex] = {
                                ...newUserResp[userRespIndex],
                                selectedOption: btn._id,
                              };
                              // return new state
                              return {
                                ...prevState,
                                user_resp: newUserResp,
                              };
                            });
                            handleButtonClick(
                              (currentPage - 1) * numPages + index,
                              btnIndex,
                              btn.answerOption,
                              item?._id,
                              btn?._id
                            );

                            console.log(
                              "isSelected2",
                              selectedOption?._id,
                              selectedOption?._id !== undefined
                                ? selectedOption?._id === btn._id
                                  ? "button active1"
                                  : "button1 "
                                : activeButtonIndex === btnIndex
                                ? "button active2"
                                : "button2 "
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
                  item.answerOptions.map((btn, btnIndex) => (
                    <div className="buttons-container" key={btnIndex}>
                      <button
                        className={`button ${
                          activeButtonIndex === btnIndex ? "active" : ""
                        }`}
                        onClick={() =>
                          handleButtonClick(
                            (currentPage - 1) * numPages + index,
                            btnIndex,
                            btn.answerOption,
                            item?._id,
                            btn?._id
                          )
                        }
                      >
                        {btn.answerOption}
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
      });

  // const renderedQuestions =
  //   benchmark?.questionnaire?.length > 0 &&
  //   benchmark.questionnaire.map((item, qid) => {
  //     let isHighlighted;
  //     const activeButtonIndex = activeIndexes[qid];

  //     const userResponse = benchmark.user_resp.find(
  //       (resp) => resp.questionId === item?._id
  //     );
  //     const selectedOptionIndex = item.answerOptions.findIndex(
  //       (option) => option?._id === userResponse?.selectedOption
  //     );
  //     const selectedOption = item.answerOptions.find(
  //       (option) => option?._id === userResponse?.selectedOption
  //     );
  //     return (
  //       <div className="row w-50 " key={qid}>
  //         <h5>Question {qid + 1}</h5>
  //         <p className="w-75 fs-5">{item.title}</p>
  //         <p>{item.description}</p>
  //         <div className="d-flex gap-2">
  //           {benchmark.user_resp.length > 0
  //             ? item.answerOptions.length > 0 &&
  //               item.answerOptions.map((btn, buttonIndex) => {
  //                 let buttonClass =
  //                   selectedOption?._id === btn._id
  //                     ? "button active"
  //                     : "button ";
  //                 return (
  //                   <div>
  //                     {btn.includeExplanation && (
  //                       <textarea
  //                         type="text"
  //                         className="w-75 p-2"
  //                         rows={3}
  //                         placeholder="Comments"
  //                       />
  //                     )}
  //                     <div className="d-flex mt-4">
  //                       <div className="buttons-container" key={buttonIndex}>
  //                         {console.log(
  //                           "button checks",
  //                           selectedOptionIndex,
  //                           buttonIndex,
  //                           selectedOptionIndex === buttonIndex
  //                         )}

  //                         <button
  //                           className={buttonClass}
  //                           onClick={() => {
  //                             setBenchmark((prevState) => {
  //                               // find index of the current user response
  //                               const userRespIndex =
  //                                 prevState.user_resp.findIndex(
  //                                   (resp) => resp.questionId === item._id
  //                                 );
  //                               // copy previous state
  //                               const newUserResp = [...prevState.user_resp];
  //                               // update selectedOption of the current user response
  //                               newUserResp[userRespIndex] = {
  //                                 ...newUserResp[userRespIndex],
  //                                 selectedOption: btn._id,
  //                               };
  //                               // return new state
  //                               return {
  //                                 ...prevState,
  //                                 user_resp: newUserResp,
  //                               };
  //                             });
  //                             const mapData = {
  //                               questionId: item._id,
  //                               selectedOption: btn._id,
  //                               comment: "",
  //                             };
  //                             setUser_resp([...user_resp, mapData]);
  //                           }}
  //                         >
  //                           {btn.answerOption}
  //                         </button>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 );
  //               })
  //             : item.answerOptions.length > 0 &&
  //               item.answerOptions.map((btn, buttonIndex) => {
  //                 let buttonClass =
  //                   selectedOption?._id === btn._id
  //                     ? "button active"
  //                     : "button ";
  //                 return (
  //                   <div>
  //                     {btn.includeExplanation && (
  //                       <textarea
  //                         type="text"
  //                         className="w-75 p-2"
  //                         rows={3}
  //                         placeholder="Comments"
  //                       />
  //                     )}
  //                     <div className="d-flex mt-4">
  //                       <div className="buttons-container" key={buttonIndex}>
  //                         <button
  //                           className={`button ${
  //                             activeButtonIndex === buttonIndex ? "active" : ""
  //                           }`}
  //                           onClick={() => {
  //                             setActiveIndexes((prevState) => ({
  //                               ...prevState,
  //                               [qid]: buttonIndex,
  //                             }));
  //                             const mapData = {
  //                               questionId: item._id,
  //                               selectedOption: btn._id,
  //                               comment: "",
  //                             };
  //                             setUser_resp([...user_resp, mapData]);
  //                           }}
  //                         >
  //                           {btn.answerOption}
  //                         </button>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 );
  //               })}
  //         </div>
  //       </div>
  //     );
  //   });
  const handleSubmit = () => {
    console.log("here");
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
                        {/* <Pagination className="mt-4">
                          <PaginationItem>
                            <PaginationItem disabled={currentPage === 1}>
                              {" "}
                              <PaginationLink
                                to="#"
                                onClick={() =>
                                  setCurrentPage(() => currentPage - 1)
                                }
                              >
                                {" "}
                                ← &nbsp; prev{" "}
                              </PaginationLink>{" "}
                            </PaginationItem>
                          </PaginationItem>
                          <PaginationItem>
                            {" "}
                            <PaginationLink
                              to="#"
                              onClick={() => setCurrentPage(1)}
                            >
                              {" "}
                              1{" "}
                            </PaginationLink>{" "}
                          </PaginationItem>
                          <PaginationItem>
                            {" "}
                            <PaginationLink
                              to="#"
                              onClick={() => setCurrentPage(2)}
                            >
                              {" "}
                              2{" "}
                            </PaginationLink>{" "}
                          </PaginationItem>
                          <PaginationItem>
                            {" "}
                            <PaginationLink
                              to="#"
                              onClick={() => setCurrentPage(3)}
                            >
                              {" "}
                              3{" "}
                            </PaginationLink>{" "}
                          </PaginationItem>
                          <PaginationItem>
                            {" "}
                            <PaginationLink
                              to="#"
                              disabled={currentPage === numPages}
                              onClick={() =>
                                setCurrentPage(() => currentPage + 1)
                              }
                            >
                              {" "}
                              Next &nbsp; →{" "}
                            </PaginationLink>{" "}
                          </PaginationItem>
                        </Pagination> */}
                        <Card className=" border-none mt-3">
                          {progressPercentage.percentage && (
                            <CardBody className="p-0">
                              <div className="d-flex align-items-center mb-2 mt-4">
                                <div className="flex-grow-1 d-flex justify-content-between w-100">
                                  <h5 className="card-title mb-0">
                                    <span>
                                      {progressPercentage?.percentage}
                                    </span>{" "}
                                    Benchmark progress
                                  </h5>
                                  <h5>
                                    {100 - progressPercentage?.percentage} to
                                    go!
                                  </h5>
                                </div>
                              </div>
                              <div className="progress animated-progress custom-progress progress-label mt-3">
                                <div
                                  className="progress-bar bg- "
                                  role="progressbar"
                                  style={{
                                    width:
                                      progressPercentage.percentage.toString() +
                                      "%",
                                  }}
                                  aria-valuenow={progressPercentage.percentage}
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
                              dispatch(
                                updateUserRespSave(
                                  benchmark?._id,
                                  user_resp,
                                  navigate
                                )
                              );
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
            </CardBody>
          </Card>
        </Col>
      </div>
      {/* </Layouts> */}
    </React.Fragment>
  );
};
export default Benchmarking;
