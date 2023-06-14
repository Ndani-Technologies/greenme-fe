import React, { useEffect, useState } from "react";
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

    //   const bench = {
    //     "_id": "6489aadf8b0522dbfbf59a01",
    //     "title": "new-testing15",
    //     "country": "Uganda",
    //     "user": {
    //         "_id": "6468d0ebe01631c2604a2376",
    //         "email": "info@ndani.co.ke",
    //         "organization": "Fleet Forum",
    //         "firstName": "Ndani",
    //         "lastName": "Tester 1",
    //         "scope": [],
    //         "otherCountries": [
    //             "Tanzania, United Republic of",
    //             "Uganda"
    //         ],
    //         "areaOfExpertise": [],
    //         "profilePic": "https://knowledge.fleetforum.org/public/avatars/128x128_default-avatar.png",
    //         "uid": 1380,
    //         "role": {
    //             "_id": "6467ade8a992a3cf078ac815",
    //             "title": "user",
    //             "permissions": [
    //                 {
    //                     "_id": "6467adbfa992a3cf078ac810",
    //                     "title": "get user",
    //                     "route": "can get users",
    //                     "createdAt": "2023-05-19T17:11:27.244Z",
    //                     "updatedAt": "2023-05-19T17:11:27.244Z",
    //                     "__v": 0
    //                 }
    //             ],
    //             "createdAt": "2023-05-19T17:12:08.959Z",
    //             "updatedAt": "2023-05-19T17:12:08.959Z",
    //             "__v": 0
    //         },
    //         "timezone": "GMT",
    //         "state": "active",
    //         "createdAt": "2023-05-20T13:53:47.519Z",
    //         "updatedAt": "2023-06-14T11:09:12.499Z",
    //         "__v": 26,
    //         "country": "Kenya",
    //         "collaborationPoints": 0,
    //         "discussionPoints": 0,
    //         "actionPoints": 100,
    //         "backgroundPic": "https://knowledge.fleetforum.org/public/avatars/128x128_default-avatar.png",
    //         "leaderboardPosition": 2,
    //         "totalPoint": 100
    //     },
    //     "status": "Active",
    //     "questionnaire": [
    //         {
    //             "whoHasAnswer": {
    //                 "userId": [],
    //                 "totalUsers": 0
    //             },
    //             "_id": "64879027e86132c98f7921a0",
    //             "languageSelector": "English",
    //             "status": true,
    //             "visibility": true,
    //             "title": "Does your organisation have an implementation plan to translate global environmental commitments into concrete action?",
    //             "description": "<p>Environmental commitment depicts the methods, tasks, principles, and standards implemented by a business to minimize its negative impacts on the natural environment (Colwell and Joshi, 2013)</p>",
    //             "category": {
    //                 "_id": "64878ebde86132c98f79213c",
    //                 "language": "English",
    //                 "titleEng": "Environmental commitments",
    //                 "__v": 0
    //             },
    //             "answerOptions": [
    //                 {
    //                     "answerOption": {
    //                         "_id": "6487563b76c8f75525e4b37d",
    //                         "language": "English",
    //                         "answerOption": "yes",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 32
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879027e86132c98f7921a1"
    //                 },
    //                 {
    //                     "answerOption": {
    //                         "_id": "6487595b76c8f75525e4b3a5",
    //                         "language": "English",
    //                         "answerOption": "No",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 32
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879027e86132c98f7921a2"
    //                 },
    //                 {
    //                     "answerOption": {
    //                         "_id": "6487596476c8f75525e4b3a7",
    //                         "language": "English",
    //                         "answerOption": "I Don't Know",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 49
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879027e86132c98f7921a3"
    //                 }
    //             ],
    //             "__v": 0
    //         },
    //         {
    //             "whoHasAnswer": {
    //                 "userId": [],
    //                 "totalUsers": 0
    //             },
    //             "_id": "64879065e86132c98f7921bc",
    //             "languageSelector": "English",
    //             "status": true,
    //             "visibility": true,
    //             "title": "Does your fleet management reference documents (policy/ manual/ procedure/ handbook) contain references to a green strategy or environmental sustainability?",
    //             "description": "<p>For example, how to reduce emissions or waste?</p>",
    //             "category": {
    //                 "_id": "64878ebde86132c98f79213c",
    //                 "language": "English",
    //                 "titleEng": "Environmental commitments",
    //                 "__v": 0
    //             },
    //             "answerOptions": [
    //                 {
    //                     "answerOption": {
    //                         "_id": "6487563b76c8f75525e4b37d",
    //                         "language": "English",
    //                         "answerOption": "yes",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 32
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879065e86132c98f7921bd"
    //                 },
    //                 {
    //                     "answerOption": {
    //                         "_id": "6487595b76c8f75525e4b3a5",
    //                         "language": "English",
    //                         "answerOption": "No",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 32
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879065e86132c98f7921be"
    //                 },
    //                 {
    //                     "answerOption": {
    //                         "_id": "6487596476c8f75525e4b3a7",
    //                         "language": "English",
    //                         "answerOption": "I Don't Know",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 49
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879065e86132c98f7921bf"
    //                 },
    //                 {
    //                     "answerOption": {
    //                         "_id": "64878b31e86132c98f7920a3",
    //                         "language": "English",
    //                         "answerOption": "We don’t have a policy",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 5
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879065e86132c98f7921c0"
    //                 }
    //             ],
    //             "__v": 0
    //         },
    //         {
    //             "whoHasAnswer": {
    //                 "userId": [],
    //                 "totalUsers": 0
    //             },
    //             "_id": "64879138e86132c98f7922c6",
    //             "languageSelector": "English",
    //             "status": true,
    //             "visibility": true,
    //             "title": "Does your fleet management reference documents (policy/ manual/ procedure/ handbook) include guidance to use the best option vehicle with the lowest environmental impact?",
    //             "description": "<p>For example, how to reduce emissions or waste?</p>",
    //             "category": {
    //                 "_id": "64878ebde86132c98f79213c",
    //                 "language": "English",
    //                 "titleEng": "Environmental commitments",
    //                 "__v": 0
    //             },
    //             "answerOptions": [
    //                 {
    //                     "answerOption": {
    //                         "_id": "6487563b76c8f75525e4b37d",
    //                         "language": "English",
    //                         "answerOption": "yes",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 32
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879138e86132c98f7922c7"
    //                 },
    //                 {
    //                     "answerOption": {
    //                         "_id": "6487596476c8f75525e4b3a7",
    //                         "language": "English",
    //                         "answerOption": "I Don't Know",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 49
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879138e86132c98f7922c8"
    //                 },
    //                 {
    //                     "answerOption": {
    //                         "_id": "6487595b76c8f75525e4b3a5",
    //                         "language": "English",
    //                         "answerOption": "No",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 32
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879138e86132c98f7922c9"
    //                 },
    //                 {
    //                     "answerOption": {
    //                         "_id": "64878b31e86132c98f7920a3",
    //                         "language": "English",
    //                         "answerOption": "We don’t have a policy",
    //                         "includeExplanation": false,
    //                         "includeInputField": false,
    //                         "__v": 0,
    //                         "answerAttempt": 5
    //                     },
    //                     "includeExplanation": false,
    //                     "includeInputField": false,
    //                     "_id": "64879138e86132c98f7922ca"
    //                 }
    //             ],
    //             "__v": 0
    //         }

    //     ],
    //     "completionLevel": 5.882352941176471,
    //     "start_date": "2023-06-14T11:56:15.903Z",
    //     "user_resp": [
    //         // {
    //         //     "questionId": "64879027e86132c98f7921a0",
    //         //     "selectedOption": [
    //         //         {
    //         //             "answerOption": "6487596476c8f75525e4b3a7",
    //         //             "includeExplanation": "",
    //         //             "includeInputField": "",
    //         //             "_id": "6489aaf68b0522dbfbf59d85"
    //         //         }
    //         //     ],
    //         //     "_id": "6489aaf68b0522dbfbf59d84"
    //         // },
    //         {
    //             "questionId": "64879065e86132c98f7921bc",
    //             "selectedOption": [
    //                 {
    //                     "answerOption": "64878b31e86132c98f7920a3",
    //                     "includeExplanation": "",
    //                     "includeInputField": "",
    //                     "_id": "6489aaf68b0522dbfbf59d87"
    //                 },
    //                 {
    //                     "answerOption": "6487596476c8f75525e4b3a7",
    //                     "includeExplanation": "",
    //                     "includeInputField": "",
    //                     "_id": "6489aaf68b0522dbfbf59d88"
    //                 }
    //             ],
    //             "_id": "6489aaf68b0522dbfbf59d86"
    //         },
    //         // {
    //         //     "questionId": "64879138e86132c98f7922c6",
    //         //     "selectedOption": [
    //         //         {
    //         //             "answerOption": "64878b31e86132c98f7920a3",
    //         //             "includeExplanation": "",
    //         //             "includeInputField": "",
    //         //             "_id": "6489aaf68b0522dbfbf59d8a"
    //         //         },
    //         //         {
    //         //             "answerOption": "6487595b76c8f75525e4b3a5",
    //         //             "includeExplanation": "",
    //         //             "includeInputField": "",
    //         //             "_id": "6489aaf68b0522dbfbf59d8b"
    //         //         },
    //         //         {
    //         //             "answerOption": "6487596476c8f75525e4b3a7",
    //         //             "includeExplanation": "",
    //         //             "includeInputField": "",
    //         //             "_id": "6489aaf68b0522dbfbf59d8c"
    //         //         }
    //         //     ],
    //         //     "_id": "6489aaf68b0522dbfbf59d89"
    //         // }
    //     ],
    //     "__v": 0,
    //     "end_date": null
    // };
    //   setBenchmark(bench);

    const arr = [];
    bench.questionnaire.forEach((element) => {
      arr.push(element.category);
    });
    const uniqueArr = Array.from(
      new Set(arr.map((item) => item?.titleEng))
    ).map((titleEng) => arr.find((item) => item?.titleEng === titleEng));
    // console.log("benchmark single", bench, benchmark)
    if (uniqueArr.length > 0) setjustifyPillsTab(uniqueArr[0]._id);
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

  console.log(benchmark, category, "bench");
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
  const [includeExplanation, setIncludeExplanation] = useState("");
  const [includeInputField, setIncludeInputField] = useState("");

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
      const userRespIndex = newUserResp.findIndex(
        (resp) => resp.questionId === qid
      );

      if (userRespIndex !== -1) {
        const updatedUserResp = {
          ...newUserResp[userRespIndex],
          selectedOption: [...newUserResp[userRespIndex].selectedOption],
        };

        if (updatedUserResp.selectedOption.includes(aid)) {
          // Remove the answer ID if it already exists in the array
          updatedUserResp.selectedOption =
            updatedUserResp.selectedOption.filter((id) => id !== aid);
        } else {
          // Add the answer ID if it doesn't exist in the array
          updatedUserResp.selectedOption.push({
            answerOption: aid,
            includeExplanation,
            includeInputField,
          });
        }

        newUserResp[userRespIndex] = updatedUserResp;
      } else {
        // Add new user response to the array
        // let arr = [];
        // arr.push(aid);
        newUserResp.push({
          questionId: qid,
          selectedOption: [
            { answerOption: aid, includeExplanation, includeInputField },
          ],
        });
      }

      return newUserResp;
    });

    console.log("user_resp", user_resp);
    // Your other logic here
  };
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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
        console.log(userResponse, "UR");

        // Get the index of the selected option
        const selectedOptionIndex = item.answerOptions.findIndex(
          (option) =>
            option?._id === userResponse?.selectedOption.map((val) => val)
        );

        const selectedOption = userResponse?.selectedOption.filter(
          // (option) => option?._id === userResponse?.selectedOption[0]
          (selct) =>
            item?.answerOptions?.find((option) => {
              console.log(
                "check",
                option.answerOption.answerOption,
                selct.answerOption,
                option.answerOption._id,
                selct.answerOption === option.answerOption._id
              );
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
            {/* {selectedAnswer ?
            <>
             <div className="">
                  <CKEditor
                    editor={ClassicEditor}
                    onReady={(editor) => {
                    }}
                    onChange={(e, editor) => {
                      const value = editor.getData();
                    }}
                    onBlur={(e, editor) => {
                      const value = editor.getData();
                    }}
                    validate={{
                      required: { value: true },
                    }}
                    class="form-control"
                    placeholder="Description"
                    id="floatingTextarea"
                    value=''
                    style={{
                      height: "120px",
                      overflow: "hidden",
                      backgroundColor: "#dfdfdf",
                    }}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    className="form-control"
                    id="input-field"
                    placeholder=""
                    value=''
                    onChange={(e) => {
                     
                    }}
                    onBlur={(e)=>{}}
                     
                  />
                </div>
            </>
            : null  
          } */}
            {benchmark.user_resp?.length > 0 ? (
              <div className="d-flex mt-4">
                {item.answerOptions &&
                  item.answerOptions.map((btn, btnIndex) => {
                    // Check if the answer is already selected for the current question
                    console.log("selected", selectedOption);
                    const isSelected =
                      selectedAnswerIds[item._id]?.includes(
                        btn.answerOption._id
                      ) || false;

                    let buttonClass = "button";

                    if (
                      selectedAnswerIds[item._id] &&
                      selectedAnswerIds[item._id].includes(btn.answerOption._id)
                    ) {
                      buttonClass += " active";
                    }
                    const check = selectedOption?.some(
                      (a) => a.answerOption !== undefined
                    )
                      ? selectedOption?.some(
                          (a) => a.answerOption === btn.answerOption._id
                        )
                      : activeButtonIndex === btnIndex;
                    if (check) {
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
                      <div>
                        {isSelected ? (
                          <>
                            {btn.includeExplanation && (
                              <div className="">
                                <CKEditor
                                  editor={ClassicEditor}
                                  onReady={(editor) => {}}
                                  onChange={(e, editor) => {
                                    const value = editor.getData();
                                    setIncludeExplanation(value);
                                  }}
                                  onBlur={(e, editor) => {
                                    const value = editor.getData();
                                    setIncludeExplanation(value);
                                  }}
                                  validate={{
                                    required: { value: true },
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
                            {btn.includeInputField && (
                              <div>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="input-field"
                                  placeholder=""
                                  value={includeInputField}
                                  onChange={(e) => {
                                    setIncludeInputField(e.target.value);
                                  }}
                                  onBlur={(e) => {
                                    setIncludeInputField(e.target.value);
                                  }}
                                />
                              </div>
                            )}
                          </>
                        ) : null}
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
                            {btn.answerOption.answerOption}
                          </button>
                        </div>
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
                      <>
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
                                      setIncludeExplanation(value);
                                    }}
                                    onBlur={(e, editor) => {
                                      const value = editor.getData();
                                      setIncludeExplanation(value);
                                    }}
                                    validate={{
                                      required: { value: true },
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
                              {btn.includeInputField && (
                                <div>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="input-field"
                                    placeholder=""
                                    value={includeInputField}
                                    onChange={(e) => {
                                      setIncludeInputField(e.target.value);
                                    }}
                                    onBlur={(e) => {
                                      setIncludeInputField(e.target.value);
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
                                setSelectedAnswerIds(
                                  (prevSelectedAnswerIds) => {
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
                                  }
                                );

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
                      </>
                    );
                  })}
              </div>
            )}
          </div>
        );
      });

  const obj = JSON.parse(sessionStorage.getItem("authUser"));
  const userId = obj._id;
  const requestBody = {
    userId: userId,
    user_resp: user_resp,
  };

  const handleSubmit = () => {
    toast.success("benchmark is successfully submitted");

    updateUserResp(benchmark?._id, requestBody, navigate);
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
                            {progressPercentage && (
                              <CardBody className="p-0">
                                <div className="d-flex align-items-center mb-2 mt-4">
                                  <div className="flex-grow-1 d-flex justify-content-between w-100">
                                    <h5 className="card-title mb-0">
                                      <span>{progressPercentage}</span>{" "}
                                      Benchmark progress
                                    </h5>
                                    <h5>{100 - progressPercentage} to go!</h5>
                                  </div>
                                </div>
                                <div className="progress animated-progress custom-progress progress-label mt-3">
                                  <div
                                    className="progress-bar bg- "
                                    role="progressbar"
                                    style={{
                                      width:
                                        progressPercentage.toString() + "%",
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
                              updateUserRespSave(benchmark?._id, requestBody);
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
                          className="d-flex justify-content-start"
                          style={{ border: "none" }}
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

                      <Modal
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
                      </Modal>
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
