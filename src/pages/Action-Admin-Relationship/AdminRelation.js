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
  getAllQA,
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
import {
  deleteRecommendActionRelation,
  getAllRecommendedAction,
  getAllRecommendedRelation,
} from "../../slices/RecommendedAction/thunk";
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
  const [questionList, setQuestionList] = useState([]);
  const [recommendedAction, setRecommendedAction] = useState([]);
  const [recommendedRelation, setRecommendedRelation] = useState([]);

  const fetchAPIs = () => {
    getAllQA()
      .then((resp) => setQuestionList(resp))
      .catch((err) => toast.error("qa all error"));
    getAllRecommendedAction()
      .then((resp) => setRecommendedAction(resp))
      .catch((err) => toast.error("recommend action error"));
    getAllRecommendedRelation()
      .then((resp) => setRecommendedRelation(resp))
      .catch((err) => toast.error("recommend action error"));
  };
  useEffect(() => {
    fetchAPIs();
  }, []);

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
  const [isEdit, setIsEdit] = useState(false);
  const [contact, setContact] = useState([]);
  const [info, setInfo] = useState([]);

  const onClickDelete = (contact) => {
    deleteRecommendActionRelation(contact._id)
      .then(() => {
        toast.success("Relation successfully deleted");
      })
      .catch(() => {
        toast.success("Relation couldn't get deleted");
      });
  };

  // Add Data
  const handleContactClicks = () => {
    setContact("");
    setIsEdit(false);
    toggle();
  };

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
      // toggle();
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
      accessor: "ra_title",
      filterable: false,
    },
    {
      Header: "Benchmark question title",
      accessor: "question_title",
      filterable: false,
    },

    {
      Header: "Selected answer options",
      accessor: "answr_option",
    },
    {
      Header: "Assignment type",
      accessor: "assignment_type",
    },
    {
      Header: "Number of asignments",
      accessor: "number_of_assignment",
      filterable: false,
    },
    {
      Header: "Status",
      accessor: "status",
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
        {modal_grid && questionList.length > 0 && (
          <RelationModal
            modal_grid={modal_grid}
            questionList={questionList}
            recommendAction={recommendedAction}
            setmodal_grid={setmodal_grid}
            setRecommendedRelation={setRecommendedRelation}
            recommendedRelation={recommendedRelation}
          />
        )}
        <Col xxl={12} className="m-auto mt-5">
          <Card id="contactList" style={{ width: "98%" }}>
            <CardBody className="pt-0">
              <div>
                {recommendedRelation.length >= 0 ? (
                  <TableContainer
                    columns={columns}
                    data={recommendedRelation || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    isFilterA={false}
                    isFilterAction={true}
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
                  <Loader error={new Error()} />
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
