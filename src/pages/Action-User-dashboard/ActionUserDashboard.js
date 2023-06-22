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
const arr = [];
const ActionUserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [actionData, setActionData] = useState([]);
  const getRAbyUser = () => {
    // let data = arr.map((value) => {
    //   return {
    //     title: value?.title,
    //     category: value?.categoryId?.title,
    //     stat: value?.status ? "true" : "false",
    //     potential: value?.potentialId?.title,
    //     cost: value?.costId?.title,
    //     timescale: value?.timescaleId?.title,
    //     ...value,
    //   };
    // });
    // setActionData(data);
    getAllAdminActionsByUser()
      .then((resp) => {
        setActionData(resp);
      })
      .catch(() => toast.error("error in fetching table data"));
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
            <div
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <div className="flex-shrink-0"></div>
              <div
                className="flex-grow-1 ms-2 name"
                onClick={() => {
                  const contactData = contact.row.original;
                  navigate("/actionuserdetail", {
                    state: { data: contactData },
                  });
                }}
              >
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
        Header: "Reduction Potential",
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
                      className="dropdown-item remove-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        onClickDelete(contactData);
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
                      Unassign
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
  document.title = "Recommended Actions - Assigned | GreenMe";
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <ActionMain
          Title={"Recommended Actions"}
          Text={
            "Once you have completed the action, you can mark it as ‘complete’. This will give you points which will be reflected in the leaderboard. It is recommended, but not mandatory, to complete the actions in the sequence presented to you."
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
                    isFilterAdminRA={true}
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
