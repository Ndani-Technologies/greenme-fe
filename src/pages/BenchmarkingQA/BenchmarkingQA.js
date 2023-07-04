import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  getQAComparison,
  removeAllQA,
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
  getAllAdminBenchmarks,
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
  const editorRef = useRef(null);
  const [questionId, setQuestionId] = useState(null);
  const [allChecked, setAllChecked] = useState(false);
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
    getAllQA()
      .then((resp) => setQA(resp))
      .catch((err) => toast.error("qa all error"));
    getAllAnswers()
      .then((resp) => setAllAnswers(resp))
      .catch((err) => toast.error("answer all error"));
    getAllCategories()
      .then((resp) => setAllCategories(resp))
      .catch((err) => toast.error("category all error"));
  };
  const [info, setInfo] = useState([]);

  useEffect(() => {
    allQA();
    if (isDataUpdated) {
      setSelectedAnswerOptions[info.answerOptions];
      validation.setFieldValue("title", info.title);
      validation.setFieldValue("category", info.category);
    }
  }, []);
  if (isDataUpdated) {
    console.log(info.answerOptions, "INFO AO");
  }

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

  const [QaResp, setQaResp] = useState(null);

  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: isDataUpdated ? info.title : "",
      status: true,
      visibility: true,
      description: isDataUpdated ? info.description : "",
      category: isDataUpdated ? info.category : "",
      answerOptions: isDataUpdated ? info.answerOptions : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter title"),
      // description: Yup.string().required("Please Enter description"),
      category: Yup.string().required("Please select category"),
    }),

    onSubmit: async (values) => {
      const cd = allCategories.find((value) => {
        if (value.titleEng.toString().includes(values.category)) return value;
      });
      console.log(values, "INSIDE SUBMIT");
      const mappedData = {
        ...values,
        category: cd?._id,
        visibility: "True" ? true : false,
      };
      console.log(mappedData, "MD");
      if (isDataUpdated) {
        updateQuestion(questionId, mappedData)
          .then((resp) => {
            getAllQA()
              .then((resp) => setQA(resp))
              .catch((err) => toast.error("qa all error"));
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
            setQaResp(resp);
            setSelectedIndexes([]);
            validation.resetForm();
          })
          .catch((err) => {
            toast.error(`Error in adding question ${err}`);
          });
      }
      setSelectedAnswerOptions([]);
      setIsDataUpdated(false);
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
        name: contact.name,
        response: contact.reeponse,
        company: contact.company,
        email: contact.email,
        designation: contact.designation,
        phone: contact.phone,
        lead_score: contact.lead_score,
        last_contacted: contact.date,
        tags: contact.tags,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);
  const [selectedAnswerOptions, setSelectedAnswerOptions] = useState([]);
  const deletedArr = [];

  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".contactCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
        setAllChecked(true);
      });
      const allIds = Array.from(ele).map((el) => el.value._id);
      setToBeDeleted(allIds);
      setAllChecked(true);
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
        setAllChecked(false);
      });
      setToBeDeleted([]);
      setAllChecked(false);
    }

    deleteCheckbox();
  }, []);

  const deleteCheckbox = (id) => {
    const ele = document.querySelectorAll(".contactCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [paramString, setParamString] = useState("");

  const navigate = useNavigate();
  const handleComparisonClick = () => {
    const uniqueIds = Array.from(new Set(toBeDeleted));
    navigate("/adminbenchmarking/questions/compare", { state: uniqueIds });
  };

  const [info1, setInfo1] = useState();
  // Column
  const columns = useMemo(
    () => [
      {
        Header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            checked={allChecked}
            onClick={() => checkedAll()}
          />
        ),

        Cell: (cellProps) => {
          const handleCheckboxChange = () => {
            const isChecked = toBeDeleted.includes(cellProps.row.original._id);

            if (isChecked) {
              setToBeDeleted((prevToBeDeleted) =>
                prevToBeDeleted.filter(
                  (id) => id !== cellProps.row.original._id
                )
              );
            } else {
              setToBeDeleted((prevToBeDeleted) => [
                ...prevToBeDeleted,
                cellProps.row.original._id,
              ]);
            }

            deleteCheckbox();
          };

          return (
            <input
              type="checkbox"
              className="contactCheckBox form-check-input"
              value={cellProps.row.original}
              onBlur={() => {
                setToBeDeleted((prevToBeDeleted) => [
                  ...prevToBeDeleted,
                  cellProps.row.original._id,
                ]);
              }}
              onChange={handleCheckboxChange}
            />
          );
        },
        id: "#",
      },
      {
        Header: "Question title",
        accessor: "title",
        filterable: false,

        Cell: (cellProps) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0"></div>
              <div
                className="flex-grow-1 ms-2 name cursor-pointer"
                onClick={() => {
                  const contactData = cellProps.row.original;
                  console.log(contactData, "CD");
                  setInfo(contactData);
                  setSelectedAnswerOptions(
                    contactData.answerOptions.map((value) => {
                      return {
                        answerOption: value.answerOption._id,
                        includeExplanation: value.includeExplanation,
                        includeInputField: value.includeInputField,
                      };
                    })
                  );

                  setQuestionId(cellProps.row.original._id);
                  setmodal_grid(true);
                  setIsDataUpdated(true);
                }}
              >
                {cellProps.row.original.title}
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        filterable: false,
      },
      {
        Header: "# of users answered",
        accessor: "answered",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Visibility",
        accessor: "visibility",
        // filterable: false,
        Cell: (cellProps) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0"></div>
              <div className="flex-grow-1 ms-2 name">
                {cellProps.row.original.visibility == "True" ? "Yes" : "No"}
              </div>
            </div>
          </>
        ),
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
                      // href={`/adminbenchmarking/questions/summary/${_id}`}
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
                        setInfo(contactData);
                        setSelectedAnswerOptions(
                          contactData.answerOptions.map((value) => {
                            return {
                              answerOption: value.answerOption._id,
                              includeExplanation: value.includeExplanation,
                              includeInputField: value.includeInputField,
                            };
                          })
                        );

                        setQuestionId(cellProps.row.original._id);
                        setmodal_grid(true);
                        setIsDataUpdated(true);
                      }}
                    >
                      Edit
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
    setAnswerEdit(true);
    setEditingAnswerId(AnswerId);
    const Answer = allAnswers.find((c) => c._id === AnswerId);
    setInputFields(Answer.answerOption);
    const inputFieldElement = document.getElementById("firstName"); // Replace "inputField" with the actual ID of your input field
    inputFieldElement.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdates = (e) => {
    e.preventDefault();
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
      });
    setEditingAnswerId(null);
    setInputFields("");
  };

  // const [updAnswers, setUpdAnswers] = useState([]);
  // const [updCategories, setUpdCategories] = useState([]);

  const handleAnswerAdd = (e) => {
    e.preventDefault();
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
      .catch((err) => toast.error("error in deleting answer"));
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
  const [categoryEdit, setCategoryEdit] = useState(false);
  const [answerEdit, setAnswerEdit] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    setInputFields("");
    setCategoryEdit(false);
    setAnswerEdit(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const newCategoryName = inputField;
    if (newCategoryName) {
      const newCategory = {
        titleEng: newCategoryName,
      };
      addCategory(newCategory)
        .then((resp) => {
          // setData([...data, resp]);
          setAllCategories([...allCategories, resp]);
          toast.success("Successfully Added");
        })
        .catch((err) => {
          toast.error("Unable to Update");
        });
      setInputField("");
    }
  };

  const handleEdit = (categoryId) => {
    setCategoryEdit(true);
    setEditingCategoryId(categoryId);
    const category = allCategories.find((c) => c._id === categoryId);
    setInputField(category.titleEng);
    const inputFieldElement = document.getElementById("firstName1"); // Replace "inputField" with the actual ID of your input field
    inputFieldElement.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
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
      .catch((err) => toast.error("err in deleteing category"));
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
  const [selectedIndexesIE, setSelectedIndexesIE] = useState([]);
  const [selectedIndexes2, setSelectedIndexes2] = useState(info);
  const [isSelected, setIsSelected] = useState();
  const [isSelectedIE, setIsSelectedIE] = useState();
  const [isSelectedIF, setIsSelectedIF] = useState();

  document.title = "Benchmaking QA | GreenMe";
  const [ob, setOb] = useState([]);
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
        <Col xxl={12}>
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
                      if (isDataUpdated) {
                        setSelectedAnswerOptions(info.answerOptions);
                      } else {
                        setSelectedAnswerOptions([]);
                      }
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
                                checked={validation?.values?.status}
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
                        <div className="">
                          <CKEditor
                            editor={ClassicEditor}
                            ref={editorRef}
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              if (isDataUpdated) {
                                editor.setData(info?.description);
                              }
                            }}
                            onChange={(event, editor) => {
                              const value = editor.getData();
                              const div = document.createElement("div");
                              div.innerHTML = value;
                              const pValue = div.querySelector("p")?.innerHTML;
                              validation.setFieldValue("description", value);
                            }}
                            class="form-control"
                            placeholder="Description"
                            id="description"
                            onBlur={(event, editor) => {
                              const value = editor.getData();
                              const div = document.createElement("div");
                              div.innerHTML = value;
                              const pValue = div.querySelector("p")?.innerHTML;
                              validation.setFieldValue("description", value);
                              validation.handleBlur;
                            }}
                            value={
                              isDataUpdated
                                ? info?.description
                                : validation.values.description
                            }
                            style={{
                              height: "120px",
                              overflow: "hidden",
                              backgroundColor: "#dfdfdf",
                            }}
                          />
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
                          {isDataUpdated ? (
                            <option hidden selected>
                              {info.category}
                            </option>
                          ) : (
                            <option hidden selected>
                              Select Category
                            </option>
                          )}
                          {allCategories &&
                            allCategories.map((value, index) => {
                              return (
                                <option key={index}>
                                  {categoryEdit ? "" : value?.titleEng}
                                </option>
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
                                      // Check if the current answer option is selected
                                      const isSelected =
                                        selectedAnswerOptions.some(
                                          (option) =>
                                            option.answerOption === value._id
                                        );

                                      // Check if the include explanation checkbox is selected
                                      const isSelectedIE =
                                        selectedAnswerOptions.some(
                                          (option) =>
                                            option.answerOption === value._id &&
                                            option.includeExplanation
                                        );

                                      // Check if the include input field checkbox is selected
                                      const isSelectedIF =
                                        selectedAnswerOptions.some(
                                          (option) =>
                                            option.answerOption === value._id &&
                                            option.includeInputField
                                        );

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
                                                  <div style={{ width: "33%" }}>
                                                    <Checkbox
                                                      name="answerOptions"
                                                      onBlur={() => {
                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      value={index}
                                                      checked={isSelected}
                                                      onChange={(e) => {
                                                        e.preventDefault();
                                                        // setInfo((prev)=>{
                                                        //   return {
                                                        //     ...prev,
                                                        //     answerOptions:
                                                        //   }
                                                        // })
                                                        const { checked } =
                                                          e.target;
                                                        const answerOption =
                                                          value._id;
                                                        const includeExplanation =
                                                          isSelectedIE;
                                                        const includeInputField =
                                                          isSelectedIF;

                                                        if (checked) {
                                                          const updatedOption =
                                                            {
                                                              answerOption,
                                                              includeExplanation,
                                                              includeInputField,
                                                            };
                                                          setSelectedAnswerOptions(
                                                            (prevOptions) => [
                                                              ...prevOptions,
                                                              updatedOption,
                                                            ]
                                                          );
                                                        } else {
                                                          setSelectedAnswerOptions(
                                                            (prevOptions) =>
                                                              prevOptions.filter(
                                                                (option) =>
                                                                  option.answerOption !==
                                                                  answerOption
                                                              )
                                                          );
                                                        }
                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      icon={<CropSquareIcon />}
                                                      checkedIcon={
                                                        <SquareRoundedIcon />
                                                      }
                                                    />
                                                    {value.answerOption}
                                                  </div>

                                                  <div
                                                    className="form-check form-switch form-switch-right form-switch-md"
                                                    style={{ width: "33%" }}
                                                  >
                                                    <Label
                                                      htmlFor={`form-grid-showcode-${index}`}
                                                      className="form-label text-muted"
                                                    >
                                                      Include Explanation
                                                    </Label>
                                                    <Checkbox
                                                      id={`form-grid-showcode-${index}`}
                                                      name="includeExplanation"
                                                      value={index}
                                                      checked={isSelectedIE}
                                                      onChange={(e) => {
                                                        e.preventDefault();
                                                        const { checked } =
                                                          e.target;
                                                        const answerOption =
                                                          value._id;

                                                        setSelectedAnswerOptions(
                                                          (prevOptions) =>
                                                            prevOptions.map(
                                                              (option) => {
                                                                if (
                                                                  option.answerOption ===
                                                                  answerOption
                                                                ) {
                                                                  return {
                                                                    ...option,
                                                                    includeExplanation:
                                                                      checked,
                                                                  };
                                                                }
                                                                return option;
                                                              }
                                                            )
                                                        );

                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      onBlur={() => {
                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      icon={<CropSquareIcon />}
                                                      checkedIcon={
                                                        <SquareRoundedIcon />
                                                      }
                                                    />
                                                  </div>

                                                  <div
                                                    className="form-check form-switch form-switch-right form-switch-md"
                                                    style={{ width: "33%" }}
                                                  >
                                                    <Label
                                                      htmlFor={`form-grid-showcode-${index}`}
                                                      className="form-label text-muted"
                                                    >
                                                      Include Input Field
                                                    </Label>
                                                    <Checkbox
                                                      id={`form-grid-showcode-${index}`}
                                                      name="includeInputField"
                                                      checked={isSelectedIF}
                                                      onChange={(e) => {
                                                        const updatedAnswers = [
                                                          ...allAnswers,
                                                        ];
                                                        updatedAnswers[
                                                          index
                                                        ].includeInputField =
                                                          e.target.checked;

                                                        setSelectedAnswerOptions(
                                                          (prevOptions) =>
                                                            prevOptions.map(
                                                              (option) => {
                                                                if (
                                                                  option.answerOption ===
                                                                  value._id
                                                                ) {
                                                                  return {
                                                                    ...option,
                                                                    includeInputField:
                                                                      e.target
                                                                        .checked,
                                                                  };
                                                                }
                                                                return option;
                                                              }
                                                            )
                                                        );

                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      icon={<CropSquareIcon />}
                                                      checkedIcon={
                                                        <SquareRoundedIcon />
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        </>
                                      );
                                    })
                                  : allAnswers &&
                                    allAnswers.map((value, index) => {
                                      // Check if the current answer option is selected
                                      const isSelected =
                                        selectedAnswerOptions.some(
                                          (option) =>
                                            option.answerOption === value._id
                                        );

                                      // Check if the include explanation checkbox is selected
                                      const isSelectedIE =
                                        selectedAnswerOptions.some(
                                          (option) =>
                                            option.answerOption === value._id &&
                                            option.includeExplanation
                                        );

                                      // Check if the include input field checkbox is selected
                                      const isSelectedIF =
                                        selectedAnswerOptions.some(
                                          (option) =>
                                            option.answerOption === value._id &&
                                            option.includeInputField
                                        );

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
                                                  <div style={{ width: "33%" }}>
                                                    <Checkbox
                                                      name="answerOptions"
                                                      onBlur={() => {
                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      value={index}
                                                      checked={isSelected}
                                                      onChange={(e) => {
                                                        e.preventDefault();
                                                        const { checked } =
                                                          e.target;
                                                        const answerOption =
                                                          value._id;
                                                        const includeExplanation =
                                                          isSelectedIE;
                                                        const includeInputField =
                                                          isSelectedIF;

                                                        if (checked) {
                                                          const updatedOption =
                                                            {
                                                              answerOption,
                                                              includeExplanation,
                                                              includeInputField,
                                                            };
                                                          setSelectedAnswerOptions(
                                                            (prevOptions) => [
                                                              ...prevOptions,
                                                              updatedOption,
                                                            ]
                                                          );
                                                        } else {
                                                          setSelectedAnswerOptions(
                                                            (prevOptions) =>
                                                              prevOptions.filter(
                                                                (option) =>
                                                                  option.answerOption !==
                                                                  answerOption
                                                              )
                                                          );
                                                        }

                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      icon={<CropSquareIcon />}
                                                      checkedIcon={
                                                        <SquareRoundedIcon />
                                                      }
                                                    />
                                                    {value.answerOption}
                                                  </div>

                                                  <div
                                                    className="form-check form-switch form-switch-right form-switch-md"
                                                    style={{ width: "33%" }}
                                                  >
                                                    <Label
                                                      htmlFor={`form-grid-showcode-${index}`}
                                                      className="form-label text-muted"
                                                    >
                                                      Include Explanation
                                                    </Label>
                                                    <Checkbox
                                                      id={`form-grid-showcode-${index}`}
                                                      name="includeExplanation"
                                                      value={index}
                                                      checked={isSelectedIE}
                                                      onChange={(e) => {
                                                        e.preventDefault();
                                                        const { checked } =
                                                          e.target;
                                                        const answerOption =
                                                          value._id;

                                                        setSelectedAnswerOptions(
                                                          (prevOptions) =>
                                                            prevOptions.map(
                                                              (option) => {
                                                                if (
                                                                  option.answerOption ===
                                                                  answerOption
                                                                ) {
                                                                  return {
                                                                    ...option,
                                                                    includeExplanation:
                                                                      checked,
                                                                  };
                                                                }
                                                                return option;
                                                              }
                                                            )
                                                        );

                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      onBlur={() => {
                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      icon={<CropSquareIcon />}
                                                      checkedIcon={
                                                        <SquareRoundedIcon />
                                                      }
                                                    />
                                                  </div>

                                                  <div
                                                    className="form-check form-switch form-switch-right form-switch-md"
                                                    style={{ width: "33%" }}
                                                  >
                                                    <Label
                                                      htmlFor={`form-grid-showcode-${index}`}
                                                      className="form-label text-muted"
                                                    >
                                                      Include Input Field
                                                    </Label>
                                                    <Checkbox
                                                      id={`form-grid-showcode-${index}`}
                                                      name="includeInputField"
                                                      checked={isSelectedIF}
                                                      onChange={(e) => {
                                                        e.preventDefault();
                                                        const { checked } =
                                                          e.target;
                                                        const answerOption =
                                                          value._id;

                                                        setSelectedAnswerOptions(
                                                          (prevOptions) =>
                                                            prevOptions.map(
                                                              (option) => {
                                                                if (
                                                                  option.answerOption ===
                                                                  answerOption
                                                                ) {
                                                                  return {
                                                                    ...option,
                                                                    includeInputField:
                                                                      checked,
                                                                  };
                                                                }
                                                                return option;
                                                              }
                                                            )
                                                        );

                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      onBlur={(e) => {
                                                        e.preventDefault();
                                                        validation.setFieldValue(
                                                          "answerOptions",
                                                          selectedAnswerOptions
                                                        );
                                                      }}
                                                      icon={<CropSquareIcon />}
                                                      checkedIcon={
                                                        <SquareRoundedIcon />
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        </>
                                      );
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
                              if (isDataUpdated) {
                                setSelectedAnswerOptions(info.answerOptions);
                              } else {
                                setSelectedAnswerOptions([]);
                              }
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
                    .catch((err) => toast.error("err in getting answers"));
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
                                          style={{ cursor: "default" }}
                                        >
                                          <div className="d-flex align-items-center gap-2">
                                            <i
                                              className="ri-drag-move-2-line fs-24"
                                              style={{
                                                color: "#4A7BA4",
                                                cursor: "grab",
                                              }}
                                            ></i>
                                            <h5 className="m-0">
                                              {Answer.answerOption}
                                            </h5>
                                          </div>
                                          <div className="d-flex justify-content-end gap-2">
                                            <i
                                              className="ri-pencil-fill fs-18 cursor-pointer"
                                              style={{ color: "gray" }}
                                              onClick={() =>
                                                handleEdits(Answer._id)
                                              }
                                            ></i>
                                            <i
                                              className="ri-delete-bin-2-line fs-18 cursor-pointer"
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
                                    value={inputFields || ""}
                                  />
                                </div>
                              </Col>
                              <div className="d-flex gap-3 col-lg-12 mt-3">
                                <div className="d-flex gap-2">
                                  <Button onClick={(e) => handleUpdates(e)}>
                                    Save
                                  </Button>

                                  {answerEdit ? (
                                    <Button
                                      color="primary"
                                      onClick={(e) => handleCancel(e)}
                                    >
                                      Cancel
                                    </Button>
                                  ) : (
                                    <Button
                                      color="primary"
                                      onClick={(e) => handleAdd(e)}
                                    >
                                      Add new item to list
                                    </Button>
                                  )}
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
                      toast.error("err in getting cateories", err)
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
                                    key={category?._id}
                                    draggableId={category?._id.toString()}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        key={category?._id}
                                        className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center"
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        style={{ cursor: "default " }}
                                      >
                                        <div className="d-flex align-items-center gap-2">
                                          <i
                                            className="ri-drag-move-2-line fs-24"
                                            style={{
                                              color: "#4A7BA4",
                                              cursor: "grab",
                                            }}
                                          ></i>
                                          <h5 className="m-0">
                                            {category?.titleEng}
                                          </h5>
                                        </div>
                                        <div className="d-flex gap-2">
                                          <i
                                            className="ri-pencil-fill fs-18"
                                            style={{
                                              color: "gray",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleEdit(category?._id)
                                            }
                                          ></i>
                                          <i
                                            className="ri-delete-bin-2-line fs-18"
                                            style={{
                                              color: "red",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleDelete(category?._id)
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
                                    id="firstName1"
                                    placeholder="Edit Category name"
                                    onChange={(e) =>
                                      setInputField(e.target.value)
                                    }
                                    value={inputField || ""}
                                  />
                                </div>
                              </Col>
                              <div className="d-flex gap-3 col-lg-12 mt-3">
                                <div className="d-flex gap-2">
                                  <Button
                                    color="primary"
                                    onClick={(e) => handleUpdate(e)}
                                  >
                                    Update Category
                                  </Button>
                                  {categoryEdit ? (
                                    <Button
                                      color="primary"
                                      onClick={(e) => handleCancel(e)}
                                    >
                                      Cancel
                                    </Button>
                                  ) : (
                                    <Button
                                      color="primary"
                                      onClick={(e) => handleAdd(e)}
                                    >
                                      Add new item to list
                                    </Button>
                                  )}
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
            <Button className="m-3 p-3" onClick={handleComparisonClick}>
              View Comparison
            </Button>
          </div>
          <Card id="contactList" style={{ width: "98%" }}>
            <CardBody className="pt-0">
              <div>
                {qa?.length >= 0 ? (
                  <TableContainer
                    columns={columns}
                    data={qa || []}
                    setInfo={setInfo}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    isFooter={true}
                    customPageSize={8}
                    className="custom-header-css"
                    divClass="table-responsive table-card mb-0"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light"
                    handleContactClick={handleContactClicks}
                    isContactsFilter={false}
                    isBenchmarkingQASearch={true}
                    SearchPlaceholder="Search"
                    isAllQaFilters={true}
                  />
                ) : (
                  <Loader error={error} />
                )}

                <Button
                  onClick={() => {
                    if (allChecked) {
                      setQA([]);
                      setToBeDeleted([]);
                      removeAllQA([]);
                    } else {
                      setQA((prev) =>
                        prev.filter(
                          (element) => !toBeDeleted.includes(element._id)
                        )
                      );
                      const uniqueIds = Array.from(new Set(toBeDeleted)); // Remove duplicates

                      setToBeDeleted([]);
                      removeAllQA(uniqueIds);
                    }
                  }}
                >
                  Delete All
                </Button>
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
