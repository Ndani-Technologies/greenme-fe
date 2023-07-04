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
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import Img from "../../../src/assets/images/card-pic.png";
import { getAllUsers } from "../../slices/thunks";

const arr = [
  {
    _id: "625d3cd5923ccd040209ebf1",
    name: "Nancy Martino",
    Orgnaisation: "FleetMGT Co. H",
    TotalPoints: "120",
    ActionPoints: "01",
    CollabPoints: "24",
    DisscussPoints: "05",
    Image: Img,
    Position: "Lead Designer / Developer",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },
  {
    _id: "625d3cd5923ccd040209ebf3",
    Image: Img,
    name: "Henry Baird",
    Orgnaisation: "FleetMGT Co. B",
    Position: "Lead Designer / Developer",
    TotalPoints: "88",
    ActionPoints: "04",
    CollabPoints: "12",
    DisscussPoints: "08",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },
  {
    _id: "625d3cd5923ccd040209ebee",
    name: "Frank Hook",
    Orgnaisation: "FleetMGT Co. C",
    TotalPoints: "63",
    ActionPoints: "07",
    CollabPoints: "14",
    DisscussPoints: "12",
    Image: Img,
    Position: "Lead Designer / Developer",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },
  {
    _id: "625d3cd5923ccd040209ebf0",
    name: "Jennifer Carter",
    Orgnaisation: "FleetMGT Co. D",
    TotalPoints: "58",
    ActionPoints: "20",
    CollabPoints: "13",
    DisscussPoints: "18",
    Image: Img,
    Position: "Lead Designer / Developer",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },
  {
    _id: "625d3cd5923ccd040209ebf2",
    name: "Megan Elmore",
    Orgnaisation: "FleetMGT Co. H",
    TotalPoints: "51",
    ActionPoints: "44",
    CollabPoints: "19",
    DisscussPoints: "20",
    Image: Img,
    Position: "Lead Designer / Developer",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },
  {
    _id: "625d3cd5923ccd040209ebeb",
    name: "Alexis Clarke",
    Orgnaisation: "FleetMGT Co. H",
    TotalPoints: "48",
    ActionPoints: "23",
    CollabPoints: "30",
    DisscussPoints: "22",
    Image: Img,
    Position: "Lead Designer / Developer",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },
  {
    _id: "625d3cd5923ccd040209ebec",
    name: "Nathan Cole",
    Orgnaisation: "FleetMGT Co. E",
    TotalPoints: "48",
    ActionPoints: "20",
    CollabPoints: "44",
    DisscussPoints: "28",
    Image: Img,
    Position: "Lead Designer / Developer",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },
  {
    _id: "625d3cd5923ccd040209ebea",
    name: "Joseph Parker",
    Orgnaisation: "FleetMGT Co. F",
    TotalPoints: "36",
    ActionPoints: "22",
    CollabPoints: "32",
    DisscussPoints: "20",
    Image: Img,
    Position: "Lead Designer / Developer",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },

  {
    _id: "625d3cd5923ccd040209ebef",
    name: "Erica Kernan",
    Orgnaisation: "FleetMGT Co. A",
    TotalPoints: "39",
    ActionPoints: "24",
    CollabPoints: "44",
    DisscussPoints: "21",
    Image: Img,
    Position: "Lead Designer / Developer",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },
  {
    _id: "625d3cd5923ccd040209ebed",
    name: "Donald Palmer",
    Orgnaisation: "FleetMGT Co. H",
    TotalPoints: "29",
    ActionPoints: "25",
    CollabPoints: "34",
    DisscussPoints: "11",
    Image: Img,
    Position: "Lead Designer / Developer",
    email: "tanyanoble@velzon.com",
    phone: "414-453-5725",
    lead_score: "154",
    tags: "Lead",
  },
];
const LeaderBoardTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        const updatedUsers = res.map((user) => ({
          _id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          Organisation: user.organization,
          TotalPoints:
            user.collaborationPoints +
            user.discussionPoints +
            user.actionPoints,
          ActionPoints: user.actionPoints,
          CollabPoints: user.collaborationPoints,
          DisscussPoints: user.discussionPoints,
          Image: user.profilePic,
          Position: user.role.title,
          email: user.email,
          phone: "", // You can set the phone value accordingly if available
          lead_score: "", // You can set the lead score value accordingly if available
          tags: "", // You can set the tags value accordingly if available
        }));

        setAllUsers(updatedUsers);
      })
      .catch((err) => console.log(err, "UNABLE TO GET USERS"));
  }, []);

  const [info, setInfo] = useState([]);
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
      reeponse: (contact && contact.CollabPoints) || "",
      company: (contact && contact.company) || "",
      designation: (contact && contact.designation) || "",
      ActionPoints: (contact && contact.ActionPoints) || "",
      DisscussPoints: (contact && contact.DisscussPoints) || "",
      Position: (contact && contact.Position) || "",
      Orgnaisation: (contact && contact.Orgnaisation) || "",
      TotalPoints: (contact && contact.TotalPoints) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      CollabPoints: Yup.string().required("Please Enter Name"),
      company: Yup.string().required("Please Enter Company"),
      designation: Yup.string().required("Please Enter Designation"),
      ActionPoints: Yup.string().required("Please Enter ActionPoints"),
      Position: Yup.string().required("Please Enter Position"),
      Orgnaisation: Yup.string().required("Please Enter Orgnaisation"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateContact = {
          _id: contact ? contact._id : 0,
          // img: values.img,
          name: values.name,
          CollabPoints: assignCollabPoints,
          DisscussPoints: assignDisscussPoints,
          company: values.company,
          designation: values.designation,
          ActionPoints: values.ActionPoints,
          DisscussPoints: values.DisscussPoints,
          Position: values.Position,
          Orgnaisation: values.Orgnaisation,
          last_contacted: dateFormat(),
          // time: timeFormat(),
          TotalPoints: assignTag,
        };
        // update Contact
        dispatch(onUpdateContact(updateContact));
        validation.resetForm();
      } else {
        const newContact = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          // img: values["img"],
          name: values["name"],
          CollabPoints: values["CollabPoints"],
          company: values["company"],
          designation: values["designation"],
          ActionPoints: values["ActionPoints"],
          DisscussPoints: values["DisscussPoints"],
          Position: values["Position"],
          Orgnaisation: values["Orgnaisation"],
          last_contacted: dateFormat(),
          // time: timeFormat(),
          TotalPoints: assignTag,
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
        CollabPoints: contact.reeponse,
        company: contact.company,
        ActionPoints: contact.ActionPoints,
        DisscussPoints: contact.DisscussPoints,
        designation: contact.designation,
        Position: contact.Position,
        Orgnaisation: contact.Orgnaisation,
        last_contacted: contact.date,
        // time: contact.time,
        TotalPoints: contact.TotalPoints,
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

  const deleteCheckbox = (row) => {
    const ele = document.querySelectorAll(".contactCheckBox:checked");
    // setSelectedData([...selectedData, row]);
    // console.log("row 1", row, selectedData);
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);

    // if (ele.length > 1) {
    //   setIsCompareBtnDisable(false);
    // } else {
    //   setIsCompareBtnDisable(true);
    // }
  };

  const [selectedData, setSelectedData] = useState([]);
  // Column
  const columns = useMemo(
    () => [
      {
        Cell: (cellProps, item) => {
          return (
            <input
              type="checkbox"
              className="contactCheckBox form-check-input"
              value={cellProps.row.original._id}
              onChange={(e) => {
                if (e.target.checked) {
                  const arr = selectedData;
                  arr.push(cellProps.row.original);
                  setSelectedData(arr);
                } else {
                  setSelectedData((prev) =>
                    prev.filter((ob) => ob._id !== cellProps.row.original._id)
                  );
                }
                console.log("e", e.target.checked);

                deleteCheckbox(cellProps.row.original);
              }}
            />
          );
        },
        id: "#",
      },
      {
        Header: "Name",
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
        Header: "Organisation",
        accessor: "Organisation",
        filterable: false,
      },
      {
        Header: "Position",
        accessor: "Position",
      },
      {
        Header: "Total points",
        accessor: "TotalPoints",
      },
      {
        Header: "Action points",
        accessor: "ActionPoints",
        filterable: false,
      },
      {
        Header: "Collaboration points",
        accessor: "CollabPoints",
        filterable: false,
      },
      {
        Header: "Discussion points",
        accessor: "DisscussPoints",
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
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      <i class="ri-eye-fill"></i>
                      View
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      <i class="ri-restart-line"></i>
                      Reset
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item remove-item-btn d-flex align-items-center gap-2"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        onClickDelete(contactData);
                      }}
                    >
                      <i class="ri-delete-bin-2-line"></i>
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
  document.title = "Recomended Action Dashboard | GreenMe";
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <ActionMain
          Title={"Leader Board"}
          // Text={
          //   "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
          // }
        />
        <Col xxl={12} className="mt-5">
          <Card id="contactList">
            <CardBody className="pt-0">
              <div>
                {allUsers && allUsers.length ? (
                  <TableContainer
                    columns={columns}
                    selectedData={selectedData}
                    data={allUsers || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    isFilterA={false}
                    setInfo={setInfo}
                    isFooter={true}
                    // FilterLeaderBoard={true}
                    customPageSize={8}
                    className="custom-header-css"
                    divClass="table-responsive table-card mb-0"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light"
                    handleContactClick={handleContactClicks}
                    isContactsFilter={false}
                    SearchPlaceholder="Search by  title "
                    isFilterLeaderBoard={true}
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

export default LeaderBoardTable;
