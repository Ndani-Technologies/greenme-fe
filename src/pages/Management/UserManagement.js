import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import * as moment from "moment";
// Export Modal
import ExportCSVModal from "../../Components/Common/ExportCSVModal";

// Import Images
import avatar from "../../assets/images/avatar-6.jpg";

import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DeleteModal from "../../Components/Common/DeleteModal";

//Import actions
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
} from "../../slices/thunks";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import Loader from "../../Components/Common/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layouts from "../../Layouts";
const arr = [
  {
    _id: "625d3cd5923ccd040209ebf1",
    name: "Michael Morris",
    company: "Syntyce Solutions",
    designation: "NodeJS Developer",
    email: "michaelmorris@velzon.com",
    phone: "484-606-3104",
    lead_score: "Sweden",
    last_contacted: "2022-08-15T00:00:01.991Z",
    image_src: "avatar-6.jpg",
    tags: "active",
  },
  {
    _id: "625d3cd5923ccd040209ebf3",
    name: "Kevin Dawson",
    company: "Meta4Systems",
    designation: "Senoir Developer",
    email: "kevindawson@velzon.com",
    phone: "745-321-9874",
    lead_score: "Kenya",
    last_contacted: "2012-01-01T00:00:02.001Z",
    image_src: "avatar-5.jpg",
    tags: "Active",
  },
  {
    _id: "625d3cd5923ccd040209ebee",
    name: "James Price",
    company: "Themesbrand",
    designation: "Assitant Develope",
    email: "jamesprice@velzon.com",
    phone: "646-276-2274",
    lead_score: "Nigeria",
    last_contacted: "2021-07-14T00:00:01.997Z",
    image_src: "avatar-8.jpg",
    tags: "Banned",
  },
  {
    _id: "625d3cd5923ccd040209ebf0",
    name: "Herbert Stokes",
    company: "Themesbrand",
    designation: "Lead Developer",
    email: "herbertstokes@velzon.com",
    phone: "949-791-0614",
    lead_score: "Malaysia",
    last_contacted: "1970-01-01T00:00:02.001Z",
    image_src: "avatar-4.jpg",
    tags: "Banned",
  },
  {
    _id: "625d3cd5923ccd040209ebf2",
    name: "Timothy Smith",
    company: "Digitech Galaxy",
    designation: "Mean Stack Developer",
    email: "timothysmith@velzon.com",
    phone: "231-480-8536",
    lead_score: "Japan",
    last_contacted: "2021-10-21T00:00:01.993Z",
    image_src: "avatar-8.jpg",
    tags: "Active",
  },
  {
    _id: "625d3cd5923ccd040209ebeb",
    name: "Thomas Taylor",
    company: "iTest Factory",
    designation: "UI / UX Designer",
    email: "thomastaylor@velzon.com",
    phone: "580-464-4694",
    lead_score: "Poland",
    last_contacted: "2022-02-22T00:00:01.994Z",
    image_src: "avatar-9.jpg",
    tags: "Banned",
  },
  {
    _id: "625d3cd5923ccd040209ebec",
    name: "Nancy Martino",
    company: "Force Medicines",
    designation: "PHP Developer",
    email: "nancymartino@velzon.com",
    phone: "786-253-9927",
    lead_score: "UK",
    last_contacted: "1970-02-02T00:00:02.004Z",
    image_src: "avatar-1.jpg",
    tags: "Active",
  },
  {
    _id: "625d3cd5923ccd040209ebea",
    name: "Tonya Noble 123",
    company: "Nesta Technologies",
    designation: "Lead Designer / Developer",
    email: "tonyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "Russia",
    last_contacted: "2022-05-09T18:30:00.000Z",
    image_src: "avatar-7.jpg",
    tags: "Active",
  },
  {
    _id: "625d3cd5923ccd040209ebef",
    name: "Mary Cousar",
    company: "Micro Design",
    designation: "Asp.Net Developer",
    email: "marycousar@velzon.com",
    phone: "540-575-0991",
    lead_score: "Poland",
    last_contacted: "2010-11-05T00:00:02.016Z",
    image_src: "avatar-3.jpg",
    tags: "Banned",
  },
  {
    _id: "625d3cd5923ccd040209ebed",
    name: "Alexis Clarke",
    company: "Digitech Galaxy",
    designation: "Full Stack Developer",
    email: "alexisclarke@velzon.com",
    phone: "515-395-1069",
    lead_score: "Japan",
    last_contacted: "1970-01-01T00:00:01.996Z",
    image_src: "avatar-6.jpg",
    tags: "Active",
  },
];
const UsersManagement = () => {
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
        Header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
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
              <div className="flex-shrink-0">
                {
                  contact.row.original.image_src ? (
                    <img
                      src={
                        avatar
                        // process.env.REACT_APP_API_URL +
                        // "../../assets/images/" +
                        // contact.row.original.image_src
                      }
                      alt=""
                      className="avatar-xxs rounded-circle"
                    />
                  ) : (
                    <div className="flex-shrink-0 avatar-xs me-2">
                      <div className="avatar-title bg-soft-success text-success rounded-circle fs-13">
                        {contact.row.original.name.charAt(0)}
                      </div>
                    </div>
                  )
                  // <img src={dummyImg} alt="" className="avatar-xxs rounded-circle" />
                }
              </div>
              <div className="flex-grow-1 ms-2 name">
                {contact.row.original.name}
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Orgnaization",
        accessor: "company",
        filterable: false,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Country",
        accessor: "lead_score",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "tags",
      },
      {
        Header: "Last Seen",
        Cell: (contact) => (
          <>
            {handleValidDate(contact.row.original.last_contacted)},{" "}
            <small className="text-muted">
              {/* {handleValidTime(contact.row.original.last_contacted)} */}
            </small>
          </>
        ),
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
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
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      {/* <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "} */}
                      View
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      {/* <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "} */}
                      Activate
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        handleContactClick(contactData);
                      }}
                    >
                      {/* <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "} */}
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
                      {/* <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "} */}
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

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState(false);

  document.title = "UsersManagement | GreenMe";
  return (
    <React.Fragment>
      <Layouts>
        <div className="page-content">
          <ExportCSVModal
            show={isExportCSV}
            onCloseClick={() => setIsExportCSV(false)}
            data={crmcontacts}
          />
          <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteContact}
            onCloseClick={() => setDeleteModal(false)}
          />
          <DeleteModal
            show={deleteModalMulti}
            onDeleteClick={() => {
              deleteMultiple();
              setDeleteModalMulti(false);
            }}
            onCloseClick={() => setDeleteModalMulti(false)}
          />
          <Container fluid>
            <BreadCrumb title="USER MANAGEMENT" pageTitle="CRM" />
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
                          isFooter={true}
                          customPageSize={8}
                          className="custom-header-css"
                          divClass="table-responsive table-card mb-0"
                          tableClass="align-middle table-nowrap"
                          theadClass="table-light"
                          handleContactClick={handleContactClicks}
                          isContactsFilter={true}
                          SearchPlaceholder="Search for contact..."
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
                    <div className="table-responsive table-card">
                      <Table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td className="fw-medium">Country</td>
                            <td>UK</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Designation</td>
                            <td>Global Fleet Manager</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Email ID</td>
                            <td>{info.email || "tonyanoble@velzon.com"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Points</td>
                            <td>235</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Leaderboard points</td>
                            <td>{info.lead_score || "154"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Area of Expertise</td>
                            <td>Tracking, Management.</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                  <CardBody>
                    <div className="progress animated-progress custom-progress progress-label mt-4">
                      <div
                        className="progress-bar bg- "
                        role="progressbar"
                        style={{ width: "40%" }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div className="label">40%</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4 mt-3">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-0">Benchmark progress</h5>
                      </div>
                    </div>
                  </CardBody>
                  <CardBody>
                    <div className="progress animated-progress custom-progress progress-label mt-0">
                      <div
                        className="progress-bar bg- "
                        role="progressbar"
                        style={{ width: "30%" }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div className="label">30%</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4 mt-3">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-0">
                          Recommended actions progress
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex gap-2 ">
                      <span className="mt-2">Chat</span>
                      <span className="avatar-xs">
                        <Link
                          to="#"
                          className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                        >
                          <i className="ri-question-answer-line"></i>
                        </Link>
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Layouts>
    </React.Fragment>
  );
};

export default UsersManagement;
