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
} from "reactstrap";
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
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
import { Link, NavLink } from "react-router-dom";
const arr = [
  {
    _id: "625d3cd5923ccd040209ebf1",
    name: "Michael Morris",
    email: "45%",
    Email: "Benchmark 1",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. A",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebf3",
    name: "Kevin Dawson",
    email: "10%",
    Email: "Benchmark 2",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. B",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebee",
    name: "James Price",
    email: "100%",
    Email: "Benchmark 3",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. C",
    tags: "Completed",
  },
  {
    _id: "625d3cd5923ccd040209ebf0",
    name: "Herbert Stokes",
    email: "80%",
    Email: "Benchmark 4",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. D",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebf2",
    name: "Timothy Smith",
    email: "0%",
    Email: "Benchmark 5",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. E",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebeb",
    name: "Thomas Taylor",
    company: "iTest Factory",
    designation: "UI / UX Designer",
    email: "45%",
    Email: "Benchmark 6",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. F",
    tags: "progress",
  },
  {
    _id: "625d3cd5923ccd040209ebec",
    name: "Nancy Martino",
    company: "Force Medicines",
    designation: "PHP Developer",
    email: "70%",
    Email: "Benchmark 7",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. G",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebea",
    name: "Tonya Noble 123",
    company: "Nesta Technologies",
    designation: "Lead Designer / Developer",
    email: "100%",
    Email: "Benchmark 8",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. H",
    tags: "Completed",
  },
  {
    _id: "625d3cd5923ccd040209ebef",
    name: "Mary Cousar",
    company: "Micro Design",
    designation: "Asp.Net Developer",
    email: "20%",
    Email: "Benchmark 9",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. I",
    tags: "inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebed",
    name: "Alexis Clarke",
    company: "Digitech Galaxy",
    designation: "Full Stack Developer",
    email: "10%",
    Email: "Benchmark 10",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. J",
    tags: "Inprogress",
  },
];
const BenchmarkAdmin = () => {
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
        Header: "Full Name",
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
        Header: "Organization",
        accessor: "lead_score",
        filterable: false,
      },
      {
        Header: "Completion Level",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Benchmark Title",
        accessor: "Email",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "tags",
      },
      {
        Header: "Start Date",
        Cell: (contact) => (
          <>
            {handleValidDate(contact.row.original.last_contacted)},{" "}
            <small className="text-muted"></small>
          </>
        ),
      },
      {
        Header: "End Date",
        Cell: (contact) => (
          <>
            {handleValidDate(contact.row.original.last_contacted)},{" "}
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
                      href={`/adminbenchmarking/summary/${_id}`}
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      View
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item"
                      href="/adminbenchmarking/compare"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      Edit
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
  document.title = "Profile | GreenMe";
  return (
    <React.Fragment>
      <Layouts>
        <div className="page-content overflow-auto ">
          <div className="Main-sec mx-n4 mt-n4 w-100">
            <h1>
              Benchmarking <span className="fs-5">Admin</span>
            </h1>
            <p style={{ color: "#BEC887" }}>
              This is a page where users can take self-assessment questionnaires
              and view their results. It will feature the ability for users to
              save progress and return to the assessment later as well as an
              option to skip or go back to previous questions. Also the option
              for the user to view their score and their benchmark results
            </p>
          </div>
          <Col xxl={9} className="m-auto">
            <Col className="d-flex justify-content-between mt-0 p-5 pt-3 pb-2"></Col>
            <Row>
              <Col xxl={9}>
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
                          isFilterA={true}
                          isFooter={true}
                          isSearchInput={false}
                          customPageSize={8}
                          className="custom-header-css"
                          divClass="table-responsive table-card mb-0"
                          tableClass="align-middle table-nowrap"
                          theadClass="table-light"
                          handleContactClick={handleContactClicks}
                          isContactsFilter={false}
                          SearchPlaceholder={false}
                        />
                      ) : (
                        <Loader error={error} />
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xxl={3}>
                <Card id="contact-view-detail">
                  <CardBody className="text-center">
                    <div className="position-relative d-inline-block">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-lg rounded-circle img-thumbnail"
                      />
                      <span className="contact-active position-absolute rounded-circle bg-success">
                        <span className="visually-hidden"></span>
                      </span>
                    </div>
                    <h5 className="mt-4 mb-1">{info.name || "Tonya Noble"}</h5>
                    <p className="text-muted">
                      {info.company || "FleetMGT Co. Z"}
                    </p>
                  </CardBody>
                  <CardBody>
                    <div className="progress animated-progress custom-progress progress-label mt-4">
                      <div
                        className="progress-bar bg- "
                        role="progressbar"
                        style={{ width: "50%" }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div className="label">50%</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4 mt-3">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-">Benchmark Completion</h5>
                      </div>
                    </div>
                  </CardBody>
                  <CardBody className="d-flex gap-2 ">
                    <span className="mt-2">Chat</span>
                    <span className="avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                      >
                        <i className="ri-question-answer-line"></i>
                      </Link>
                    </span>
                  </CardBody>
                  <CardBody>
                    <div className="table-responsive table-card">
                      <Table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td className="fw-medium">Orgnaisation</td>
                            <td>FleetMGT Co. A</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Benchmark title</td>
                            <td>Country Fleet Manager</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Country</td>
                            <td>Kenya</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Leaderboard</td>
                            <td>{info.lead_score || "154 points"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Last Seen</td>
                            <td>
                              15 Dec, 2021<span> 08:58AM</span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </div>
      </Layouts>
    </React.Fragment>
  );
};

export default BenchmarkAdmin;
