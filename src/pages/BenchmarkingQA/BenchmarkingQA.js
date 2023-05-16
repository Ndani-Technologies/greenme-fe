import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as moment from "moment";
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

import { Checkbox } from "@mui/material";
const arr = [
  {
    _id: "625d3cd5923ccd040209ebf1",
    name: "Does your organisation have environmental commitments?",
    phone: "02",
    email: "Yes",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "active",
    response: "30%",
  },
  {
    _id: "625d3cd5923ccd040209ebf3",
    name: "Does your organisation have a ‘green’ strategy?",
    phone: "08",
    email: "No",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "active",
    response: "10%",
  },
  {
    _id: "625d3cd5923ccd040209ebee",
    name: "Does your fleet policy contain references to a green strategy or environmental sustainability?",
    phone: "20",
    email: "Yes",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "active",
    response: "40%",
  },
  {
    _id: "625d3cd5923ccd040209ebf0",
    name: "Does your fleet policy include guidance to use the vehicle with the lowest environmental impact?",
    phone: "33",
    email: "Yes",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "active",
    response: "5%",
  },
  {
    _id: "625d3cd5923ccd040209ebf2",
    name: "Do you have standardised fleet procurement (global framework agreement…)?",
    phone: "15",
    email: "No",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "In-active",
    response: "45%",
  },
  {
    _id: "625d3cd5923ccd040209ebeb",
    name: "Do you use sustainability criteria to assess/ select suppliers?",
    phone: "05",
    company: "iTest Factory",
    designation: "UI / UX Designer",
    email: "Yes",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "active",
    response: "80%",
  },
  {
    _id: "625d3cd5923ccd040209ebec",
    name: "How do you dispose of vehicles?",
    phone: "10",
    company: "Force Medicines",
    designation: "PHP Developer",
    email: "No",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "active",
    response: "50%",
  },
  {
    _id: "625d3cd5923ccd040209ebea",
    name: "Do you take the environmental impact into consideration when planning for disposal ?",
    phone: "14",
    company: "Nesta Technologies",
    designation: "Lead Designer / Developer",
    email: "No",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "active",
    response: "30%",
  },

  {
    _id: "625d3cd5923ccd040209ebef",
    name: "How do you dispose of vehicles?",
    phone: "33",
    company: "Micro Design",
    designation: "Asp.Net Developer",
    email: "Yes",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "active",
    response: "90%",
  },
  {
    _id: "625d3cd5923ccd040209ebed",
    name: "How do you dispose of vehicles?",
    phone: "02",
    company: "Digitech Galaxy",
    designation: "Full Stack Developer",
    email: "Yes",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "In-active",
    response: "30%",
  },
];
const BenchmarkingQA = () => {
  const [isGrey, setIsGrey] = useState(false);
  const [isGrey2, setIsGrey2] = useState(false);
  const [isGrey3, setIsGrey3] = useState(false);
  const [isGrey4, setIsGrey4] = useState(false);
  const [isGrey5, setIsGrey5] = useState(false);

  const dispatch = useDispatch();
  const { crmcontacts, isContactCreated, isContactSuccess, error } =
    useSelector((state) => ({
      crmcontacts: state.Crm.crmcontacts,
      isContactCreated: state.Crm.isContactCreated,
      isContactSuccess: state.Crm.isContactSuccess,
      error: state.Crm.error,
    }));
  useEffect(() => {
    dispatch(onGetContacts(arr));
  }, [dispatch, crmcontacts]);
  useEffect(() => {
    setContact(crmcontacts);
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
      setTag([]);
      setAssignTag([]);
    }
  }, [modal]);

  // Delete Data
  const handleDeleteContact = () => {
    if (contact) {
      dispatch(onDeleteContact(contact._id));
      setDeleteModal(false);
    }
  };

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
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // img: (contact && contact.img) || '',
      name: (contact && contact.name) || "",
      reeponse: (contact && contact.response) || "",
      company: (contact && contact.company) || "",
      designation: (contact && contact.designation) || "",
      email: (contact && contact.email) || "",
      phone: (contact && contact.phone) || "",
      lead_score: (contact && contact.lead_score) || "",
      tags: (contact && contact.tags) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      response: Yup.string().required("Please Enter Name"),
      company: Yup.string().required("Please Enter Company"),
      designation: Yup.string().required("Please Enter Designation"),
      email: Yup.string().required("Please Enter Email"),
      phone: Yup.string().required("Please Enter Phone"),
      lead_score: Yup.string().required("Please Enter lead_score"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateContact = {
          _id: contact ? contact._id : 0,
          // img: values.img,
          name: values.name,
          response: assignResponse,
          company: values.company,
          designation: values.designation,
          email: values.email,
          phone: values.phone,
          lead_score: values.lead_score,
          last_contacted: dateFormat(),
          // time: timeFormat(),
          tags: assignTag,
        };
        // update Contact
        dispatch(onUpdateContact(updateContact));
        validation.resetForm();
      } else {
        const newContact = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          // img: values["img"],
          name: values["name"],
          response: values["response"],
          company: values["company"],
          designation: values["designation"],
          email: values["email"],
          phone: values["phone"],
          lead_score: values["lead_score"],
          last_contacted: dateFormat(),
          // time: timeFormat(),
          tags: assignTag,
        };
        // save new Contact
        dispatch(onAddNewContact(newContact));
        validation.resetForm();
      }
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
  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime =
      moment(getTime, "hh:mm").format("hh:mm") + " " + meridiem;
    return updateTime;
  };

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
        accessor: "name",
        filterable: false,
        Cell: (contact) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0"></div>
              <div className="flex-grow-1 ms-2 name">
                {contact.row.original.name}
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Category",
        accessor: "lead_score",
        filterable: false,
      },
      {
        Header: "Who has answered",
        accessor: "phone",
      },
      {
        Header: "Status",
        accessor: "tags",
      },
      {
        Header: "Question Visibility",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Response %",
        accessor: "response",
        filterable: false,
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
                      href="/QAComparison"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
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
                        const contactData = cellProps.row.original;
                        onClickDelete(contactData);
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

  const [response, setResponse] = useState([]);
  const [assignResponse, setAssignResponse] = useState([]);

  function handlestag(response) {
    setResponse(response);
    const assigned = tags.map((item) => item.value);
    setAssignResponse(assigned);
  }
  const [tag, setTag] = useState([]);
  const [assignTag, setAssignTag] = useState([]);

  function handlestag(tags) {
    setTag(tags);
    const assigned = tags.map((item) => item.value);
    setAssignTag(assigned);
  }

  const tags = [
    { label: "Exiting", value: "Exiting" },
    { label: "Lead", value: "Lead" },
    { label: "Long-term", value: "Long-term" },
    { label: "Partner", value: "Partner" },
  ];

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
  const [Answers, setAnswers] = useState([
    { id: 1, name: "Yes" },
    { id: 2, name: "NO" },
    { id: 3, name: "We don't have a policy" },
    { id: 4, name: "Don't Know" },
    { id: 5, name: "Sell privately,Auction, Scrap Donate, Return to supplier" },
  ]);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [inputFields, setInputFields] = useState("");
  const handleEdits = (AnswerId) => {
    setEditingAnswerId(AnswerId);
    const Answer = Answers.find((c) => c.id === AnswerId);
    setInputFields(Answer.name);
  };

  const handleUpdates = () => {
    const updatedAnswerName = inputFields;
    const updatedAnswers = Answers.map((c) => {
      if (c.id === editingAnswerId) {
        return { ...c, name: updatedAnswerName };
      }
      return c;
    });
    setAnswers(updatedAnswers);
    setEditingAnswerId(null);
    setInputFields("");
  };
  const [updAnswers, setUpdAnswers] = useState([]);
  const [updCategories, setUpdCategories] = useState([]);

  const handleDeletes = (AnswerId, id) => {
    const updatedAnswers = Answers.filter((c) => c.id !== AnswerId);
    setUpdAnswers(updatedAnswers);
    setDeleteConfirmation(true);
  };
  const [modals_grid, setmodals_grid] = useState(false);
  function tog_grids() {
    setmodals_grid(!modals_grid);
  }
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
        id: categories.length + 1,
        name: newCategoryName,
      };
      setCategories([newCategory, ...categories]);
      setInputField("");
    }
  };
  const handleEdit = (categoryId) => {
    setEditingCategoryId(categoryId);
    const category = categories.find((c) => c.id === categoryId);
    setInputField(category.name);
  };

  const handleUpdate = () => {
    const updatedCategoryName = inputField;
    const updatedCategories = categories.map((c) => {
      if (c.id === editingCategoryId) {
        return { ...c, name: updatedCategoryName };
      }
      return c;
    });
    setCategories(updatedCategories);
    setEditingCategoryId(null);
    setInputField("");
  };

  const handleDelete = (categoryId) => {
    const updatedCategories = categories.filter((c) => c.id !== categoryId);
    console.log("upda", updatedCategories);
    setUpdCategories(updatedCategories);
    setDeleteConfirmation2(true);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(Answers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAnswers(items);
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

  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = (AnswerId, id) => {
    setAnswers(updAnswers);
    setDeleteConfirmation(false);
    setDeleteId(null);
  };
  const confirmDelete2 = (AnswerId, id) => {
    setCategories(updCategories);
    setDeleteConfirmation2(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setDeleteId(null);
  };
  const cancelDelete2 = () => {
    setDeleteConfirmation(false);
    setDeleteId(null);
  };
  document.title = "Benchmaking QA | GreenMe";
  return (
    <React.Fragment>
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
                Start new Question
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
                      setmodal_grid(false);
                    }}
                    className="btn-close color-black bg-white border border-dark rounded-circle "
                    aria-label="close"
                  ></Button>
                </div>
                <ModalHeader className="border-bottom border-dark p-4 pt-0">
                  <h4 className="modal-title">Start new Question</h4>
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
                                  backgroundColor: isChecked5
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
                                checked={isChecked6}
                                onChange={handleCheckboxChange6}
                                style={{
                                  backgroundColor: isChecked6
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
                          <option value="Choices1">
                            Occupancy & Utilsation Rates
                          </option>
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
                                backgroundColor: isChecked2
                                  ? "#88C756"
                                  : "#fff",
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
                                backgroundColor: isChecked3
                                  ? "#88C756"
                                  : "#fff",
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
                                backgroundColor: isChecked4
                                  ? "#88C756"
                                  : "#fff",
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
                              checked={isChecked1}
                              onChange={handleCheckboxChange1}
                              style={{
                                backgroundColor: isChecked1
                                  ? "#88C756"
                                  : "#fff",
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
            </Col>
            <div>
              <Button
                className="m-3 p-3"
                onClick={() => setmodals_Answer(true)}
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
                              {Answers &&
                                Answers.map((Answer, index) => (
                                  <>
                                    <Draggable
                                      key={Answer.id}
                                      draggableId={Answer.id.toString()}
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
                                              {Answer.name}
                                            </h5>
                                          </div>
                                          <div className="d-flex justify-content-end gap-2">
                                            <i
                                              className="ri-pencil-fill fs-18"
                                              style={{ color: "gray" }}
                                              onClick={() =>
                                                handleEdits(Answer.id)
                                              }
                                            ></i>
                                            <i
                                              className="ri-delete-bin-2-line fs-18"
                                              style={{ color: "red" }}
                                              onClick={() =>
                                                handleDeletes(Answer.id)
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
                                  <Button color="primary">Cancel</Button>
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
                onClick={() => setmodals_grid(true)}
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
                              {console.log("cat", categories)}
                              {categories &&
                                categories.map((category, index) => (
                                  <Draggable
                                    key={category.id}
                                    draggableId={category.id.toString()}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        key={category.id}
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
                                            {category.name}
                                          </h5>
                                        </div>
                                        <div className="d-flex justify-content-end gap-2">
                                          <i
                                            className="ri-pencil-fill fs-18"
                                            style={{ color: "gray" }}
                                            onClick={() =>
                                              handleEdit(category.id)
                                            }
                                          ></i>
                                          <i
                                            className="ri-delete-bin-2-line fs-18"
                                            style={{ color: "red" }}
                                            onClick={() =>
                                              handleDelete(category.id)
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
                {console.log("contact", crmcontacts)}
                {isContactSuccess && crmcontacts && crmcontacts.length ? (
                  <TableContainer
                    columns={columns}
                    data={crmcontacts || []}
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
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default BenchmarkingQA;
