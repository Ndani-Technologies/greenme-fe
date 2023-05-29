import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
} from "../../slices/thunks";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import Layouts from "../../Layouts";
import RelationModal from "./RelationModal";
const arr = [
  {
    _id: "625d3cd5923ccd040209ebf1",
    name: "Does your organisation have environmental commitments?",
    phone: "NO",
    email: "18",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Switch to electric vehicles",
    tags: "Automatic",
    response: "Active",
    Scale: "intermediate",
  },
  {
    _id: "625d3cd5923ccd040209ebf3",
    name: "Does your organisation have a ‘green’ strategy?",
    phone: "NO",
    email: "18",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Introducing trip sharing",
    tags: "Automatic",
    response: "Active",
    Scale: "Short term",
  },
  {
    _id: "625d3cd5923ccd040209ebee",
    name: "Does your fleet policy contain references to a green strategy or environmental sustainability?",
    phone: "-",
    email: "05",
    lead_score: "Enroll drivers in trainings",
    tags: "Automatic",
    response: "Active",
    Scale: "intermediate",
  },
  {
    _id: "625d3cd5923ccd040209ebf0",
    name: "Does your fleet policy include guidance to use the vehicle with the lowest environmental impact?",
    phone: "NO",
    email: "10",
    lead_score: "Carry out waste management audit ",
    tags: "Automatic",
    response: "Active",
    Scale: "Medium term",
  },
  {
    _id: "625d3cd5923ccd040209ebf2",
    name: "Do you have standardised fleet procurement (global framework agreement…)?",
    phone: "-",
    email: "12",
    lead_score: "Route optimisation exercise",
    tags: "Automatic",
    response: "Active",
    Scale: "intermediate",
  },
  {
    _id: "625d3cd5923ccd040209ebeb",
    name: "Do you use sustainability criteria to assess/ select suppliers?",
    phone: "NO",
    company: "iTest Factory",
    designation: "UI / UX Designer",
    email: "08",
    lead_score: "Upload the JD or relevant points",
    tags: "Automatic",
    response: "Inactive",
    Scale: "Medium term",
  },
  {
    _id: "625d3cd5923ccd040209ebec",
    name: "How do you dispose of vehicles?",
    phone: "NO",
    company: "Force Medicines",
    designation: "PHP Developer",
    email: "02",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "Complete sustainable FM training",
    tags: "Automatic",
    response: "Inactive",
    Scale: "Short term",
  },
  {
    _id: "625d3cd5923ccd040209ebea",
    name: "Do you take the environmental impact into consideration when planning for disposal ?",
    phone: "NO",
    company: "Nesta Technologies",
    designation: "Lead Designer / Developer",
    email: "07",
    lead_score: "Route optimisation exercise",
    tags: "Automatic",
    response: "Inactive",
    Scale: "intermediate",
  },

  {
    _id: "625d3cd5923ccd040209ebef",
    name: "How do you dispose of vehicles?",
    phone: "-",
    company: "Micro Design",
    designation: "Asp.Net Developer",
    email: "07",
    lead_score: "Route optimisation exercise",
    tags: "Automatic",
    response: "Active",
    Scale: "Long term",
  },
  {
    _id: "625d3cd5923ccd040209ebed",
    name: "How do you dispose of vehicles?",
    phone: "NO",
    company: "Digitech Galaxy",
    designation: "Full Stack Developer",
    email: "07",
    lead_score: "Route optimisation exercise",
    tags: "Automatic",
    response: "Active",
    Scale: "intermediate",
  },
];
const AdminRelation = () => {
  const [modal_grid, setmodal_grid] = useState(false);
  function tog_grid() {
    setmodal_grid(!modal_grid);
  }
  const dispatch = useDispatch();
  const { crmcontacts, isContactSuccess, error } = useSelector((state) => ({
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
  const [info, setInfo] = useState([]);
  //delete Conatct
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
  const columns = useMemo(() => [
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
      Header: "Recommended action title",
      accessor: "lead_score",
      filterable: false,
    },
    {
      Header: "Benchmark question title",
      accessor: "name",
      filterable: false,
    },

    {
      Header: "Selected answer options",
      accessor: "phone",
    },
    {
      Header: "Assignment type",
      accessor: "tags",
    },
    {
      Header: "Number of asignments",
      accessor: "email",
      filterable: false,
    },
    {
      Header: "Status",
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
                    Deactivate
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
          </ul>
        );
      },
    },
  ]);
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

  document.title = "Benchmaking QA | GreenMe";
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <ActionMain
          Title={"Recommended Actions - Benchmark to Action Relationships"}
        />
        <Button className="mt-4 " onClick={() => setmodal_grid(true)}>
          <i class="ri-add-fill mt-2"></i>Add New Relationship
        </Button>
        {modal_grid && (
          <RelationModal
            modal_grid={modal_grid}
            setmodal_grid={setmodal_grid}
          />
        )}
        <Col xxl={12} className="m-auto mt-5">
          <Card id="contactList" style={{ width: "98%" }}>
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
                    isFilterAction={true}
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
                <Button onClick={() => deleteMultiple()}>Delete All</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default AdminRelation;
