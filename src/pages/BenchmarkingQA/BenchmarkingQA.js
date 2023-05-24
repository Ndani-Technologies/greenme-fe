import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as moment from "moment";
import axios from "axios";
import {
  Col,
  Card,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter,
  Table,
  FormFeedback,
  Button,
  CardBody,
} from "reactstrap";
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
  getAllQA,
  getAllAnswers,
  getAllCategories,
  updateAnswer,
  deleteAnswer,
  addAnswer,
  addCategory,
  deleteCategory,
  updateCategory,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../slices/thunks";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import Select from "react-select";
import Layouts from "../../Layouts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import dummyImg from "../../assets/images/users/user-dummy-img.jpg";
import { Category, Language } from "@mui/icons-material";
import { languages } from "prismjs";
import { lineHeight } from "@mui/system";
import { Checkbox, TextField } from "@mui/material";
import { Link } from "feather-icons-react/build/IconComponents";
import { ToastContainer, toast } from "react-toastify";

const BenchmarkingQA = () => {
  // const [isGrey, setIsGrey] = useState(false);
  // const [isGrey2, setIsGrey2] = useState(false);
  // const [isGrey3, setIsGrey3] = useState(false);
  // const [isGrey4, setIsGrey4] = useState(false);
  // const [isGrey5, setIsGrey5] = useState(false);
  const [questionId, setQuestionId] = useState(null);
  const dispatch = useDispatch();
  const { crmcontacts, isContactCreated, isContactSuccess, error } =
    useSelector((state) => ({
      crmcontacts: state.Crm.crmcontacts,
      isContactCreated: state.Crm.isContactCreated,
      isContactSuccess: state.Crm.isContactSuccess,
      error: state.Crm.error,
    }));
  const [qa, setQA] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const allQA = () => {
    console.log("Inside All QA");
    getAllQA()
      .then((resp) => setQA(resp))
      .catch((err) => console.log("qa all error", err));
    getAllAnswers()
      .then((resp) => setAllAnswers(resp))
      .catch((err) => console.log("answer all error", err));
    getAllCategories()
      .then((resp) => setAllCategories(resp))
      .catch((err) => console.log("category all error", err));
  };

  useEffect(() => {
    allQA();
  }, []);
  useEffect(() => {
    dispatch(onGetContacts(crmcontacts));
  }, [dispatch, crmcontacts]);
  useEffect(() => {
    setContact(qa);
  }, [crmcontacts]);

  useEffect(() => {
    if (!isEmpty(crmcontacts)) {
      setContact(crmcontacts);
      setIsEdit(false);
    }
  }, [crmcontacts]);

  const [isEdit, setIsEdit] = useState(false);
  const [contact, setContact] = useState([]);

  //delete Conatct
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setContact(null);
    } else {
      setModal(true);
      // setTag([]);
    }
  }, [modal]);

  const onClickDelete = (contact) => {
    setContact(contact);
    setDeleteModal(true);
  };

  // Add Data
  const handleContactClicks = () => {
    setContact("");
    setIsEdit(false);
    toggle();
  };

  // Date & Time Format

  const dateFormat = () => {
    var d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    return d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();
  };
  const timeFormat = () => {
    let d = new Date();
    let minutes =
      d.getMinutes().toString().length === 1
        ? "0" + d.getMinutes()
        : d.getMinutes();
    let hours = d.getHours().toString() % 12 || 12;
    hours = hours <= 9 ? (hours = "0" + hours) : hours;
    let ampm = d.getHours() >= 12 ? "PM" : "AM";
    return hours + ":" + minutes + ampm;
  };

  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: "",
      status: true,
      visibility: true,
      description: "",
      category: "",
      answerOption: [],
      includeExplanation: false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter title"),
      description: Yup.string().required("Please Enter description"),
      category: Yup.string().required("Please select category"),
    }),
    onSubmit: async (values) => {
      const cd = allCategories.find((value) => {
        console.log(
          "categories",
          value.titleEng,
          values.category,
          value.titleEng.toString().includes(values.category)
        );
        if (value.titleEng.toString().includes(values.category)) return value;
      });

      const answerIds = [];
      values?.answerOption.length &&
        values?.answerOption.forEach((value) => {
          allAnswers.forEach((val) => {
            if (value === val.answerOption) {
              answerIds.push(val._id);
            }
            validation.setValues(answerIds);
          });
        });
      const mappedData = {
        ...values,
        category: cd?._id,
        answerOptions: answerIds,
        status: "active" ? true : false,
        visibility: "True" ? true : false,
        // response: parseInt(values.response.split("%")[0]),
      };
      if (isDataUpdated) {
        updateQuestion(questionId, mappedData)
          .then((resp) => {
            getAllQA()
              .then((resp) => setQA(resp))
              .catch((err) => console.log("qa all error", err));
            toast.success("Successfully Updated");
          })
          .catch((err) => {
            toast.error(`Error in updating question`);
          });
      } else {
        addQuestion(mappedData, values.category)
          .then((resp) => {
            toast.success("Successfully Added");

            setQA([...qa, resp]);
            setSelectedIndexes([]);
            validation.resetForm();
          })
          .catch((err) => {
            toast.error(`Error in adding question ${err}`);
          });
      }

      setIsDataUpdated(false);
      console.log("values formik", mappedData);
      setmodal_grid(false);

      toggle();
    },
  });

  // Update Data
  const handleContactClick = useCallback(
    (arg) => {
      const contact = arg;

      setContact({
        contactId: contact.contactId,
        // img: contact.img,
        name: contact.name,
        response: contact.reeponse,
        company: contact.company,
        email: contact.email,
        designation: contact.designation,
        phone: contact.phone,
        lead_score: contact.lead_score,
        last_contacted: contact.date,
        // time: contact.time,
        tags: contact.tags,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".contactCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);
  const [selectedAnswerOptions, setSelectedAnswerOptions] = useState([]);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(onDeleteContact(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".contactCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  // Column
  const columns = useMemo(
    () => [
      {
        Cell: (cellProps) => {
          return (
            <input
              type="checkbox"
              className="contactCheckBox form-check-input"
              value={cellProps.row.original._id}
              onChange={() => deleteCheckbox()}
            />
          );
        },
        id: "#",
      },
      {
        Header: "Question title",
        accessor: "title",
        filterable: false,
        // Cell: (contact) => (
        //   <>
        //     <div className="d-flex align-items-center">
        //       <div className="flex-shrink-0"></div>
        //       <div className="flex-grow-1 ms-2 name">
        //         {contact.row.original.name}
        //       </div>
        //     </div>
        //   </>
        // ),
      },
      {
        Header: "Category",
        accessor: "category",
        filterable: false,
      },
      {
        Header: "Who has answered",
        accessor: "answered",
      },
      // {
      //   Header: "Status",
      //   accessor: "status",
      // },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Question Visibility",
        accessor: "visibility",
        // filterable: false,
      },
      {
        Header: "Response %",
        accessor: "response",
        // filterable: false,
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          const { _id } = cellProps.row.original;
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <UncontrolledDropdown>
                  <DropdownToggle
                    href="#"
                    className="btn btn-soft-secondary btn-sm dropdown"
                    tag="button"
                  >
                    <i className="ri-more-fill align-middle"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem
                      className="dropdown-item"
                      href={`/adminbenchmarking/questions/summary/${_id}`}
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      View
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData.answerOptions);
                        console.log("contact row", contactData);
                        // const data = contactData.map((value)=>{
                        //   return {
                        //     ...value,
                        //     answerOption
                        //   }
                        // })
                        validation.setValues(contactData);
                        setSelectedIndexes(contactData.answerOptions);
                        setQuestionId(cellProps.row.original._id);
                        setIsDataUpdated(true);
                        setmodal_grid(true);
                      }}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        handleContactClick(contactData);
                      }}
                    >
                      Reset
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        handleContactClick(contactData);
                      }}
                    >
                      Complete
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item remove-item-btn"
                      href="#"
                      onClick={() => {
                        setDeleteId(cellProps.row.original._id);
                        setDeleteConfirmation3(true);
                        // const contactData = cellProps.row.original;
                        // onClickDelete(contactData);
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleContactClick, checkedAll]
  );

  // SideBar Contact Deatail
  const [info, setInfo] = useState([]);

  // Export Modal
  const [modal_grid, setmodal_grid] = useState(false);
  function tog_grid() {
    setmodal_grid(!modal_grid);
  }
  const [modals_Answer, setmodals_Answer] = useState(false);
  function tog_Answer() {
    setmodals_Answer(!modals_grid);
  }

  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [inputFields, setInputFields] = useState("");
  const handleEdits = (AnswerId) => {
    setEditingAnswerId(AnswerId);
    const Answer = allAnswers.find((c) => c._id === AnswerId);
    setInputFields(Answer.answerOption);
  };

  const handleUpdates = () => {
    const updatedAnswerName = inputFields;
    updateAnswer(editingAnswerId, { answerOption: updatedAnswerName })
      .then(() => {
        const updatedAnswers = allAnswers.map((c) => {
          if (c._id === editingAnswerId) {
            return { ...c, answerOption: updatedAnswerName };
          }
          return c;
        });
        toast.success("successfully Updated");
        setAllAnswers(updatedAnswers);
      })
      .catch((err) => {
        toast.error("Error in updating answer");
        console.log("error in updating answer", err);
      });
    setEditingAnswerId(null);
    setInputFields("");
  };

  // const [updAnswers, setUpdAnswers] = useState([]);
  // const [updCategories, setUpdCategories] = useState([]);

  const handleAnswerAdd = () => {
    const newName = inputFields;
    if (newName) {
      const newAnswer = {
        answerOption: newName,
        includeExplanation: false,
      };
      addAnswer(newAnswer)
        .then((resp) => {
          toast.success("Aded successfully");
          setAllAnswers([...allAnswers, resp]);
        })
        .catch((err) => {
          toast.error("Unable to update");
          console.log("adding in answer", err);
        });
      setInputFields("");
    }
  };

  const handleDeletes = (AnswerId, id) => {
    setEditingAnswerId(AnswerId);

    setDeleteConfirmation(true);
  };

  const confirmDelete = (AnswerId, id) => {
    deleteAnswer(editingAnswerId)
      .then(() => {
        const updatedAnswers = allAnswers.filter((c) => {
          return c._id != editingAnswerId;
        });
        setAllAnswers(updatedAnswers);
      })
      .catch((err) => console.log("error in deleting answer", err));
    setDeleteConfirmation(false);
    setDeleteId(null);
  };
  const [modals_grid, setmodals_grid] = useState(false);
  function tog_grids() {
    setmodals_grid(!modals_grid);
  }
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const handleClick = (language) => {
    setSelectedLanguage(language);
  };

  const [categories, setCategories] = useState([
    { id: 1, name: "General" },
    { id: 2, name: "Data Section" },
    { id: 3, name: "Vehicle Profile" },
    { id: 4, name: "Occupancy & Utilsation Rates" },
    { id: 5, name: "Other" },
  ]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [inputField, setInputField] = useState("");

  const handleAdd = () => {
    const newCategoryName = inputField;
    if (newCategoryName) {
      const newCategory = {
        titleEng: newCategoryName,
      };
      addCategory(newCategory)
        .then((resp) => {
          toast.success("Successfully Added");

          setAllCategories([...allCategories, resp]);
        })
        .catch((err) => {
          toast.error("Unable to Update");
          console.log("error in adding category", err);
        });
      setInputField("");
    }
  };
  const handleEdit = (categoryId) => {
    setEditingCategoryId(categoryId);
    const category = allCategories.find((c) => c._id === categoryId);
    setInputField(category.titleEng);
  };

  const handleUpdate = () => {
    const updatedCategoryName = inputField;
    const mappedData = {
      titleEng: updatedCategoryName,
    };
    updateCategory(editingCategoryId, mappedData)
      .then((resp) => {
        const updatedCategories = allCategories.map((c) => {
          if (c._id === editingCategoryId) {
            return { ...c, titleEng: updatedCategoryName };
          }
          return c;
        });
        toast.success("Successfully Updated");
        setAllCategories(updatedCategories);
      })
      .catch((err) => {
        toast.error("Unable to Update");
        console.log("err in updating category", err);
      });
    setEditingCategoryId(null);
    setInputField("");
  };
  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirmation2(true);
  };
  const confirmDelete2 = () => {
    deleteCategory(deleteId)
      .then((resp) => {
        const updatedCategories = allCategories.filter(
          (c) => c._id !== deleteId
        );
        setAllCategories(updatedCategories);
      })
      .catch((err) => console.log("err in deleteing category", err));
    setDeleteConfirmation2(false);
    setDeleteId(null);
  };
  const confirmDelete3 = () => {
    deleteQuestion(deleteId)
      .then(() => {
        setQA((prev) => prev.filter((value) => value._id !== deleteId));
      })
      .catch((err) => toast.error("Error in deletion"));
    setDeleteConfirmation3(false);
    setDeleteId(null);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(allAnswers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAllAnswers(items);
  };
  const handleDragEnds = (result) => {
    if (!result.destination) {
      return;
    }

    const newCategories = [...categories];
    const draggedCategory = newCategories[result.source.index];

    newCategories.splice(result.source.index, 1);
    newCategories.splice(result.destination.index, 0, draggedCategory);

    setCategories(newCategories);
  };
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteConfirmation2, setDeleteConfirmation2] = useState(false);
  const [deleteConfirmation3, setDeleteConfirmation3] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setDeleteId(null);
  };
  const cancelDelete2 = () => {
    setDeleteConfirmation2(false);
    setDeleteId(null);
  };
  const cancelDelete3 = () => {
    setDeleteConfirmation3(false);
    setDeleteId(null);
  };
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedIndexes2, setSelectedIndexes2] = useState(info);

  document.title = "Benchmaking QA | GreenMe";
  return (
    <React.Fragment>
      {/* <Layouts> */}
      <div className="page-content overflow-auto ">
        <div className="Main  mx-n4 mt-n4 w-100 pb-4">
          <h1>
            Benchmarking Q&A Management <span className="fs-5">Admin</span>
          </h1>
          <p style={{ color: "#BEC887" }}>
            This is page where an admin user can create and edit Benchmarking
            categories, Questions <br /> and manage the type of answering
            criteria for users.
          </p>
        </div>
        <Col xxl={9} className="m-auto">
          <div className="d-flex justify-content-between align-items-center w-100">
            <Col className="pt-5">
              <Button
                className="d-flex align-items-center justify-content-between p-3 bg-white shadow-lg p-3 mb-5 rounded"
                color="white"
                onClick={() => setmodal_grid(true)}
                style={{ width: "270px" }}
              >
                Create new Question
                <i class="ri-add-fill"></i>
              </Button>
              <Modal
                size="lg p-5"
                className="postion-relative m-0 float-end"
                isOpen={modal_grid}
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
                      validation.resetForm();
                      setIsDataUpdated(false);
                      setmodal_grid(false);
                    }}
                    className="btn-close color-black bg-white border border-dark rounded-circle "
                    aria-label="close"
                  ></Button>
                </div>
                <ModalHeader className="border-bottom border-dark p-4 pt-0">
                  <h4 className="modal-title">Create new Question</h4>
                </ModalHeader>
                <ModalBody>
                  <form
                    className="p-4 pt-2 pb-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
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
                                name="status"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                checked={validation.values.status}
                                style={{
                                  backgroundColor: validation.values.status
                                    ? "#88C756"
                                    : "#fff",
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
                                name="visibility"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                checked={validation.values.visibility}
                                style={{
                                  backgroundColor: validation.values.visibility
                                    ? "#88c765"
                                    : "#fff",
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
                            id="title"
                            name="title"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.title || ""}
                            invalid={
                              validation.touched.title &&
                              validation.errors.title
                                ? true
                                : false
                            }
                            placeholder="Title"
                          />
                          {validation.touched.title &&
                          validation.errors.title ? (
                            <FormFeedback type="invalid">
                              {validation.errors.title}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col xxl={12} className="p-0">
                        <div>
                          <Input
                            type="textarea"
                            class="form-control"
                            placeholder="Description"
                            id="description"
                            name="description"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.description || ""}
                            invalid={
                              validation.touched.description &&
                              validation.errors.description
                                ? true
                                : false
                            }
                            style={{
                              height: "120px",
                              overflow: "hidden",
                              backgroundColor: "#dfdfdf",
                            }}
                          ></Input>
                          {validation.touched.description &&
                          validation.errors.description ? (
                            <FormFeedback type="invalid">
                              {validation.errors.description}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col xxl={12} className="p-0">
                        <Input
                          type="select"
                          lg={12}
                          disable
                          className="form-select mb-3"
                          validate={{
                            required: { value: true },
                          }}
                          name="category"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.category || ""}
                          invalid={
                            validation.touched.category &&
                            validation.errors.category
                              ? true
                              : false
                          }
                        >
                          <option hidden selected>
                            Select Category
                          </option>
                          {allCategories &&
                            allCategories.map((value, index) => {
                              return (
                                <option key={index}>{value.titleEng}</option>
                              );
                            })}
                        </Input>
                        {validation.touched.category &&
                        validation.errors.category ? (
                          <FormFeedback type="invalid">
                            {validation.errors.category}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col className="p-0 border rounded">
                        <div className="border p-3  d-flex justify-content-between ">
                          Answer Options{" "}
                        </div>
                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable droppableId="answers">
                            {(provided) => (
                              <div
                                className="mt-0"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {isDataUpdated
                                  ? allAnswers &&
                                    allAnswers.map((value, index) => {
                                      // const isSelected = selectedIndexes.includes(index);
                                      const isSelected =
                                        selectedIndexes2.includes(index);
                                      const isCheckedAnswer =
                                        info.answerOptions.find((val, ind) => {
                                          return val._id == value._id;
                                        });
                                      return (
                                        <>
                                          <Draggable
                                            key={value._id}
                                            draggableId={value._id.toString()}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <div
                                                className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center"
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                              >
                                                <div
                                                  className="d-flex align-items-center justify-content-between w-100 p-0"
                                                  style={{
                                                    color:
                                                      isSelected ||
                                                      isCheckedAnswer
                                                        ? "black"
                                                        : "#cccccc",
                                                  }}
                                                  key={index}
                                                >
                                                  <div>
                                                    <Checkbox
                                                      name="answerOption"
                                                      onBlur={() => {
                                                        validation.setFieldValue(
                                                          "answerOption",
                                                          selectedIndexes2.map(
                                                            (i) =>
                                                              info[i]
                                                                .answerOption
                                                          )
                                                        );
                                                      }}
                                                      value={index}
                                                      checked={
                                                        isCheckedAnswer ||
                                                        selectedIndexes2.includes(
                                                          index
                                                        )
                                                      }
                                                      onChange={(e) => {
                                                        e.preventDefault();
                                                        const { checked } =
                                                          e.target;
                                                        if (checked) {
                                                          setSelectedIndexes2([
                                                            ...selectedIndexes2,
                                                            index,
                                                          ]);
                                                        } else {
                                                          setSelectedIndexes2(
                                                            selectedIndexes2.filter(
                                                              (i) => i !== index
                                                            )
                                                          );
                                                        }
                                                        validation.setFieldValue(
                                                          "answerOption",
                                                          selectedIndexes2.map(
                                                            (i) =>
                                                              info[i]
                                                                .answerOption
                                                          )
                                                        );
                                                      }}
                                                      icon={<CropSquareIcon />}
                                                      checkedIcon={
                                                        <SquareRoundedIcon />
                                                      }
                                                    />
                                                    {value.answerOption}
                                                  </div>

                                                  <div className="form-check form-switch form-switch-right form-switch-md">
                                                    <Label
                                                      htmlFor={`form-grid-showcode-${index}`}
                                                      className="form-label text-muted"
                                                    >
                                                      Include Explanation
                                                    </Label>
                                                    <Input
                                                      id={`form-grid-showcode-${index}`}
                                                      className="form-check-input code-switcher"
                                                      type="checkbox"
                                                      value="active"
                                                      checked={
                                                        value.includeExplanation
                                                      } // Access includeExplanation from value object
                                                      onChange={(e) => {
                                                        const updatedAnswers = [
                                                          ...allAnswers,
                                                        ];
                                                        updatedAnswers[
                                                          index
                                                        ].includeExplanation =
                                                          e.target.checked;
                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          updatedAnswers
                                                        );
                                                      }}
                                                      style={{
                                                        backgroundColor:
                                                          value.includeExplanation
                                                            ? "#88C756"
                                                            : "#fff",
                                                        width: "50px",
                                                        border: "0",
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        </>
                                      );

                                      // )
                                    })
                                  : allAnswers &&
                                    allAnswers.map((value, index) => {
                                      // const isSelected = selectedIndexes.includes(index);
                                      const isSelected =
                                        selectedIndexes.includes(index);
                                      return (
                                        <>
                                          <Draggable
                                            key={value._id}
                                            draggableId={value._id.toString()}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <div
                                                className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center"
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                              >
                                                <div
                                                  className="d-flex align-items-center justify-content-between w-100 p-0"
                                                  style={{
                                                    color: isSelected
                                                      ? "black"
                                                      : "#cccccc",
                                                  }}
                                                  key={index}
                                                >
                                                  <div>
                                                    <Checkbox
                                                      name="answerOption"
                                                      onBlur={() => {
                                                        validation.setFieldValue(
                                                          "answerOption",
                                                          selectedIndexes.map(
                                                            (i) =>
                                                              allAnswers[i]
                                                                .answerOption
                                                          )
                                                        );
                                                      }}
                                                      value={index}
                                                      checked={selectedIndexes.includes(
                                                        index
                                                      )}
                                                      onChange={(e) => {
                                                        e.preventDefault();
                                                        const { checked } =
                                                          e.target;
                                                        if (checked) {
                                                          setSelectedIndexes([
                                                            ...selectedIndexes,
                                                            index,
                                                          ]);
                                                        } else {
                                                          setSelectedIndexes(
                                                            selectedIndexes.filter(
                                                              (i) => i !== index
                                                            )
                                                          );
                                                        }
                                                        validation.setFieldValue(
                                                          "answerOption",
                                                          selectedIndexes.map(
                                                            (i) =>
                                                              allAnswers[i]
                                                                .answerOption
                                                          )
                                                        );
                                                      }}
                                                      icon={<CropSquareIcon />}
                                                      checkedIcon={
                                                        <SquareRoundedIcon />
                                                      }
                                                    />
                                                    {value.answerOption}
                                                  </div>

                                                  <div className="form-check form-switch form-switch-right form-switch-md">
                                                    <Label
                                                      htmlFor={`form-grid-showcode-${index}`}
                                                      className="form-label text-muted"
                                                    >
                                                      Include Explanation
                                                    </Label>
                                                    <Input
                                                      id={`form-grid-showcode-${index}`}
                                                      className="form-check-input code-switcher"
                                                      type="checkbox"
                                                      value="active"
                                                      checked={
                                                        value.includeExplanation
                                                      } // Access includeExplanation from value object
                                                      onChange={(e) => {
                                                        const updatedAnswers = [
                                                          ...allAnswers,
                                                        ];
                                                        updatedAnswers[
                                                          index
                                                        ].includeExplanation =
                                                          e.target.checked;
                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          updatedAnswers
                                                        );
                                                      }}
                                                      style={{
                                                        backgroundColor:
                                                          value.includeExplanation
                                                            ? "#88C756"
                                                            : "#fff",
                                                        width: "50px",
                                                        border: "0",
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        </>
                                      );

                                      // )
                                    })}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </Col>
                      <div className="col-lg-12 d-flex gap-3">
                        <div className="hstack gap-2 justify-content-start">
                          <Button
                            className="btn btn-danger p-4 pt-2 pb-2"
                            onClick={() => {
                              validation.resetForm();
                              setIsDataUpdated(false);
                              setmodal_grid(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                        <div className="hstack gap-2 justify-content-start">
                          <Button
                            type="submit"
                            className="p-4 pt-2 pb-2"
                            color="secondary"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </ModalBody>
              </Modal>
            </Col>
            <div>
              <Button
                className="m-3 p-3"
                onClick={() => {
                  getAllAnswers()
                    .then((res) => setAllAnswers(res))
                    .catch((err) => console.log("err in getting answers", err));
                  setmodals_Answer(true);
                }}
              >
                Manage Answers
              </Button>
              <Modal
                size="lg p-5"
                className="postion-relative"
                isOpen={modals_Answer}
                toggle={() => {
                  tog_Answer();
                }}
              >
                <div
                  className="postion-absolute top-0 start-0 translate-middle bg-white rounded-circle d-flex justify-content-center align-items-center shadow-lg bg-body rounded"
                  style={{ width: "35px", height: "35px" }}
                >
                  <Button
                    type="button"
                    onClick={() => {
                      setmodals_Answer(false);
                    }}
                    className="btn-close color-black bg-white border border-dark rounded-circle "
                    aria-label="close"
                  ></Button>
                </div>
                <ModalHeader className="border-bottom border-dark p-4 pt-0">
                  <h4 className="modal-title">Manage answers</h4>
                </ModalHeader>
                <ModalBody>
                  <form className="p-4 pt-2 pb-2" action="#">
                    <div className="row g-3">
                      <Col lg={12} className="border p-2">
                        Language Selector:
                        <div className="d-flex gap-2 pt-2">
                          <Button
                            onClick={() => handleClick("ENGLISH")}
                            style={
                              selectedLanguage === "ENGLISH"
                                ? { backgroundColor: "#4A7BA4" }
                                : {
                                    backgroundColor: "#E9EBEC",
                                    border: "none",
                                    color: "#9DB1C7",
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
                                    color: "#9DB1C7",
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
                                    color: "#9DB1C7",
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
                                    color: "#9DB1C7",
                                  }
                            }
                          >
                            ARABIC
                          </Button>
                          <Button
                            onClick={() => handleClick("GERMAN")}
                            style={
                              selectedLanguage === "GERMAN"
                                ? { backgroundColor: "#4A7BA4" }
                                : {
                                    backgroundColor: "#E9EBEC",
                                    border: "none",
                                    color: "#9DB1C7",
                                  }
                            }
                          >
                            GERMAN
                          </Button>
                          <Button
                            onClick={() => handleClick("ITALIAN")}
                            style={
                              selectedLanguage === "ITALIAN"
                                ? { backgroundColor: "#4A7BA4" }
                                : {
                                    backgroundColor: "#E9EBEC",
                                    color: "#9DB1C7",
                                    border: "none",
                                  }
                            }
                          >
                            ITALIAN
                          </Button>
                        </div>
                      </Col>
                      <Col xxl={12}>
                        <div className="form-control mt-2">
                          View your answers
                        </div>
                      </Col>
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="answers">
                          {(provided) => (
                            <div
                              className="mt-0"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {allAnswers &&
                                allAnswers.map((Answer, index) => (
                                  <>
                                    <Draggable
                                      key={Answer._id}
                                      draggableId={Answer._id.toString()}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center"
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          <div className="d-flex align-items-center gap-2">
                                            <i
                                              className="ri-drag-move-2-line fs-24"
                                              style={{ color: "#4A7BA4" }}
                                            ></i>
                                            <h5 className="m-0">
                                              {Answer.answerOption}
                                            </h5>
                                          </div>
                                          <div className="d-flex justify-content-end gap-2">
                                            <i
                                              className="ri-pencil-fill fs-18"
                                              style={{ color: "gray" }}
                                              onClick={() =>
                                                handleEdits(Answer._id)
                                              }
                                            ></i>
                                            <i
                                              className="ri-delete-bin-2-line fs-18"
                                              style={{ color: "red" }}
                                              onClick={() =>
                                                handleDeletes(Answer._id)
                                              }
                                            ></i>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  </>
                                ))}
                              <Modal
                                isOpen={deleteConfirmation}
                                toggle={cancelDelete}
                              >
                                <ModalHeader toggle={cancelDelete}>
                                  Confirm Deletion
                                </ModalHeader>
                                <ModalBody>
                                  Are you sure you want to delete this answer
                                  variation?
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    onClick={confirmDelete}
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    color="secondary"
                                    onClick={cancelDelete}
                                  >
                                    Cancel
                                  </Button>
                                </ModalFooter>
                              </Modal>

                              {provided.placeholder}
                              <Col xxl={12}>
                                <div>
                                  <Input
                                    type="text"
                                    className="form-control mt-2"
                                    id="firstName"
                                    placeholder="Enter an answer variation"
                                    onChange={(e) =>
                                      setInputFields(e.target.value)
                                    }
                                    value={inputFields}
                                  />
                                </div>
                              </Col>
                              <div className="d-flex gap-3 col-lg-12 mt-3">
                                <div className="d-flex gap-2">
                                  <Button onClick={handleUpdates}>Save</Button>

                                  <Button
                                    color="primary"
                                    onClick={handleAnswerAdd}
                                  >
                                    Add new item to list
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  </form>
                </ModalBody>
              </Modal>
            </div>
            <div className="pt-5" style={{ width: "270px" }}>
              <Button
                className="d-flex align-items-center justify-content-between p-3 bg-white shadow-lg p-3 mb-5 rounded float-end"
                color="white"
                style={{ width: "270px" }}
                onClick={() => {
                  getAllCategories()
                    .then((res) => setAllCategories(res))
                    .catch((err) =>
                      console.log("err in getting cateories", err)
                    );
                  setmodals_grid(true);
                }}
              >
                Manage Category
                <i class="ri-add-fill"></i>
              </Button>

              <Modal
                size="lg p-5"
                className="postion-relative"
                isOpen={modals_grid}
                toggle={() => {
                  tog_grids();
                }}
              >
                <div
                  className="postion-absolute top-0 start-0 translate-middle bg-white rounded-circle d-flex justify-content-center align-items-center shadow-lg bg-body rounded"
                  style={{ width: "35px", height: "35px" }}
                >
                  <Button
                    type="button"
                    onClick={() => {
                      setmodals_grid(false);
                    }}
                    className="btn-close color-black bg-white border border-dark rounded-circle "
                    aria-label="close"
                  ></Button>
                </div>
                <ModalHeader className="border-bottom border-dark p-4 pt-0">
                  <h4 className="modal-title">Manage categories</h4>
                </ModalHeader>
                <ModalBody>
                  <form className="p-4 pt-2 pb-2" action="#">
                    <div className="row g-3">
                      <Col lg={12} className="border p-2">
                        Language Selector:
                        <div className="d-flex gap-2 pt-2">
                          <Button
                            onClick={() => handleClick("ENGLISH")}
                            style={
                              selectedLanguage === "ENGLISH"
                                ? { backgroundColor: "#4A7BA4" }
                                : {
                                    backgroundColor: "#E9EBEC",
                                    border: "none",
                                    color: "#9DB1C7",
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
                                    color: "#9DB1C7",
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
                                    color: "#9DB1C7",
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
                                    color: "#9DB1C7",
                                  }
                            }
                          >
                            ARABIC
                          </Button>
                          <Button
                            onClick={() => handleClick("GERMAN")}
                            style={
                              selectedLanguage === "GERMAN"
                                ? { backgroundColor: "#4A7BA4" }
                                : {
                                    backgroundColor: "#E9EBEC",
                                    border: "none",
                                    color: "#9DB1C7",
                                  }
                            }
                          >
                            GERMAN
                          </Button>
                          <Button
                            onClick={() => handleClick("ITALIAN")}
                            style={
                              selectedLanguage === "ITALIAN"
                                ? { backgroundColor: "#4A7BA4" }
                                : {
                                    backgroundColor: "#E9EBEC",
                                    color: "#9DB1C7",
                                    border: "none",
                                  }
                            }
                          >
                            ITALIAN
                          </Button>
                        </div>
                      </Col>
                      <DragDropContext onDragEnd={handleDragEnds}>
                        <Droppable droppableId="categories">
                          {(provided) => (
                            <div
                              className="mt-0"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {allCategories &&
                                allCategories.map((category, index) => (
                                  <Draggable
                                    key={category._id}
                                    draggableId={category._id.toString()}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        key={category._id}
                                        className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center"
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                      >
                                        <div className="d-flex align-items-center gap-2">
                                          <i
                                            className="ri-drag-move-2-line fs-24"
                                            style={{ color: "#4A7BA4" }}
                                          ></i>
                                          <h5 className="m-0">
                                            {category.titleEng}
                                          </h5>
                                        </div>
                                        <div className="d-flex gap-2">
                                          <i
                                            className="ri-pencil-fill fs-18"
                                            style={{ color: "gray" }}
                                            onClick={() =>
                                              handleEdit(category._id)
                                            }
                                          ></i>
                                          <i
                                            className="ri-delete-bin-2-line fs-18"
                                            style={{ color: "red" }}
                                            onClick={() =>
                                              handleDelete(category._id)
                                            }
                                          ></i>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              <Modal
                                isOpen={deleteConfirmation2}
                                toggle={cancelDelete2}
                              >
                                <ModalHeader toggle={cancelDelete2}>
                                  Confirm Deletion
                                </ModalHeader>
                                <ModalBody>
                                  Are you sure you want to delete this category
                                  variation?
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    onClick={confirmDelete2}
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    color="secondary"
                                    onClick={cancelDelete2}
                                  >
                                    Cancel
                                  </Button>
                                </ModalFooter>
                              </Modal>

                              <Col xxl={12}>
                                <div>
                                  <Input
                                    type="text"
                                    className="form-control mt-2"
                                    id="firstName"
                                    placeholder="Edit Category name"
                                    onChange={(e) =>
                                      setInputField(e.target.value)
                                    }
                                    value={inputField}
                                  />
                                </div>
                              </Col>
                              <div className="d-flex gap-3 col-lg-12 mt-3">
                                <div className="d-flex gap-2">
                                  <Button
                                    color="primary"
                                    onClick={handleUpdate}
                                  >
                                    Update Category
                                  </Button>
                                  <Button color="primary" onClick={handleAdd}>
                                    Add new item to list
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  </form>
                </ModalBody>
              </Modal>
            </div>
            <Button
              className="m-3 p-3"
              href="/adminbenchmarking/questions/compare"
            >
              View Comparison
            </Button>
          </div>
          <Card id="contactList">
            <CardBody className="pt-0">
              <div>
                {qa?.length >= 0 ? (
                  <TableContainer
                    columns={columns}
                    data={qa || []}
                    setInfo={setInfo}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    isFilterA={false}
                    isFooter={true}
                    customPageSize={8}
                    className="custom-header-css"
                    divClass="table-responsive table-card mb-0"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light"
                    handleContactClick={handleContactClicks}
                    isContactsFilter={false}
                    SearchPlaceholder="Search by the Question title"
                  />
                ) : (
                  <Loader error={error} />
                )}
              </div>
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </div>
      <Modal isOpen={deleteConfirmation3} toggle={cancelDelete3}>
        <ModalHeader toggle={cancelDelete3}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this answer variation?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete3}>
            Delete
          </Button>
          <Button color="secondary" onClick={cancelDelete3}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* </Layouts> */}
    </React.Fragment>
  );
};

export default BenchmarkingQA;
