import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as moment from "moment";
import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
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
  Toast,
} from "reactstrap";
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
  getAllBenchmarks,
  startBenchmark,
  addBenchmark,
  deleteBenchmark,
  updateUserResp,
  removeBenchmarkUserResp,
} from "../../slices/thunks";
import { Box, Chip, OutlinedInput } from "@mui/material";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { TooltipModalExample } from "../BaseUi/UiModals/UiModalCode";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import dummyImg from "../../assets/images/users/user-dummy-img.jpg";
import { Height } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const BenchmarkingDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [benchmarks, setBenchmarks] = useState([]);
  const { crmcontacts, isContactCreated, isContactSuccess, error } =
    useSelector((state) => ({
      crmcontacts: state.Crm.crmcontacts,
      isContactCreated: state.Crm.isContactCreated,
      isContactSuccess: state.Crm.isContactSuccess,
      error: state.Crm.error,
      // benchmarks: state.Benchmark.benchmarks
    }));
  const getBenchmarks = () => {
    getAllBenchmarks()
      .then((resp) => {
        console.log("response get all benchamrks", resp);
        setBenchmarks(resp ?? []);
      })
      .catch((err) => {
        console.log("error get all benchamrks", err);
      });
  };

  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    getBenchmarks();
    const userObj = JSON.parse(sessionStorage.getItem("authUser"));
    const options = userObj.otherCountries.map((country) => {
      return {
        value: country,
        label: country,
      };
    });
    setCountryOptions(options);
  }, []);

  useEffect(() => {
    benchmarks.length > 0 && setContact(benchmarks);
  }, [benchmarks]);

  useEffect(() => {
    if (!isEmpty(benchmarks)) {
      setContact(benchmarks);
      setIsEdit(false);
    }
  }, [benchmarks]);

  const [isEdit, setIsEdit] = useState(false);
  const [contact, setContact] = useState([]);

  //delete Conatct
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setDeleteId(null);
  };
  const confirmDelete = () => {
    deleteBenchmark(deleteId)
      .then(() => {
        setBenchmarks((prev) => prev.filter((value) => value._id !== deleteId));
        toast.success("Benchmark is deleted");
        setDeleteConfirmation(false);
      })
      .catch(() => {
        toast.error("Error in Benchmark deletion.");
        setDeleteConfirmation(false);
      });
  };
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
  const handleContactClick = (data) => {
    console.log(data, "DATA");
  };
  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("YYYY MM DD");
    return date == "" ? date : date1;
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
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleTitleClick = (e, cellProps) => {
    e.preventDefault();
    const contactData = cellProps.row.original;
    setInfo(contactData);
    navigate(`/benchmarking/${cellProps.row.original._id}`, {
      state: { isDataUpdated: true, menuItem: "/benchmarking" },
    });
  };
  const handleResetClick = (data) => {
    setInfo(data);
    console.log(data, "IN CLICK");
  };
  const handleResetConfirm = (info) => {
    console.log(info, "IN CONFIRM");
    const resetData = {
      user_resp: [],
    };
    removeBenchmarkUserResp(info._id, resetData)
      .then((res) => {
        console.log(res);
        toast.success("Reset Successfully");
      })
      .catch((err) => console.log(err));
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
        Header: "Title of Benchmark",
        accessor: "title",
        filterable: false,
        Cell: (cellProps) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0"></div>
              <div
                className="flex-grow-1 ms-2 name"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleTitleClick(e, cellProps)}
              >
                {cellProps.row.original.title}
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Country",
        accessor: "country",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Completion Level",
        accessor: "completion_level",
        filterable: false,
        Cell: (cellProps) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0"></div>
              <div
                className="flex-grow-1 ms-2 name"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleTitleClick(e, cellProps)}
              >
                {Math.ceil(cellProps.row.original.completionLevel)}%
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Start Date",
        accessor: "start_date",
        filterable: true,

        Cell: (contact) => (
          <>
            {handleValidDate(contact.row.original.start_date)}
            <small className="text-muted"></small>
          </>
        ),
      },
      {
        Header: "Completion Date",
        accessor: "end_data",
        Cell: (contact) => (
          <>
            {handleValidDate(
              contact.row.original.end_date ? contact.row.original.end_date : ""
            )}
            <small className="text-muted"></small>
          </>
        ),
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
                      href={`/benchmarking/summary/${_id}`}
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                        console.log("contact data", contactData);
                      }}
                    >
                      View
                    </DropdownItem>
                    {/* <Link to={`/benchmarking/${_id}`}> */}
                    <DropdownItem
                      className="dropdown-item"
                      href={`/benchmarking/${_id}`}
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      Edit
                    </DropdownItem>
                    {/* </Link> */}
                    <DropdownItem
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        handleContactClick(contactData);
                        handleResetClick(contactData);
                      }}
                    >
                      Reset
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        handleCompleteClick(contactData);
                      }}
                    >
                      Complete
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item remove-item-btn"
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setDeleteId(cellProps.row.original._id);
                        // onClickDelete(contactData);
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

  const [modal_grid, setmodal_grid] = useState(false);
  function tog_grid() {
    setmodal_grid(!modal_grid);
  }

  const [valError, setValError] = useState("");
  const validation2 = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      country: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      // country: Yup.mixed().required("Country is required"),
    }),
    onSubmit: async (values) => {
      console.log(values, valError, "VALS");

      // if (values.country === null) {
      //   setValError("Please select a country");
      // }
      if (countryOptions.length < 1) {
        toast.info(
          <div style={{ display: "block" }}>
            <p>
              `Please visit your profile page by clicking on the button below
              and fill in your duty station country and countries of operation
              before you start a benchmark.`
            </p>
            <Button
              color="danger"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile page
            </Button>
          </div>,
          {
            position: "top-center",
            autoClose: false,
          }
        );
      } else if (values.country === null) {
        setValError("Please select a country");
      } else {
        await addBenchmark(values)
          .then((resp) => {
            if (resp) {
              toast.success("Successfully added");
              setBenchmarks([...benchmarks, resp]);
              validation2.resetForm();
              setmodal_grid(false);
              navigate(`/benchmarking/${resp._id}`);
            } else {
              toast.error("Name already exists");
            }
          })
          .catch((err) => {
            toast.error(err);
            console.log(err, "this is error");
          });
      }
    },
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChangeCountry = (selectedOption) => {
    if (!selectedOption || !selectedOption.value) {
      setValError("Please select a country");
      validation2.setFieldValue("country", "");
    } else {
      setValError("");
      validation2.setFieldValue("country", selectedOption);
    }
  };

  //HANDLE SUBMISSION  MODAL

  const [modal_center, setmodal_center] = useState(false);

  const tog_center = () => {
    setmodal_center(!modal_center);
  };

  const handleCompleteClick = (data) => {
    setInfo(data);
    tog_center();
  };

  const obj = JSON.parse(sessionStorage.getItem("authUser"));
  const userId = obj._id;

  const handleSubmit = () => {
    const requestBody = {
      userId: userId,
      user_resp: info.user_resp,
    };
    const toastt_id = toast.loading("Please wait...");
    updateUserResp(info?._id, requestBody).then((resp) => {
      toast.update(toastt_id, {
        render: "benchmark is successfully submitted",
        type: "success",
        isLoading: false,
      });
      // toast.success("benchmark is successfully submitted");
    });
  };
  document.title = "Benchmarking Dashboard| GreenMe";
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <div className="Main-sec mx-n4 mt-n4 w-100">
          <h1>Benchmarking</h1>
          <p style={{ color: "#BEC887" }}>
            In this section you will find a self-assessment questionnaire and,
            once completed, you can view your results against your peers. You
            have the option to complete the assessment at once or save your
            progress and return later. We do encourage you to complete the
            assessment but if you don’t have the answer to questions, you can
            skip them. Once you are done with the assessment, press submit and
            you will receive a benchmark report.
          </p>
        </div>
        <Col xxl={12}>
          <div
            className="d-flex justify-content-between"
            style={{ paddingRight: "100px" }}
          >
            <Col className="pt-5">
              <Button
                className="d-flex align-items-center justify-content-between w-25 p-3 bg-white shadow-lg p-3 mb-5 rounded"
                color="white"
                onClick={() => setmodal_grid(true)}
              >
                Start new Benchmark
                <i class="ri-add-fill"></i>
              </Button>
              <Modal
                className="postion-relative"
                isOpen={modal_grid}
                toggle={() => {
                  tog_grid();
                }}
              >
                <div
                  className="postion-absolute top-0 start-0 translate-middle bg-white rounded-circle d-flex justify-content-center align-items-center shadow-lg bg-body rounded"
                  style={{ width: "35px", height: "35px" }}
                >
                  <Button
                    type="button"
                    onClick={() => {
                      setmodal_grid(false);
                    }}
                    className="btn-close color-black bg-white border border-dark rounded-circle "
                    aria-label="close"
                  ></Button>
                </div>
                <ModalHeader className="border-bottom border-dark p-4 pt-0">
                  <h4 className="modal-title">Benchmarking</h4>
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation2.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="row g-3">
                      <Col xxl={12}>
                        <div>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Enter Benchmark title"
                            name="title"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation2.handleChange}
                            onBlur={validation2.handleBlur}
                            value={validation2.values.title || ""}
                            invalid={
                              validation2.touched.title &&
                              validation2.errors.title
                                ? true
                                : false
                            }
                          />
                          {validation2.touched.title &&
                          validation2.errors.title ? (
                            <FormFeedback type="invalid">
                              {validation2.errors.title}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <div className="mb-3">
                        <Label htmlFor="countryInput" className="form-label">
                          Choose a Country
                        </Label>
                        <Select
                          isClearable={true}
                          name="country"
                          value={validation2.values.country}
                          onChange={handleChangeCountry}
                          onBlur={() =>
                            handleChangeCountry(validation2.values.country)
                          }
                          options={countryOptions}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        />
                        <div style={{ color: "red", marginTop: ".5rem" }}>
                          {valError}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="hstack gap-2 justify-content-start">
                          <Button type="submit" color="primary">
                            Start Benchmark
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </ModalBody>
              </Modal>
            </Col>
            <div className="pt-2 d-flex gap-3">
              <i class="ri-share-line"></i>
              <i class="ri-flag-line"></i>
            </div>
          </div>
          <Card id="contactList">
            <CardBody className="pt-0">
              <div>
                {!!benchmarks.length >= 0 ? (
                  <TableContainer
                    columns={columns}
                    data={benchmarks || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    isFilterA={true}
                    isFooter={true}
                    customPageSize={8}
                    className="custom-header-css"
                    divClass="table-responsive table-card mb-0"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light"
                    handleContactClick={handleContactClicks}
                    isSearchInput={true}
                    SearchPlaceholder="Search for title..."
                    setInfo={setInfo}
                  />
                ) : (
                  <Loader error={error} />
                )}
                <Button onClick={() => deleteMultiple()} disabled>
                  Delete All
                </Button>
              </div>
              <Modal
                isOpen={modal_center}
                toggle={() => {
                  tog_center();
                }}
                centered
              >
                <ModalHeader
                  className="d-flex justify-content-start"
                  style={{ border: "none" }}
                >
                  Are you sure you want to submit your benchmark
                </ModalHeader>
                <ModalBody
                  className="d-flex justify-content-center"
                  style={{ fontSize: "20px" }}
                >
                  <p>
                    You have answered{" "}
                    <span style={{ fontSize: "24px" }}>
                      {info.user_resp?.length}
                    </span>{" "}
                    questions out of{" "}
                    <span style={{ fontSize: "24px" }}>
                      {info?.questionnaire?.length}
                    </span>{" "}
                    questions, and you will not be able to edit your response
                    after submitting
                  </p>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                  <Button color="primary" onClick={handleSubmit}>
                    Confirm
                  </Button>
                  <Button color="secondary" onClick={() => tog_center()}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <Modal
                isOpen={modal_center}
                toggle={() => {
                  tog_center();
                }}
                centered
              >
                <ModalHeader
                  className="d-flex justify-content-start"
                  style={{ border: "none" }}
                >
                  Are you sure you want to Reset your benchmark?
                </ModalHeader>
                <ModalBody
                  className="d-flex justify-content-center"
                  style={{ fontSize: "20px" }}
                >
                  <p>
                    This will remove all the user responses from this benchmark.
                  </p>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                  <Button color="primary" onClick={handleResetConfirm}>
                    Confirm
                  </Button>
                  <Button color="secondary" onClick={() => tog_center()}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </div>
      <Modal isOpen={deleteConfirmation} toggle={cancelDelete}>
        <ModalHeader toggle={cancelDelete}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this answer variation?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default BenchmarkingDashboard;
