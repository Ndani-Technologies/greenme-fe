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
  getAllAdminActionsByUser,
} from "../../slices/thunks";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import { useNavigate } from "react-router-dom";
const arr = [
  {
    visibilty: true,
    steps: [],
    _id: "6479c485b49314b09519f3e3",
    title: "Action steps title",
    description: "this is the description of actionstep",
    isCompleted: false,
    points: 25,
    score: 10,
    feedback: "This is feedback field",
    assignedTo: [],
    organization: "org-02",
    country: "Pakistan",
    categoryId: {
      _id: "6479b8fa92f3fa9c5b1d6f93",
      language: "English",
      title: "Shift",
      __v: 0,
    },
    costId: {
      _id: "647995d492f3fa9c5b1d6f1c",
      language: "English",
      title: "Cheap",
      __v: 0,
    },
    potentialId: {
      _id: "6479961692f3fa9c5b1d6f2c",
      language: "English",
      title: "Risk",
      __v: 0,
    },
    timescaleId: {
      _id: "6479baee92f3fa9c5b1d6fb7",
      language: "English",
      title: "Short term",
      __v: 0,
    },
    answerRelationshipId: {
      _id: "6479986092f3fa9c5b1d6f4b",
      language: "English",
      title: "Low",
      __v: 0,
    },
    startdate: "2023-06-02T10:29:25.914Z",
    createdAt: "2023-06-02T10:29:25.940Z",
    updatedAt: "2023-06-02T10:29:25.940Z",
    __v: 0,
  },
  {
    visibilty: true,
    steps: [],
    _id: "6479c4a1b49314b09519f3e5",
    title: "Action steps title 2nd",
    description: "this is the description of actionstep",
    isCompleted: false,
    points: 25,
    score: 10,
    feedback: "This is feedback field",
    assignedTo: [],
    organization: "org-02",
    country: "Pakistan",
    categoryId: {
      _id: "6479b8fa92f3fa9c5b1d6f93",
      language: "English",
      title: "Shift",
      __v: 0,
    },
    costId: {
      _id: "647995d492f3fa9c5b1d6f1c",
      language: "English",
      title: "Cheap",
      __v: 0,
    },
    potentialId: {
      _id: "6479961692f3fa9c5b1d6f2c",
      language: "English",
      title: "Risk",
      __v: 0,
    },
    timescaleId: {
      _id: "6479baee92f3fa9c5b1d6fb7",
      language: "English",
      title: "Short term",
      __v: 0,
    },
    answerRelationshipId: {
      _id: "6479986092f3fa9c5b1d6f4b",
      language: "English",
      title: "Low",
      __v: 0,
    },
    startdate: "2023-06-02T10:29:53.941Z",
    createdAt: "2023-06-02T10:29:53.943Z",
    updatedAt: "2023-06-02T10:29:53.943Z",
    __v: 0,
  },
  {
    visibilty: true,
    steps: [],
    _id: "6479c50bb49314b09519f3ee",
    title: "Action steps title 3nd",
    description: "this is the description of actionstep",
    isCompleted: false,
    points: 25,
    score: 10,
    feedback: "This is feedback field",
    assignedTo: [],
    organization: "org-02",
    country: "Pakistan",
    categoryId: {
      _id: "6479b90092f3fa9c5b1d6f95",
      language: "English",
      title: "Improve",
      __v: 0,
    },
    costId: {
      _id: "647995d492f3fa9c5b1d6f1c",
      language: "English",
      title: "Cheap",
      __v: 0,
    },
    potentialId: {
      _id: "6479961692f3fa9c5b1d6f2c",
      language: "English",
      title: "Risk",
      __v: 0,
    },
    timescaleId: {
      _id: "6479baee92f3fa9c5b1d6fb7",
      language: "English",
      title: "Short term",
      __v: 0,
    },
    answerRelationshipId: {
      _id: "6479986092f3fa9c5b1d6f4b",
      language: "English",
      title: "Low",
      __v: 0,
    },
    startdate: "2023-06-02T10:31:39.184Z",
    createdAt: "2023-06-02T10:31:39.188Z",
    updatedAt: "2023-06-02T10:31:39.188Z",
    __v: 0,
  },
  {
    _id: "647d062c5e7d88e006a33f43",
    title: "RA-1",
    description: "description of RA-1",
    status: true,
    visibilty: true,
    steps: [],
    isCompleted: false,
    assignedTo: [],
    categoryId: {
      _id: "6479b8f492f3fa9c5b1d6f91",
      language: "English",
      title: "Avoid",
      __v: 0,
    },
    costId: {
      _id: "647995d092f3fa9c5b1d6f1a",
      language: "English",
      title: "Expensive",
      __v: 0,
    },
    potentialId: {
      _id: "6479961692f3fa9c5b1d6f2c",
      language: "English",
      title: "Risk",
      __v: 0,
    },
    timescaleId: {
      _id: "6479baee92f3fa9c5b1d6fb7",
      language: "English",
      title: "Short term",
      __v: 0,
    },
    answerRelationshipId: {
      _id: "6479986092f3fa9c5b1d6f4b",
      language: "English",
      title: "Low",
      __v: 0,
    },
    startdate: "2023-06-04T21:46:20.763Z",
    createdAt: "2023-06-04T21:46:20.774Z",
    updatedAt: "2023-06-04T21:46:20.774Z",
    __v: 0,
  },
  {
    _id: "647d0a24ed4fb779d6e6657e",
    title: "RA-2",
    description: "RA-2",
    status: true,
    visibilty: true,
    steps: [],
    isCompleted: false,
    assignedTo: [],
    categoryId: {
      _id: "6479b8f492f3fa9c5b1d6f91",
      language: "English",
      title: "Avoid",
      __v: 0,
    },
    costId: {
      _id: "647995d492f3fa9c5b1d6f1c",
      language: "English",
      title: "Cheap",
      __v: 0,
    },
    potentialId: {
      _id: "6479961b92f3fa9c5b1d6f2e",
      language: "English",
      title: "Risk2",
      __v: 0,
    },
    timescaleId: {
      _id: "6479baee92f3fa9c5b1d6fb7",
      language: "English",
      title: "Short term",
      __v: 0,
    },
    answerRelationshipId: {
      _id: "6479986692f3fa9c5b1d6f4d",
      language: "English",
      title: "Medium",
      __v: 0,
    },
    startdate: "2023-06-04T22:03:16.948Z",
    createdAt: "2023-06-04T22:03:16.967Z",
    updatedAt: "2023-06-04T22:03:16.967Z",
    __v: 0,
  },
  {
    _id: "647d9d838d243725a446a76f",
    title: "Optimize your fleet’s routing",
    description:
      "All journeys should include a route plan. \nA good route plan identifies hazards along a route and guides\ndrivers on how to negotiate each hazard. They also include \ninformation about safe stopping/rest areas, and details of \nemergency service support along the route, including \nemergency contact numbers (e.g. police, medical, WHO \ncontacts, etc.). To assist in route planning, the Organization \nneeds to identify preferred routes and alternative routes in \nthe event of an emergency. It is equally important to identify\nthose routes and areas that should be avoided. It is essential \nto brief drivers before each journey, whether new to the \nroute or not, so that any changes or new hazards are \nrecognized before they commence their journey. It is \nparticularly important for route planning to be carried out in \nhigher-risk countries and areas. (who handbook 2019)",
    status: true,
    visibilty: true,
    steps: [],
    isCompleted: false,
    assignedTo: [],
    categoryId: {
      _id: "6479b8f492f3fa9c5b1d6f91",
      language: "English",
      title: "Avoid",
      __v: 0,
    },
    costId: {
      _id: "647995d492f3fa9c5b1d6f1c",
      language: "English",
      title: "Cheap",
      __v: 0,
    },
    potentialId: {
      _id: "6479b95192f3fa9c5b1d6f9e",
      language: "English",
      title: "Low",
      __v: 0,
    },
    timescaleId: {
      _id: "6479bb1c92f3fa9c5b1d6fb9",
      language: "English",
      title: "Medium term",
      __v: 0,
    },
    answerRelationshipId: {
      _id: "6479986692f3fa9c5b1d6f4d",
      language: "English",
      title: "Medium",
      __v: 0,
    },
    startdate: "2023-06-05T08:32:03.722Z",
    createdAt: "2023-06-05T08:32:03.723Z",
    updatedAt: "2023-06-05T08:32:03.723Z",
    __v: 0,
  },
  {
    _id: "647dae0f8d243725a446a882",
    title: "Yes",
    description: "yes",
    status: true,
    visibilty: true,
    steps: [
      {
        _id: "647d9b668d243725a446a756",
        title:
          "Identify the factors/constraints that impact your  daily operations",
        description:
          "Identify the factors/constraints that impact your  daily operations",
        score: 10,
        createdAt: "2023-06-05T08:23:02.223Z",
        updatedAt: "2023-06-05T08:23:02.223Z",
        __v: 0,
      },
      {
        _id: "647d9b888d243725a446a758",
        title: "Review current and past transport demand",
        description: "Review current and past transport demand",
        score: 10,
        createdAt: "2023-06-05T08:23:36.614Z",
        updatedAt: "2023-06-05T08:23:36.614Z",
        __v: 0,
      },
      {
        _id: "647d9bba8d243725a446a75a",
        title: "Visualize and set routes",
        description: "Visualize and set routes",
        score: 10,
        createdAt: "2023-06-05T08:24:26.394Z",
        updatedAt: "2023-06-05T08:24:26.394Z",
        __v: 0,
      },
      {
        _id: "647d9bd88d243725a446a75c",
        title: "Assign tasks/routes across your entire fleet",
        description: "Assign tasks/routes across your entire fleet",
        score: 30,
        createdAt: "2023-06-05T08:24:56.923Z",
        updatedAt: "2023-06-05T08:24:56.923Z",
        __v: 0,
      },
      {
        _id: "647d9bec8d243725a446a75e",
        title: "Involve drivers/ passengers",
        description: "Involve drivers/ passengers",
        score: 30,
        createdAt: "2023-06-05T08:25:16.336Z",
        updatedAt: "2023-06-05T08:25:16.336Z",
        __v: 0,
      },
      {
        _id: "647d9bfb8d243725a446a760",
        title: "Review",
        description: "Review ",
        score: 100,
        createdAt: "2023-06-05T08:25:31.810Z",
        updatedAt: "2023-06-05T11:43:00.485Z",
        __v: 0,
      },
    ],
    isCompleted: false,
    assignedTo: [],
    categoryId: {
      _id: "6479b8fa92f3fa9c5b1d6f93",
      language: "English",
      title: "Shift",
      __v: 0,
    },
    costId: {
      _id: "647995d492f3fa9c5b1d6f1c",
      language: "English",
      title: "Cheap",
      __v: 0,
    },
    potentialId: {
      _id: "6479961b92f3fa9c5b1d6f2e",
      language: "English",
      title: "Risk2",
      __v: 0,
    },
    timescaleId: {
      _id: "6479bb1c92f3fa9c5b1d6fb9",
      language: "English",
      title: "Medium term",
      __v: 0,
    },
    answerRelationshipId: {
      _id: "6479986692f3fa9c5b1d6f4d",
      language: "English",
      title: "Medium",
      __v: 0,
    },
    startdate: "2023-06-05T09:42:39.850Z",
    createdAt: "2023-06-05T09:42:39.851Z",
    updatedAt: "2023-06-05T11:43:44.357Z",
    __v: 0,
  },
];
const ActionUserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [actionData, setActionData] = useState([]);
  const getRAbyUser = () => {
    let data = arr.map((value) => {
      return {
        title: value?.title,
        category: value?.categoryId?.title,
        stat: value?.status ? "true" : "false",
        potential: value?.potentialId?.title,
        cost: value?.costId?.title,
        timescale: value?.timescaleId?.title,
        ...value,
      };
    });
    setActionData(data);
    // getAllAdminActionsByUser().then((resp) => {
    //   setActionData(resp);
    // }).catch(() => toast.error("error in fetching table data"))
  };
  const { crmcontacts, isContactSuccess, error } = useSelector((state) => ({
    crmcontacts: state.Crm.crmcontacts,
    isContactCreated: state.Crm.isContactCreated,
    isContactSuccess: state.Crm.isContactSuccess,
    error: state.Crm.error,
  }));
  useEffect(() => {
    getRAbyUser();
  }, []);
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
              value={cellProps.row.original}
              onChange={() => deleteCheckbox()}
            />
          );
        },
        id: "#",
      },
      {
        Header: "Title",
        accessor: "title",
        filterable: false,
        Cell: (contact) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0"></div>
              <div className="flex-grow-1 ms-2 name">
                {contact.row.original.title}
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
        Header: "Status",
        accessor: "stat",
      },
      {
        Header: "Potential",
        accessor: "potential",
        filterable: false,
      },
      {
        Header: "Cost",
        accessor: "cost",
        filterable: false,
      },
      {
        Header: "Timescale",
        accessor: "timescale",
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
                        navigate("/actionuserdetail", {
                          state: { data: contactData },
                        });
                      }}
                    >
                      View
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item"
                      onClick={() => {
                        const contactData = cellProps.row.original;
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

  document.title = "Recomended Action Dashboard | GreenMe";
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <ActionMain
          Title={"Recommended Actions"}
          Text={
            "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
          }
        />
        <Col xxl={12} className="mt-5">
          <Card id="contactList">
            <CardBody className="pt-0">
              <div>
                {actionData && actionData.length >= 0 ? (
                  <TableContainer
                    columns={columns}
                    data={actionData || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    isFilterA={false}
                    isFooter={true}
                    setInfo={() => {}}
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
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default ActionUserDashboard;
