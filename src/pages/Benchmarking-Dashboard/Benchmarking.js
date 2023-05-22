import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as moment from "moment";
import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
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
} from "reactstrap";
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
  getAllBenchmarks,
  startBenchmark,
  addBenchmark,
} from "../../slices/thunks";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { TooltipModalExample } from "../BaseUi/UiModals/UiModalCode";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import Layouts from "../../Layouts";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import dummyImg from "../../assets/images/users/user-dummy-img.jpg";
import { Height } from "@mui/icons-material";
import { Link } from "react-router-dom";
const arr = [
  {
    _id: "625d3cd5923ccd040209ebf1",
    name: "Michael Morris",
    email: "45%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Japan",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebf3",
    name: "Kevin Dawson",
    email: "10%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Kenya",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebee",
    name: "James Price",
    email: "100%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Nigeria",
    tags: "Completed",
  },
  {
    _id: "625d3cd5923ccd040209ebf0",
    name: "Herbert Stokes",
    email: "80%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Malaysia",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebf2",
    name: "Timothy Smith",
    email: "0%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Japan",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebeb",
    name: "Thomas Taylor",
    company: "iTest Factory",
    designation: "UI / UX Designer",
    email: "45%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Poland",
    tags: "Completed",
  },
  {
    _id: "625d3cd5923ccd040209ebec",
    name: "Nancy Martino",
    company: "Force Medicines",
    designation: "PHP Developer",
    email: "70%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Japan",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebea",
    name: "Tonya Noble 123",
    company: "Nesta Technologies",
    designation: "Lead Designer / Developer",
    email: "100%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Russia",
    tags: "Progess",
  },
  {
    _id: "625d3cd5923ccd040209ebef",
    name: "Mary Cousar",
    company: "Micro Design",
    designation: "Asp.Net Developer",
    email: "20%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Poland",
    tags: "Completed",
  },
  {
    _id: "625d3cd5923ccd040209ebed",
    name: "Alexis Clarke",
    company: "Digitech Galaxy",
    designation: "Full Stack Developer",
    email: "10%",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Japan",
    tags: "Inprogress",
  },
];
const BenchmarkingDashboard = () => {
  const dispatch = useDispatch();
  const [benchmarks, setBenchmarks] = useState([]);
  const { crmcontacts, isContactCreated, isContactSuccess, error } =
    useSelector((state) => ({
      crmcontacts: state.Crm.crmcontacts,
      isContactCreated: state.Crm.isContactCreated,
      isContactSuccess: state.Crm.isContactSuccess,
      error: state.Crm.error,
      // benchmarks: state.Benchmark.benchmarks
    }));
  const getBenchmarks = () => {
    getAllBenchmarks()
      .then((resp) => {
        console.log("response get all benchamrks", resp);
        setBenchmarks(resp ?? []);
      })
      .catch((err) => {
        console.log("error get all benchamrks", err);
      });
  };
  useEffect(() => {
    getBenchmarks();
  }, []);

  useEffect(() => {
    console.log("benchmarks useeffect", benchmarks);

    benchmarks.length > 0 && setContact(benchmarks);
  }, [benchmarks]);

  useEffect(() => {
    if (!isEmpty(benchmarks)) {
      setContact(benchmarks);
      setIsEdit(false);
    }
  }, [benchmarks]);

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
        Header: "Title of Benchmark",
        accessor: "title",
        filterable: false,
      },
      {
        Header: "Country",
        accessor: "country",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Completion Level",
        accessor: "completion_level",
        filterable: false,
      },
      {
        Header: "Start Date",
        accessor: "start_date",
        Cell: (contact) => (
          <>
            {handleValidDate(contact.row.original.start_date)}
            <small className="text-muted"></small>
          </>
        ),
      },
      {
        Header: "End Date",
        accessor: "end_data",
        Cell: (contact) => (
          <>
            {handleValidDate(
              contact.row.original.end_date ? contact.row.original.end_date : ""
            )}
            <small className="text-muted"></small>
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
                      href={`/benchmarking/summary/${_id}`}
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                        console.log("contact data", contactData);
                      }}
                    >
                      View
                    </DropdownItem>
                    {/* <Link to={`/benchmarking/${_id}`}> */}
                    <DropdownItem
                      className="dropdown-item"
                      href={`/benchmarking/${_id}`}
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      Edit
                    </DropdownItem>
                    {/* </Link> */}
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

  const validation2 = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      country: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
      console.log("values benchmark", values);
      let resp = await addBenchmark(values);
      setBenchmarks([...benchmarks, resp]);
      validation2.resetForm();
      setmodal_grid(false);
    },
  });

  return (
    <React.Fragment>
      {/* <Layouts> */}
      <div className="page-content overflow-auto ">
        <div className="Main-sec mx-n4 mt-n4 w-100">
          <h1>Benchmarking</h1>
          <p style={{ color: "#BEC887" }}>
            This is a page where users can take self-assessment questionnaires
            and view their results. It will feature the ability for users to
            save progress and return to the assessment later as well as an
            option to skip or go back to previous questions. Also the option for
            the user to view their score and their benchmark results
          </p>
        </div>
        <Col xxl={9} className="m-auto">
          <div
            className="d-flex justify-content-between"
            style={{ paddingRight: "100px" }}
          >
            <Col className="pt-5">
              <Button
                className="d-flex align-items-center justify-content-between w-25 p-3 bg-white shadow-lg p-3 mb-5 rounded"
                color="white"
                onClick={() => setmodal_grid(true)}
              >
                Start new Benchmark
                <i class="ri-add-fill"></i>
              </Button>
              <Modal
                className="postion-relative"
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
                  <h4 className="modal-title">Benchmarking</h4>
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation2.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="row g-3">
                      <Col xxl={12}>
                        <div>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Enter Benchmark title"
                            name="title"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation2.handleChange}
                            onBlur={validation2.handleBlur}
                            value={validation2.values.title || ""}
                            invalid={
                              validation2.touched.title &&
                              validation2.errors.title
                                ? true
                                : false
                            }
                          />
                          {validation2.touched.title &&
                          validation2.errors.title ? (
                            <FormFeedback type="invalid">
                              {validation2.errors.title}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <select
                          lg={12}
                          className="form-select mb-3"
                          name="country"
                          onChange={validation2.handleChange}
                          onBlur={validation2.handleBlur}
                          value={validation2.values.country || ""}
                          invalid={
                            validation2.touched.country &&
                            Boolean(validation2.errors.country)
                          }
                        >
                          <option>Select Duty Station Country</option>
                          <option value="kenya">Kenya</option>
                          <option value="uk">United Kingdom</option>
                        </select>
                        {validation2.touched.country &&
                        validation2.errors.country ? (
                          <FormFeedback type="invalid">
                            {validation2.errors.country}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <div className="col-lg-12">
                        <div className="hstack gap-2 justify-content-start">
                          <Button type="submit" color="primary">
                            Start Benchmark
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </ModalBody>
              </Modal>
            </Col>
            <div className="pt-2 d-flex gap-3">
              <i class="ri-share-line"></i>
              <i class="ri-flag-line"></i>
            </div>
          </div>
          <Card id="contactList">
            <CardBody className="pt-0">
              <div>
                {console.log("benchmar", benchmarks)}
                {!!benchmarks.length >= 0 ? (
                  <TableContainer
                    columns={columns}
                    data={benchmarks || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    isFilterA={true}
                    isFooter={true}
                    customPageSize={8}
                    className="custom-header-css"
                    divClass="table-responsive table-card mb-0"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light"
                    handleContactClick={handleContactClicks}
                    isSearchInput={true}
                    SearchPlaceholder="Search for contact..."
                    setInfo={setInfo}
                  />
                ) : (
                  <Loader error={error} />
                )}
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
                          <Label htmlFor="name-field" className="form-label">
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
                              validation.touched.name && validation.errors.name
                                ? true
                                : false
                            }
                          />
                          {validation.touched.name && validation.errors.name ? (
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
                            value={validation.values.start || ""}
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
                            Email ID
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
                          <Label htmlFor="phone-field" className="form-label">
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

                          {validation.touched.tags && validation.errors.tags ? (
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
      </div>
      {/* </Layouts> */}
    </React.Fragment>
  );
};

export default BenchmarkingDashboard;
