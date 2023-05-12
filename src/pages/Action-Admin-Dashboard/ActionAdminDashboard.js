import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as moment from "moment";
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
} from "../../slices/thunks";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import Layouts from "../../Layouts";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import ActionModal from "./components/ActionModal";
import CategoryModal from "./components/CategoryModal";
const arr = [
  {
    _id: "625d3cd5923ccd040209ebf1",
    name: "Does your organisation have environmental commitments?",
    phone: "Max",
    email: "low",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Avoid",
    tags: "active",
    response: "low",
    Scale: "intermediate",
  },
  {
    _id: "625d3cd5923ccd040209ebf3",
    name: "Does your organisation have a ‘green’ strategy?",
    phone: "Max",
    email: "low",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Improve",
    tags: "In progress",
    response: "low",
    Scale: "Short term",
  },
  {
    _id: "625d3cd5923ccd040209ebee",
    name: "Does your fleet policy contain references to a green strategy or environmental sustainability?",
    phone: "Max",
    email: "low",
    lead_score: "Shift",
    tags: "In progress",
    response: "low",
    Scale: "intermediate",
  },
  {
    _id: "625d3cd5923ccd040209ebf0",
    name: "Does your fleet policy include guidance to use the vehicle with the lowest environmental impact?",
    phone: "Medium",
    email: "Very High",
    lead_score: "Avoid",
    tags: "In progress",
    response: "low",
    Scale: "Medium term",
  },
  {
    _id: "625d3cd5923ccd040209ebf2",
    name: "Do you have standardised fleet procurement (global framework agreement…)?",
    phone: "Medium",
    email: "Medium",
    lead_score: "Improve",
    tags: "In progress",
    response: "low",
    Scale: "intermediate",
  },
  {
    _id: "625d3cd5923ccd040209ebeb",
    name: "Do you use sustainability criteria to assess/ select suppliers?",
    phone: "Low",
    company: "iTest Factory",
    designation: "UI / UX Designer",
    email: "low",
    lead_score: "Shift",
    tags: "In progress",
    response: "low",
    Scale: "Medium term",
  },
  {
    _id: "625d3cd5923ccd040209ebec",
    name: "How do you dispose of vehicles?",
    phone: "Max",
    company: "Force Medicines",
    designation: "PHP Developer",
    email: "Medium",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "General",
    tags: "In progress",
    response: "low",
    Scale: "Short term",
  },
  {
    _id: "625d3cd5923ccd040209ebea",
    name: "Do you take the environmental impact into consideration when planning for disposal ?",
    phone: "Medium",
    company: "Nesta Technologies",
    designation: "Lead Designer / Developer",
    email: "High",
    lead_score: "Shift",
    tags: "In progress",
    response: "low",
    Scale: "intermediate",
  },

  {
    _id: "625d3cd5923ccd040209ebef",
    name: "How do you dispose of vehicles?",
    phone: "Max",
    company: "Micro Design",
    designation: "Asp.Net Developer",
    email: "Very High",
    lead_score: "Improve",
    tags: "In progress",
    response: "low",
    Scale: "Long term",
  },
  {
    _id: "625d3cd5923ccd040209ebed",
    name: "How do you dispose of vehicles?",
    phone: "Low",
    company: "Digitech Galaxy",
    designation: "Full Stack Developer",
    email: "low",
    lead_score: "Shift",
    tags: "In progress",
    response: "low",
    Scale: "intermediate",
  },
];
const ActionAdminDashboard = () => {
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
      Scale: (contact && contact.Scale) || "",
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
          Scale: assignScale,
          company: values.company,
          designation: values.designation,
          email: values.email,
          Scale: values.Scale,
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
          Scale: values["Scale"],
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
        Scale: contact.Scale,
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
        Header: "Title",
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
        Header: "Weight",
        accessor: "phone",
      },
      {
        Header: "Status",
        accessor: "tags",
      },
      {
        Header: "Potential",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Cost",
        accessor: "response",
        filterable: false,
      },
      {
        Header: "Timescale",
        accessor: "Scale",
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
                    <DropdownItem
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        handleContactClick(contactData);
                      }}
                    >
                      Active
                    </DropdownItem>

                    <DropdownItem
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        handleContactClick(contactData);
                      }}
                    >
                      Manage
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
  const [Scale, setScale] = useState([]);
  const [assignScale, setAssignScale] = useState([]);

  function handlestag(Scale) {
    setScale(Scale);
    const assigned = tags.map((item) => item.value);
    setAssignScale(assigned);
  }
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

  const categories = [
    { id: 1, name: "Avoid" },
    { id: 2, name: "Shift" },
    { id: 3, name: "Improve" },
  ];

  const weight = [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Max" },
  ];
  const Status = [
    { id: 1, name: "Not started" },
    { id: 2, name: "In progress" },
    { id: 3, name: "Completed" },
  ];
  const Potential = [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" },
  ];
  const Cost = [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" },
  ];
  const scale = [
    { id: 1, name: "Short term" },
    { id: 2, name: "Intermediate" },
    { id: 3, name: "Medium term" },
  ];

  // SideBar Contact Deatail
  const [info, setInfo] = useState([]);

  // Export Modal
  const [modals_grid, setmodals_grid] = useState(false);
  function tog_grids() {
    setmodals_grid(!modals_grid);
  }
  const [modal_grid, setmodal_grid] = useState(false);
  function tog_grid() {
    setmodal_grid(!modal_grid);
  }
  const [data, setData] = useState([]);
  const handleModal = (e) => {
    if (e.target.name == "manage_categories") {
      setData(categories);
    } else if (e.target.name == "manage_weight") {
      setData(weight);
    } else if (e.target.name == "manage_Status") {
      setData(Status);
    } else if (e.target.name == "manage_Potential") {
      setData(Potential);
    } else if (e.target.name == "manage_Costs") {
      setData(Cost);
    } else if (e.target.name == "manage_Scale") {
      setData(scale);
    }
    setmodals_grid(true);
  };
  document.title = "Benchmaking QA | GreenMe";
  return (
    <React.Fragment>
      <Layouts>
        <div className="page-content overflow-auto ">
          <div className="Main  mx-n4 mt-n4 w-100 pb-4">
            <h1>Recommended Actions - Admin Dashboard</h1>
            <p style={{ color: "#BEC887" }}>
              Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus
              vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus
              mattis urna adipiscing dolor nam sem sit vel netus. Egestas
              vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt
              sit turpis est dolor convallis viverra enim aliquet euismod.
            </p>
          </div>
          <Col xxl={9} className="m-auto">
            <div className="d-flex align-items-center justify-content-center gap-2 w-100">
              <div className="pt-5">
                <Button
                  className="d-flex align-items-center justify-content-between p-2 bg-white shadow-lg mb-5 rounded"
                  color="white"
                  onClick={() => setmodal_grid(true)}
                  style={{ width: "130px" }}
                >
                  Add Action
                  <i class="ri-add-fill"></i>
                </Button>
                {modal_grid && (
                  <ActionModal
                    modal_grid={modal_grid}
                    setmodal_grid={setmodal_grid}
                  />
                )}
              </div>
              <div className="pt-5">
                <Button
                  className="d-flex align-items-center justify-content-between p-2 bg-white shadow-lg mb-5 rounded float-end"
                  color="white"
                  name="manage_categories"
                  style={{ width: "160px" }}
                  onClick={handleModal}
                >
                  Manage Categories
                  <i class="ri-add-fill"></i>
                </Button>
                {data && (
                  <CategoryModal
                    modals_grid={modals_grid}
                    setmodals_grid={setmodals_grid}
                    categories={data}
                    setCategories={setData}
                    Title={"Manage category"}
                    FieldName={"Add new Category"}
                    Edit={"Edit category name"}
                  />
                )}
              </div>
              <div className="pt-5">
                <Button
                  className="d-flex align-items-center justify-content-between p-2 bg-white shadow-lg mb-5 rounded float-end"
                  color="white"
                  style={{ width: "140px" }}
                  name="manage_weight"
                  onClick={handleModal}
                >
                  Manage Weight
                  <i class="ri-add-fill"></i>
                </Button>
                <CategoryModal
                  Title={"Manage weight"}
                  FieldName={"Add new Weight"}
                  Edit={"Edit weight name"}
                />
              </div>
              <div className="pt-5">
                <Button
                  className="d-flex align-items-center justify-content-between p-2 bg-white shadow-lg mb-5 rounded float-end"
                  color="white"
                  style={{ width: "130px" }}
                  name="manage_Status"
                  onClick={handleModal}
                >
                  Manage Status
                  <i class="ri-add-fill"></i>
                </Button>
                <CategoryModal
                  Title={"Manage status"}
                  FieldName={"Add new Status"}
                  Edit={"Edit status name"}
                />
              </div>
              <div className="pt-5">
                <Button
                  className="d-flex align-items-center justify-content-between p-2 bg-white shadow-lg mb-5 rounded float-end"
                  color="white"
                  style={{ width: "160px" }}
                  name="manage_Potential"
                  onClick={handleModal}
                >
                  Manage Potential
                  <i class="ri-add-fill"></i>
                </Button>
                <CategoryModal
                  Title={"Manage potential"}
                  FieldName={"Add new Potential"}
                  Edit={"Edit potential name"}
                />
              </div>
              <div className="pt-5">
                <Button
                  className="d-flex align-items-center justify-content-between p-2 bg-white shadow-lg mb-5 rounded float-end"
                  color="white"
                  style={{ width: "160px" }}
                  name="manage_Costs"
                  onClick={handleModal}
                >
                  Manage Costs
                  <i class="ri-add-fill"></i>
                </Button>
                <CategoryModal
                  Title={"Manage cost"}
                  FieldName={"Add new Cost"}
                  Edit={"Edit sost name"}
                />
              </div>
              <div className="pt-5">
                <Button
                  className="d-flex align-items-center justify-content-between p-2 bg-white shadow-lg mb-5 rounded float-end"
                  color="white"
                  style={{ width: "160px" }}
                  name="manage_Scale"
                  onClick={handleModal}
                >
                  Manage Scale
                  <i class="ri-add-fill"></i>
                </Button>
                <CategoryModal
                  Title={"Manage time scale"}
                  FieldName={"Add new Scale"}
                  Edit={"Edit a time scale name"}
                />
              </div>
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
                      SearchPlaceholder="Search by  title "
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
                        <Col lg={6}>
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

                            {validation.touched.tags &&
                            validation.errors.tags ? (
                              <FormFeedback type="invalid">
                                {validation.errors.tags}
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
                              Response
                            </Label>
                            <Select
                              isMulti
                              value={response}
                              onChange={(e) => {
                                handlestag(e);
                              }}
                              className="mb-0"
                              options={response}
                              id="taginput-choices"
                            ></Select>

                            {validation.touched.response &&
                            validation.errors.response ? (
                              <FormFeedback type="invalid">
                                {validation.errors.response}
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
                              Scale
                            </Label>
                            <Select
                              isMulti
                              value={Scale}
                              onChange={(e) => {
                                handlestag(e);
                              }}
                              className="mb-0"
                              options={Scale}
                              id="taginput-choices"
                            ></Select>

                            {validation.touched.Scale &&
                            validation.errors.Scale ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Scale}
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
      </Layouts>
    </React.Fragment>
  );
};

export default ActionAdminDashboard;
