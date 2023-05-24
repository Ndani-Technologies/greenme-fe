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
  ModalHeader,
  Form,
  ModalBody,
  Input,
  Label,
  Modal,
  ModalFooter,
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
import {
  deleteUserDetails,
  getUserDetails,
  updatedUserDetails,
} from "../../slices/usermanagement/thunk";
import { Select } from "@mui/material";

const UsersManagement = () => {
  const dispatch = useDispatch();
  const { userDetail, crmcontacts, isContactCreated, isContactSuccess, error } =
    useSelector((state) => ({
      crmcontacts: state.Crm.crmcontacts,
      isContactCreated: state.Crm.isContactCreated,
      isContactSuccess: state.Crm.isContactSuccess,

      userDetail: state.UserDetail.userDetail,
      error: state.Crm.error,
    }));
  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

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

  const onClickDelete = (user) => {
    console.log("selected row", user, user._id);
    dispatch(deleteUserDetails(user?._id));
    // setContact(contact);
    // setDeleteModal(true);
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
      img: (contact && contact.profilePic) || "",
      _id: (contact && contact._id) || "",
      name: (contact && contact.name) || "",
      company: (contact && contact.company) || "",
      designation: (contact && contact.designation) || "",
      email: (contact && contact.email) || "",
      phone: (contact && contact.phone) || "",
      leadScore: (contact && contact.leadScore) || "",
      tags: (contact && contact.tags) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      company: Yup.string().required("Please Enter Company"),
      designation: Yup.string().required("Please Enter Designation"),
      email: Yup.string().required("Please Enter Email"),
      phone: Yup.string().required("Please Enter Phone"),
      leadScore: Yup.string().required("Please Enter leadScore"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateContact = {
          _id: contact ? contact._id : 0,
          // img: values.img,
          firstName: values.name.split(" ")[0],
          lastName: values.name.split(" ")[1],
          organization: values.company,
          position: values.designation,
          email: values.email,
          phone: values.phone,
          leadScore: values.leadScore,
          last_contacted: dateFormat(),
          // time: timeFormat(),
          tags: tags.value,
        };
        console.log("on submit", updateContact);
        // update Contact
        // dispatch(onUpdateContact(updateContact));
        dispatch(updatedUserDetails(updateContact));
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
          leadScore: values["leadScore"],
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
      console.log("arg contact", contact);
      setContact({
        _id: contact._id,
        // img: contact.img,
        name: contact.name,
        company: contact.company,
        email: contact.email,
        designation: contact.designation,
        phone: contact.phone,
        leadScore: contact.leadScore,
        last_contacted: contact.date,
        // time: contact.time,
        tags: tag.value,
        // contact,
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
  const handelUpdate = () => {};

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
        accessor: "country",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "state",
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
                        // console.log("contactDatas", contactData);
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
  const tags = [
    { label: "Exiting", value: "Exiting" },
    { label: "Lead", value: "Lead" },
    { label: "Long-term", value: "Long-term" },
    { label: "Partner", value: "Partner" },
  ];
  const [tag, setTag] = useState([]);
  const [assignTag, setAssignTag] = useState([]);

  function handlestag(tags) {
    setTag(tags);
    const assigned = tags.map((item) => item.value);
    setAssignTag(assigned);
  }

  // SideBar Contact Deatail
  const [info, setInfo] = useState([]);

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState(false);

  document.title = "UsersManagement | GreenMe";
  return (
    <React.Fragment>
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
          <Row
            onClick={() => {
              // const contactData = cellProps.row.original;
              // setInfo(contactData);
            }}
          >
            <Col xxl={9}>
              <Card id="contactList">
                <CardBody className="pt-0">
                  <div>
                    {userDetail.length >= 0 ? (
                      <TableContainer
                        columns={columns}
                        data={userDetail || []}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        isFooter={true}
                        setInfo={setInfo}
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
                                      src={validation.values.img}
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
                                htmlFor="leadScore-field"
                                className="form-label"
                              >
                                Lead Score
                              </Label>

                              <Input
                                name="leadScore"
                                id="leadScore-field"
                                className="form-control"
                                placeholder="Enter Lead Score"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.leadScore || ""}
                                invalid={
                                  validation.touched.leadScore &&
                                  validation.errors.leadScore
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.leadScore &&
                              validation.errors.leadScore ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.leadScore}
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

            {/* <Col xxl={3}>
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
                          <td>{info.leadScore || "154"}</td>
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
            </Col> */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UsersManagement;
