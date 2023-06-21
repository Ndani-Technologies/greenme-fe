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
      .then((resp) => {
        setRecommendedRelation(resp);
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("recommend action error");
      });
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
  const [info, setInfo] = useState(null);

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
            info={info}
            setInfo={setInfo}
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
