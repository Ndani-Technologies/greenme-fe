import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as moment from "moment";
import {
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap";
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
  getAllAdminActions,
  getAdminTimeScale,
  getAdminCosts,
  getAdminPotentials,
  getAdminStatus,
  getAdminRelationships,
  getAdminCategories,
  getAllAdminResources,
  getAllAdminSteps,
  deleteAdminAction,
} from "../../slices/thunks";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import ActionModal from "./components/ActionModal";
import CategoryModal from "./components/CategoryModal";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import Layouts from "../../Layouts";
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
  const [adminActions, setAdminActions] = useState([]);
  const [adminResources, setAdminResources] = useState([]);
  const [adminTimeScale, setAdminTimeScale] = useState([]);
  const [adminCosts, setAdminCosts] = useState([]);
  const [adminPotential, setAdminPotential] = useState([]);
  const [adminStatus, setAdminStatus] = useState([]);
  const [adminRelation, setAdminRelation] = useState([]);
  const [adminCategories, setAdminCategories] = useState([]);
  const [adminSteps, setAdminSteps] = useState([]);

  const dispatch = useDispatch();
  const { crmcontacts, isContactSuccess, error } = useSelector((state) => ({
    crmcontacts: state.Crm.crmcontacts,
    isContactCreated: state.Crm.isContactCreated,
    isContactSuccess: state.Crm.isContactSuccess,
    error: state.Crm.error,
  }));

  const getAdminActions = () => {
    getAllAdminActions().then((res) => {
      setAdminActions(res);
    });
    getAllAdminSteps().then((res) => {
      setAdminSteps(res);
    });
  };

  const getAdminResources = () => {
    getAllAdminResources().then((res) => {
      setAdminResources(res);
    });
  };

  const getAllAdminTimeScale = () => {
    getAdminTimeScale()
      .then((res) => {
        setAdminTimeScale(res);
      })
      .catch((err) => console.log(err));
  };

  const getAllAdminCosts = () => {
    getAdminCosts()
      .then((res) => {
        setAdminCosts(res);
      })
      .catch((err) => console.log(err));
  };

  const getAllAdminPotentials = () => {
    getAdminPotentials()
      .then((res) => {
        setAdminPotential(res);
      })
      .catch((err) => console.log(err));
  };

  const getAllAdminStatus = () => {
    getAdminStatus()
      .then((res) => {
        setAdminStatus(res);
      })
      .catch((err) => console.log(err));
  };

  const getAllAdminRelationships = () => {
    getAdminRelationships()
      .then((res) => {
        setAdminRelation(res);
      })
      .catch((err) => console.log(err));
  };

  const getAllAdminCategories = () => {
    getAdminCategories()
      .then((res) => {
        setAdminCategories(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAdminActions();
    getAdminResources();
    getAllAdminTimeScale();
    getAllAdminCosts();
    getAllAdminPotentials();
    getAllAdminStatus();
    getAllAdminRelationships();
    getAllAdminCategories();
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

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirmation2(true);
  };

  // SideBar Contact Deatail
  const [info, setInfo] = useState([]);
  const [modal_grid, setmodal_grid] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(true);
  console.log(info, "INFO");

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
                        setInfo(contactData);
                        setIsDataUpdated(true);
                        setmodal_grid(true);
                      }}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item remove-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        // onClickDelete(contactData);
                        handleDelete(contactData._id);
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

  // Export Modal
  const [modalName, setModalName] = useState("");
  const [modalField, setModalField] = useState("");
  const [modalEdit, setModalEdit] = useState("");
  const [modals_grid, setmodals_grid] = useState(false);
  function tog_grids() {
    setmodals_grid(!modals_grid);
  }

  function tog_grid() {
    setmodal_grid(!modal_grid);
  }
  const [data, setData] = useState([]);
  const handleModal = (e) => {
    if (e.target.name == "manage_Scale") {
      setModalName("Manage Scale");
      setModalField("Add new Scale");
      setModalEdit("Edit Scale Name");
      setData(adminTimeScale);
    } else if (e.target.name == "manage_Costs") {
      setModalName("Manage Costs");
      setModalField("Add new Cost");
      setModalEdit("Edit Cost Value");
      setData(adminCosts);
    } else if (e.target.name == "manage_Potential") {
      setModalName("Manage Potential");
      setModalField("Add new Potential");
      setModalEdit("Edit Potential Name");
      setData(adminPotential);
    } else if (e.target.name == "manage_Status") {
      setModalName("Manage Status");
      setModalField("Add new Status");
      setModalEdit("Edit Status Name");
      setData(adminStatus);
    } else if (e.target.name == "manage_weight") {
      setModalName("Manage Answer Relationship");
      setModalField("Add new Relationship");
      setModalEdit("Edit Relationship Name");
      setData(adminRelation);
    } else if (e.target.name == "manage_categories") {
      setModalName("Manage Categories");
      setModalField("Add new Category");
      setModalEdit("Edit Category Name");
      setData(adminCategories);
    }
    setmodals_grid(true);
  };

  const [deleteConfirmation2, setDeleteConfirmation2] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const confirmDelete2 = () => {
    deleteAdminAction(deleteId)
      .then((resp) => {
        const update = adminActions.filter((c) => c._id !== deleteId);
        setAdminActions(update);
        toast.success("Successfully Deleted");
      })
      .catch((err) => {
        toast.error("Unable to Delete");
        console.log("err in deleteing Resource", err);
      });
    setDeleteConfirmation2(false);
    setDeleteId(null);
  };

  const cancelDelete2 = () => {
    setDeleteConfirmation2(false);
    setDeleteId(null);
  };
  document.title = "Benchmaking QA | GreenMe";
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <ActionMain
          Title={"Recommended Actions - Admin Dashboard"}
          Text={
            "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
          }
        />
        <Col xxl={12}>
          <div
            className="d-flex align-items-center justify-content-between gap-2 "
            style={{ width: "98%" }}
          >
            <div className="pt-5">
              <Button
                className="d-flex align-items-center justify-content-between p-2 bg-white shadow-lg mb-5 rounded"
                color="white"
                onClick={() => {
                  setIsDataUpdated(false);
                  setmodal_grid(true);
                }}
                style={{ width: "130px" }}
              >
                Add Action
                <i class="ri-add-fill"></i>
              </Button>
              {modal_grid && (
                <ActionModal
                  info={info}
                  setInfo={setInfo}
                  adminSteps={adminSteps}
                  setAdminSteps={setAdminSteps}
                  modal_grid={modal_grid}
                  setmodal_grid={setmodal_grid}
                  adminCategories={adminCategories}
                  setAdminCategories={setAdminCategories}
                  adminResources={adminResources}
                  setAdminResources={setAdminResources}
                  adminTimeScale={adminTimeScale}
                  setAdminTimeScale={setAdminTimeScale}
                  adminActions={adminActions}
                  setAdminActions={setAdminActions}
                  adminCosts={adminCosts}
                  setAdminCosts={setAdminCosts}
                  adminPotential={adminPotential}
                  setAdminPotential={setAdminPotential}
                  adminRelation={adminRelation}
                  setAdminRelation={setAdminRelation}
                  adminStatus={adminStatus}
                  setAdminStatus={setAdminStatus}
                  isDataUpdated={isDataUpdated}
                  setIsDataUpdated={setIsDataUpdated}
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
                  data={data}
                  setData={setData}
                  Title={modalName}
                  FieldName={modalField}
                  Edit={modalEdit}
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
                Manage Answer Relationship
                <i class="ri-add-fill"></i>
              </Button>
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
            </div>
          </div>
          <Card id="contactList" style={{ width: "98%" }}>
            <CardBody className="pt-0">
              <div>
                {adminActions.length >= 0 ? (
                  <TableContainer
                    columns={columns}
                    data={adminActions || []}
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
                    setInfo={() => {}}
                    SearchPlaceholder="Search by  title "
                  />
                ) : (
                  <Loader error={error} />
                )}
                <Modal isOpen={deleteConfirmation2} toggle={cancelDelete2}>
                  <ModalHeader toggle={cancelDelete2}>
                    Confirm Deletion
                  </ModalHeader>
                  <ModalBody>
                    Are you sure you want to delete this variation?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={confirmDelete2}>
                      Delete
                    </Button>
                    <Button color="secondary" onClick={cancelDelete2}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>

                <Button onClick={() => deleteMultiple()}>Delete All</Button>
              </div>
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default ActionAdminDashboard;
