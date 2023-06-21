import React, { useState, useEffect, dispatch } from "react";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
} from "reactstrap";
import classnames from "classnames";
import Logo from "../../assets/images/Discussion-brand-logo.png";
import { Projects, cardData } from "./DiscussionCardData";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const DashboardTabs = () => {
  // Toggle Project Modal
  const toggleProject = () => {
    if (modalProject) {
      setModalProject(false);
    } else {
      setModalProject(true);
    }
  };
  const [pillsTab, setpillsTab] = useState("1");
  const pillsToggle = (tab) => {
    if (pillsTab !== tab) {
      setpillsTab(tab);
    }
  };
  const projectValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Project Title"),
    }),
    onSubmit: (values) => {
      const newProjectData = {
        id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        title: values.title,
        subItem: [{ id: 1, version: "v1.0.0", iconClass: "danger" }],
      };
      // save new Project Data
      dispatch(onAddNewProject(newProjectData));
      projectValidation.resetForm();
      toggleProject();
    },
  });
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (itemId) => {
    if (openDropdownId === itemId) {
      // Close the dropdown if it's already opewn
      setOpenDropdownId(null);
    } else {
      // Open the clicked dropdown
      setOpenDropdownId(itemId);
    }
  };
  const [modalProject, setModalProject] = useState(false);
  // const [editThread, setEditThread] = useState();
  // const { threads, setThreads } = useState([
  //   { id: 1, title: "Switch to electric vehicles" },
  //   { id: 2, title: "Introducing trip sharing" },
  //   { id: 3, title: "Enroll drivers in trainings" },
  //   { id: 4, title: "Carry out waste management audit" },
  //   { id: 5, title: "Route optimisation exercise" },
  //   { id: 6, title: "Complete sustainable FM training" },
  // ]);
  // const handleEditThread = (thread) => {
  //   setEditThread(thread);
  //   setModalProject(true);
  // };
  // const handleDeleteThread = (thread) => {
  //   setThreads(threads.filter((t) => t.id !== thread.id));
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (threads) {
  //     setThreads(
  //       threads.map((thread) =>
  //         thread.id === editThread.id
  //           ? { ...thread, title: e.target.value }
  //           : thread
  //       )
  //     );
  //     setEditThread(null);
  //   } else {
  //     const newThread = { id: Date.now(), title: e.target.value };
  //     setThreads([...threads, newThread]);
  //   }
  //   setModalProject(false);
  // };
  const [editThread, setEditThread] = useState(null);
  const [threads, setThreads] = useState([
    { id: 1, title: "Switch to electric vehicles" },
    { id: 2, title: "Introducing trip sharing" },
    { id: 3, title: "Enroll drivers in trainings" },
    { id: 4, title: "Carry out waste management audit" },
    { id: 5, title: "Route optimisation exercise" },
    { id: 6, title: "Complete sustainable FM training" },
  ]);

  const handleEditThread = (thread) => {
    setEditThread(thread);
    setModalProject(true);
  };

  const handleDeleteThread = (thread) => {
    setThreads(threads.filter((t) => t.id !== thread.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editThread) {
      // Update existing thread
      setThreads(
        threads.map((thread) =>
          thread.id === editThread.id
            ? { ...thread, title: e.target.title.value }
            : thread
        )
      );
      setEditThread(null);
    } else {
      // Add new thread
      const newThread = { id: Date.now(), title: e.target.title.value };
      setThreads([...threads, newThread]);
    }
    setModalProject(false);
  };
  return (
    <div>
      <Col lg={12} className="bg-success">
        <Card>
          <div className="bg-success pt-2 ps-5 pb-0 mx-n2 w-100">
            <div className="d-flex align-items-end gap-3">
              <img src={Logo} alt="" />
              <h3 className="text-muted">Forum and Discussions</h3>
            </div>
            <Nav pills className="nav-info mb-1 mt-2">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer", background: "success" }}
                  className={classnames("bg-success", {
                    active: pillsTab === "1",
                  })}
                  onClick={() => {
                    pillsToggle("1");
                  }}
                >
                  All
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer", background: "success" }}
                  className={classnames("bg-success", {
                    active: pillsTab === "2",
                  })}
                  onClick={() => {
                    pillsToggle("2");
                  }}
                >
                  Popular
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer", background: "success" }}
                  className={classnames("bg-success", {
                    active: pillsTab === "3",
                  })}
                  onClick={() => {
                    pillsToggle("3");
                  }}
                >
                  Featured
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames("bg-success", {
                    active: pillsTab === "4",
                  })}
                  onClick={() => {
                    pillsToggle("4");
                  }}
                >
                  Dormant
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <CardBody>
            <TabContent activeTab={pillsTab} className="text-muted">
              <TabPane tabId="1" id="home-1" className="d-flex gap-2">
                <Col className="file-manager-sidebar">
                  <Col className="p-2 shadow-sm rounded d-flex flex-column">
                    <div className="d-flex align-items-center p-0 justify-content-between mb-3">
                      <div>
                        <h5>Threads</h5>
                        <div
                          className="d-flex align-items-center border border-dark p-1 rounded"
                          style={{ height: "37px", width: "170px" }}
                        >
                          <i className="bx bx-search-alt search-icon"></i>
                          <input
                            className="border-0"
                            placeholder="Search here..."
                            type="text"
                            style={{ width: "140px" }}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <span className="text-dark mb-2">Add New Thread</span>
                        <button
                          className="btn bg-light"
                          onClick={() => setModalProject(true)}
                          style={{ width: "40px" }}
                        >
                          <i className="ri-add-line align-bottom m-auto"></i>
                        </button>
                      </div>
                    </div>
                    <ul
                      className="to-do-menu list-unstyled"
                      id="projectlist-data"
                    >
                      {threads.map((item, key) => (
                        <li key={key}>
                          <Link
                            to="#"
                            className="nav-link fs-13 d-flex align-items-center justify-content-between"
                            id={"todos" + key}
                          >
                            {item.title}
                            <div>
                              <i
                                style={{ color: "#6691E7", marginRight: "5px" }}
                                className="ri-pencil-fill"
                                onClick={() => handleEditThread(item)}
                              ></i>
                              <i
                                style={{ color: "#F06548" }}
                                className="ri-delete-bin-line"
                                onClick={() => handleDeleteThread(item)}
                              ></i>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Col>
                <Col>
                  <Modal
                    id="createProjectModal"
                    isOpen={modalProject}
                    toggle={() => setModalProject(!modalProject)}
                    modalClassName="zoomIn"
                    tabIndex="-1"
                    centered
                  >
                    <ModalHeader
                      toggle={() => setModalProject(!modalProject)}
                      className="p-3 bg-soft-success"
                      id="createProjectModalLabel"
                    >
                      {editThread ? "Edit Thread" : "Create Thread"}
                    </ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label
                            htmlFor="projectname-input"
                            className="form-label"
                          >
                            Thread Name
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="projectname-input"
                            name="title"
                            placeholder="Enter thread name"
                            defaultValue={editThread ? editThread.title : ""}
                            required
                          />
                          <input
                            type="hidden"
                            className="form-control"
                            id="projectid-input"
                            value=""
                          />
                        </div>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-ghost-success"
                            onClick={() => setModalProject(false)}
                          >
                            <i className="ri-close-line align-bottom"></i> Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            id="addNewProject"
                          >
                            {editThread ? "Save Changes" : "Add Thread"}
                          </button>
                        </div>
                      </form>
                    </ModalBody>
                  </Modal>
                  {cardData.map((item) => {
                    return (
                      <div
                        lg={12}
                        className="d-flex bg-white gap-3 p-3 rounded shadow-sm mb-3"
                      >
                        <div>
                          <img src={item.Image} alt="" />
                        </div>
                        <div>
                          <div className="d-flex justify-content-between">
                            <h5 className="text-dark">
                              <Link to="/dashboardcardetail">{item.title}</Link>
                            </h5>
                            <span>{item.lastActivity}</span>
                          </div>
                          <p>{item.text}</p>
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center gap-2 w-25 m-0">
                              <img
                                className="rounded-circle w-25"
                                src={item.profile}
                                alt=""
                              />
                              <div>
                                <span className="bg-primary text-white p-1">
                                  Creator / Moderator
                                </span>
                                <h6 className="mb-0 mt-2">{item.name}</h6>
                                <span>{item.designation}</span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center flex-grow-1">
                              <h6 className="flex-grow-1">
                                Topic:
                                <span className="fw-light">{item.topic}</span>
                              </h6>
                              <h6 className="flex-grow-1">
                                Participants:
                                <span className="fw-light">
                                  {item.participants}
                                </span>
                              </h6>
                              <h6 className="flex-grow-1">
                                Organisations represented:
                                <span className="fw-light">
                                  {item.organisation}
                                </span>
                              </h6>

                              <div
                                onClick={() => toggleDropdown(item.id)}
                                style={{ width: "110px" }}
                                key={item.id}
                              >
                                <div className=" d-flex align-items-center justify-content-between bg-light p-2 rounded border border-grey ">
                                  Actions
                                  <i class="ri-arrow-down-s-line"></i>
                                </div>
                                <div className="border border-grey rounded">
                                  {openDropdownId === item.id && (
                                    <div className="d-flex align-items-center justify-content-between bg-light p-2">
                                      <i
                                        class="ri-close-line"
                                        style={{ color: "#699BF7" }}
                                      ></i>
                                      <i
                                        class="ri-pencil-fill"
                                        style={{ color: "#699BF7" }}
                                      ></i>
                                      <i
                                        class="ri-delete-bin-5-line"
                                        style={{ color: "#F06548" }}
                                      ></i>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Col>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default DashboardTabs;
