import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as moment from "moment";
import {
  Col,
  Row,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  Input,
  Label,
  Button,
} from "reactstrap";
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
  getAllAdminBenchmarks,
  deleteBenchmark,
  removeBenchmarkUserResp,
} from "../../slices/thunks";
import avatar from "../../assets/images/avatar-6.jpg";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import { toast, ToastContainer } from "react-toastify";
import Layouts from "../../Layouts";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import dummyImg from "../../assets/images/users/user-dummy-img.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Select } from "@mui/material";

const BenchmarkAdmin = () => {
  const dispatch = useDispatch();
  const { crmcontacts, isContactCreated, isContactSuccess, error } =
    useSelector((state) => ({
      crmcontacts: state.Crm.crmcontacts,
      isContactCreated: state.Crm.isContactCreated,
      isContactSuccess: state.Crm.isContactSuccess,
      error: state.Crm.error,
    }));
  const [benchmark, setBenchmark] = useState([]);
  const getAllAdminBench = () => {
    getAllAdminBenchmarks()
      .then((res) => {
        setBenchmark(res);
      })
      .catch((err) => console.log("err in getting all admin benhc", err));
  };
  useEffect(() => {
    getAllAdminBench();
  }, []);
  useEffect(() => {
    setContact(crmcontacts);
  }, [crmcontacts]);

  useEffect(() => {
    if (!isEmpty(crmcontacts)) {
      setContact(crmcontacts);
      setIsEdit(false);
    }
  }, [crmcontacts]);

  const navigate = useNavigate();

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
      company: (contact && contact.company) || "",
      designation: (contact && contact.designation) || "",
      email: (contact && contact.email) || "",
      phone: (contact && contact.phone) || "",
      lead_score: (contact && contact.lead_score) || "",
      tags: (contact && contact.tags) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
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
    const date1 = moment(new Date(date)).format("YYYY MM DD");
    return date == "" ? date : date1;
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
  const [selectedAnswerOptions, setSelectedAnswerOptions] = useState([]);
  const deletedArr = [];
  const deleteMultiple = () => {
    // const checkall = document.getElementById("checkBoxAll");
    // console.log(selectedCheckBoxDelete, "SELECTED")
    // selectedCheckBoxDelete.forEach((element) => {
    //   console.log(element, "VAL")
    //   dispatch(onDeleteContact(element.value));
    //   // setTimeout(() => {
    //   //   toast.clearWaitingQueue();
    //   // }, 3000);
    // });
    // setIsMultiDeleteButton(false);
    console.log("tobedeleted", toBeDeleted);
    console.log(benchmark, "Benchmark");
    toBeDeleted.forEach((value) => {
      setBenchmark((prev) => prev.filter((element) => element._id !== value));
    });
    // checkall.checked = false;
  };

  //HANDLE DELETE
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setDeleteId(null);
  };
  const confirmDelete = () => {
    deleteBenchmark(deleteId)
      .then(() => {
        setBenchmark((prev) => prev.filter((value) => value._id !== deleteId));
        toast.success("Benchmark is deleted");
        setDeleteConfirmation(false);
      })
      .catch(() => {
        toast.error("Error in Benchmark deletion.");
        setDeleteConfirmation(false);
      });
  };

  const deleteCheckbox = (id) => {
    const ele = document.querySelectorAll(".contactCheckBox:checked");
    console.log("id", id);
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  //RESET HANDLE

  const [modal_center, setmodal_center] = useState(false);

  const tog_center = () => {
    setmodal_center(!modal_center);
  };

  // const [resetData, setResetData] = useState(null);
  const handleResetClick = (data) => {
    setInfo(data);
    tog_center();
  };

  const [toBeDeleted, setToBeDeleted] = useState([]);
  // Column
  const columns = useMemo(
    () => [
      {
        Header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
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
        Header: "Benchmark Title",
        accessor: "title",
        filterable: false,
        Cell: (cellProps) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0"></div>
              <div
                className="flex-grow-1 ms-2 name cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  const contactData = cellProps.row.original;
                  setInfo(contactData);
                  navigate(`/adminbenchmarking/${cellProps.row.original._id}`);
                }}
              >
                {cellProps.row.original.title}
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Full Name",
        accessor: "name",
        filterable: false,
      },
      {
        Header: "Organization",
        accessor: "organization",
        filterable: false,
      },
      {
        Header: "Country",
        accessor: "country",
        filterable: false,
      },
      {
        Header: "Completion Level",
        accessor: "completionLevel",
        filterable: false,
        Cell: (cellProps) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0"></div>
              <div className="flex-grow-1 ms-2 name">
                {Math.floor(cellProps.row.original.completionLevel)}%
              </div>
            </div>
          </>
        ),
      },

      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Start Date",
        accessor: "start_date",
        Cell: (contact) => (
          <>
            {handleValidDate(contact.row.original.start_date)},{" "}
            <small className="text-muted"></small>
          </>
        ),
      },
      {
        Header: "Completion Date",
        accessor: "end_date",
        Cell: (contact) => (
          <>
            {contact.row.original.end_date !== null &&
            contact.row.original.end_date !== undefined
              ? handleValidDate(contact.row.original.end_date)
              : "In Progress"}
            , <small className="text-muted"></small>
          </>
        ),
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
                      href={`/adminbenchmarking/summary/${_id}`}
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      View Summary
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item"
                      href={`/adminbenchmarking/${cellProps.row.original._id}`}
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      View Benchmark
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        console.log(contactData, "CD");
                        handleResetClick(contactData);
                      }}
                    >
                      Reset
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item remove-item-btn"
                      href="#"
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setDeleteId(cellProps.row.original._id);
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

  const [modal_grid, setmodal_grid] = useState(false);
  function tog_grid() {
    setmodal_grid(!modal_grid);
  }

  //RESET CONFIRMATION

  const handleResetConfirm = (info) => {
    console.log(info, "IN CONFIRM");
    const updatedData = {
      user_resp: [],
      completionLevel: 0,
    };

    removeBenchmarkUserResp(info._id, updatedData)
      .then(() => getAllAdminBenchmarks())
      .then((res) => {
        console.log(res, "RES");
        if (res !== undefined) {
          toast.success("Reset Successfully");
          setBenchmark(res);
        } else {
          toast.error("Unable to Reset Data");
        }
      })
      .catch((err) => console.log(err));
    setmodal_center(false);
  };

  document.title = "Profile | GreenMe";
  return (
    <React.Fragment>
      {/* <Layouts> */}
      <div className="page-content overflow-auto ">
        <div className="Main-sec mx-n4 mt-n4 w-100">
          <h1>
            Benchmarking <span className="fs-5">Admin</span>
          </h1>
          <p style={{ color: "#BEC887" }}>
            In this section you will find a self-assessment questionnaire and,
            once completed, you can view your results against your peers. You
            have the option to complete the assessment at once or save your
            progress and return later. We do encourage you to complete the
            assessment but if you don’t have the answer to questions, you can
            skip them. Once you are done with the assessment, press submit and
            you will receive a benchmark report..
          </p>
        </div>
        <Col xxl={12}>
          <Col className="d-flex justify-content-between mt-4 p-5 pt-3 pb-2"></Col>
          <Row>
            <Col xxl={12}>
              <Card id="contactList" style={{ width: "98%" }}>
                <CardBody className="pt-0">
                  <div>
                    {benchmark?.length >= 0 ? (
                      <TableContainer
                        columns={columns}
                        data={benchmark || []}
                        isGlobalFilter={true}
                        isFilterAdminBenchmark={true}
                        setInfo={setInfo}
                        isFooter={true}
                        customPageSize={8}
                        className="custom-header-css"
                        divClass="table-responsive table-card mb-0"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light"
                        handleContactClick={handleContactClicks}
                      />
                    ) : (
                      <Loader error={error} />
                    )}
                    <Button
                      onClick={() => {
                        setBenchmark((prev) =>
                          prev.filter(
                            (element) => !toBeDeleted.includes(element._id)
                          )
                        );
                      }}
                    >
                      Delete All
                    </Button>
                  </div>

                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-soft-info p-3" toggle={toggle}>
                      {!!isEdit ? "Edit Contact" : "Add Contact"}
                    </ModalHeader>

                    <Form
                      className="tablelist-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <ModalBody>
                        <Input type="hidden" id="id-field" />
                        <Row className="g-3">
                          <Col lg={12}>
                            <div className="text-center">
                              <div className="position-relative d-inline-block">
                                <div className="position-absolute  bottom-0 end-0">
                                  <Label
                                    htmlFor="customer-image-input"
                                    className="mb-0"
                                  >
                                    <div className="avatar-xs cursor-pointer">
                                      <div className="avatar-title bg-light border rounded-circle text-muted">
                                        <i className="ri-image-fill"></i>
                                      </div>
                                    </div>
                                  </Label>
                                  <Input
                                    className="form-control d-none"
                                    id="customer-image-input"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.img || ""}
                                    invalid={
                                      validation.touched.img &&
                                      validation.errors.img
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                                <div className="avatar-lg p-1">
                                  <div className="avatar-title bg-light rounded-circle">
                                    <img
                                      src={dummyImg}
                                      alt="dummyImg"
                                      id="customer-img"
                                      className="avatar-md rounded-circle object-cover"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label
                                htmlFor="name-field"
                                className="form-label"
                              >
                                Name
                              </Label>
                              <Input
                                name="name"
                                id="customername-field"
                                className="form-control"
                                placeholder="Enter Name"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="company_name-field"
                                className="form-label"
                              >
                                Company Name
                              </Label>
                              <Input
                                name="company"
                                id="company_name-field"
                                className="form-control"
                                placeholder="Enter Company Name"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.company || ""}
                                invalid={
                                  validation.touched.company &&
                                  validation.errors.company
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.company &&
                              validation.errors.company ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.company}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="designation-field"
                                className="form-label"
                              >
                                Designation
                              </Label>

                              <Input
                                name="designation"
                                id="designation-field"
                                className="form-control"
                                placeholder="Enter Designation"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.designation || ""}
                                invalid={
                                  validation.touched.designation &&
                                  validation.errors.designation
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.designation &&
                              validation.errors.designation ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.designation}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="email_id-field"
                                className="form-label"
                              >
                                Emai
                              </Label>

                              <Input
                                name="email"
                                id="email_id-field"
                                className="form-control"
                                placeholder="Enter Email"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="phone-field"
                                className="form-label"
                              >
                                Phone
                              </Label>

                              <Input
                                name="phone"
                                id="phone-field"
                                className="form-control"
                                placeholder="Enter Phone No."
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone &&
                                  validation.errors.phone
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.phone &&
                              validation.errors.phone ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.phone}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="lead_score-field"
                                className="form-label"
                              >
                                Lead Score
                              </Label>

                              <Input
                                name="lead_score"
                                id="lead_score-field"
                                className="form-control"
                                placeholder="Enter Lead Score"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.lead_score || ""}
                                invalid={
                                  validation.touched.lead_score &&
                                  validation.errors.lead_score
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.lead_score &&
                              validation.errors.lead_score ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.lead_score}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="taginput-choices"
                                className="form-label font-size-13 text-muted"
                              >
                                Tags
                              </Label>
                              <Select
                                isMulti
                                value={tag}
                                onChange={(e) => {
                                  handlestag(e);
                                }}
                                className="mb-0"
                                options={tags}
                                id="taginput-choices"
                              ></Select>

                              {validation.touched.tags &&
                              validation.errors.tags ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.tags}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                              setModal(false);
                            }}
                          >
                            {" "}
                            Close{" "}
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success"
                            id="add-btn"
                          >
                            {" "}
                            {!!isEdit ? "Update" : "Add Contact"}{" "}
                          </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </CardBody>
              </Card>
            </Col>
            <Modal isOpen={deleteConfirmation} toggle={cancelDelete}>
              <ModalHeader toggle={cancelDelete}>Confirm Deletion</ModalHeader>
              <ModalBody>
                Are you sure you want to delete this Benhmark?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={confirmDelete}>
                  Delete
                </Button>
                <Button color="secondary" onClick={cancelDelete}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

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
                Reset Benchmark
              </ModalHeader>
              <ModalBody
                className="d-flex justify-content-center"
                style={{ fontSize: "20px" }}
              >
                <p>Are you sure you want to Reset this benchmark</p>
              </ModalBody>
              <ModalFooter className="d-flex justify-content-center">
                <Button
                  color="primary"
                  onClick={() => handleResetConfirm(info)}
                >
                  Confirm
                </Button>
                <Button color="secondary" onClick={() => tog_center()}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Row>
        </Col>
      </div>
      {/* </Layouts> */}
    </React.Fragment>
  );
};

export default BenchmarkAdmin;
