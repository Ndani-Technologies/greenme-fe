import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import classnames from "classnames";
import DiscussionMain from "../Discussion-Main/DiscussionMain";
import { Link } from "react-router-dom";
import { activeParticipants, overviewCards } from "./DiscussionCardData";
import DiscussionCardDocument from "./DiscussionCardDocument";
import DiscussionInviteTab from "./DiscussionInviteTab";
import DiscussionComments from "./DiscussionComments";
const data = [
  {
    creator: "Nancy Martino",
    orgnaization: "14",
    users: "24",
    date: "24 June, 2020",
    activity: "14 May, 2021",
  },
];
const DashboardCardDetails = () => {
  const [pillsTab, setpillsTab] = useState("1");
  const pillsToggle = (tab) => {
    if (pillsTab !== tab) {
      setpillsTab(tab);
    }
  };
  const [switchStates, setSwitchStates] = useState(
    Array(activeParticipants.length).fill(false)
  );

  const handleSwitchChange = (index) => {
    const updatedStates = [...switchStates];
    updatedStates[index] = !updatedStates[index];
    setSwitchStates(updatedStates);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [justifyTab, setjustifyTab] = useState("1");
  const CardsPerPage = [12, 4]; // Number of cards to display per page: [8 cards on first page, 4 cards on second page]
  const indexOfLastCard = currentPage === 1 ? CardsPerPage[0] : CardsPerPage[1];
  const currentCards = overviewCards.slice(0, indexOfLastCard);

  const totalCards = overviewCards.length;
  const totalPages = CardsPerPage.length;

  const justifyToggle = (tab) => {
    if (justifyTab !== tab) {
      setjustifyTab(tab);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSelectedCard = (item) => {
    setCard(item);
    setModal(true);
  };
  const [modalProject, setModalProject] = useState(false);
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
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <DiscussionMain
          title={"Discussion Dashboard"}
          text={"Switch to Electric vehicles"}
        />
        <Col lg={12}>
          <Card>
            <div className="bg-success pt-5 ps-4 pe-4 pb-0 mx-n2 w-100">
              <div className="d-flex align-items-end gap-3">
                {data.map((item) => {
                  return (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <h6 className="fw-semibold mb-0">
                        Creator:{" "}
                        <span className="fw-light">{item.creator}</span>
                      </h6>
                      <h6 className="fw-semibold mb-0">
                        Organizations Represented:{" "}
                        <span className="fw-light">{item.orgnaization}</span>
                      </h6>
                      <h6 className="fw-semibold mb-0">
                        No of users:{" "}
                        <span className="fw-light">{item.users}</span>
                      </h6>
                      <h6 className="fw-semibold mb-0">
                        Creation date:{" "}
                        <span className="fw-light">{item.date}</span>
                      </h6>
                      <h6 className="fw-semibold mb-0">
                        Last Activity date:{" "}
                        <span className="fw-light">{item.activity}</span>
                      </h6>
                      <button className="btn btn-dark btn-sm">
                        Exit Discussion
                      </button>
                    </div>
                  );
                })}
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
                    Overview
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
                    Participants
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
                    Document
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer", background: "success" }}
                    className={classnames("bg-success", {
                      active: pillsTab === "4",
                    })}
                    onClick={() => {
                      pillsToggle("4");
                    }}
                  >
                    Invites
                  </NavLink>
                </NavItem>
              </Nav>
            </div>

            <CardBody>
              <TabContent activeTab={pillsTab} className="text-muted">
                <TabPane tabId="1" id="home-1">
                  <Row className="d-flex justify-content-evenly">
                    <Col lg={8} className="shadow-sm rounded  pt-2">
                      <h5>Summary</h5>
                      <p>
                        It will be as simple as occidental in fact, it will be
                        Occidental. To an English person, it will seem like
                        simplified English, as a skeptical Cambridge friend of
                        mine told me what Occidental is. The European languages
                        are members of the same family.{" "}
                      </p>
                      <ul>
                        <li>Product Design, Figma (Software), Prototype</li>
                        <li>
                          Four Dashboards : Ecommerce, Analytics, Project,etc.
                        </li>
                        <li>Create calendar, chat and email app pages.</li>
                        <li>Add authentication pages.</li>
                        <li>Content listing.</li>
                      </ul>
                      <button className="border-0 bg-white text-green1 text-decoration-underline">
                        Read more
                      </button>
                    </Col>
                    <Col lg={3} className="shadow-sm rounded  p-0">
                      <CardHeader className="align-items-center d-flex border-bottom-dashed">
                        <h3 className="card-title mb-0 flex-grow-1">
                          Recently active participants
                        </h3>
                      </CardHeader>

                      <div className="pt-3 pb-3 ps-2 pe-2">
                        {activeParticipants.map((item, index) => {
                          return (
                            <div className="vstack gap-3 mb-3">
                              <div className="d-flex align-items-center">
                                <div className="avatar-xs flex-shrink-0 me-3">
                                  <img
                                    src={item.Image}
                                    alt=""
                                    className="img-fluid rounded-circle"
                                  />
                                </div>
                                <div className="flex-grow-1">
                                  <h5 className="fs-14 mb-0">
                                    <Link to="#" className="text-body d-block">
                                      {item.name}
                                    </Link>
                                  </h5>
                                </div>
                                <div className="d-flex gap-3 align-items-center">
                                  <div>
                                    <i class="ri-question-answer-line fs-3"></i>
                                  </div>
                                  <div className="form-check form-switch form-switch-right form-switch-md">
                                    <Input
                                      className="form-check-input code-switcher "
                                      type="checkbox"
                                      checked={switchStates[index]}
                                      onChange={() => handleSwitchChange(index)}
                                      tabIndex={index + 1}
                                      style={{ width: "50px" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                  <div className=" d-flex  gap-2 justify-content-between mt-5  w-100">
                    <div className="p-2 shadow-sm rounded d-flex flex-column file-manager-sidebar">
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
                              style={{ width: "120px" }}
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
                                  style={{
                                    color: "#6691E7",
                                    marginRight: "5px",
                                  }}
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
                    </div>
                    <div className="p-0 w-75">
                      <DiscussionComments />
                    </div>
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
                              <i className="ri-close-line align-bottom"></i>{" "}
                              Close
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
                  </div>
                </TabPane>
                <TabPane tabId="2" id="profile-1">
                  <Row>
                    <div className="d-flex gap-2 mb-3 mt-4">
                      <div
                        className="d-flex align-items-center border border-gray p-1 w-25 rounded"
                        style={{ height: "37px" }}
                      >
                        <i className="bx bx-search-alt search-icon"></i>
                        <input
                          className="border-0"
                          placeholder="Search by  Action"
                          type="text"
                        />
                      </div>
                      <div className=" w-25">
                        <select className="form-select mb-3">
                          <option hidden selected>
                            Orgnaisation
                          </option>
                        </select>
                      </div>
                      <div style={{ width: "145px" }}>
                        <select className="form-select mb-3">
                          <option hidden selected>
                            Recent Activity
                          </option>
                        </select>
                      </div>
                      <div style={{ width: "145px" }}>
                        <select className="form-select mb-3">
                          <option hidden selected>
                            Latest Addition
                          </option>
                        </select>
                      </div>
                    </div>
                    {currentCards.map((item, index) => (
                      <Col xs={12} md={6} lg={4} xxl={3} key={index}>
                        <Col
                          className="d-flex  gap-2 border border-light rounded p-2 mb-2"
                          style={{ fontSize: "12px" }}
                        >
                          <div>
                            <img src={item.Image} />
                          </div>
                          <div>
                            <div className="text-dark fs-6 d-flex justify-content-between">
                              {item.Name}
                              <div>
                                <i
                                  style={{
                                    color: "grey",
                                    marginRight: "6px",
                                  }}
                                  class="ri-question-answer-line"
                                ></i>
                                <i
                                  style={{ color: "grey" }}
                                  class="ri-mail-line"
                                ></i>
                              </div>
                            </div>
                            {item.Company}
                            <div className="d-flex align-items-center gap-1">
                              <img src={item.Medal} />
                              {item.Goal}
                            </div>
                            <div className="d-flex gap-3">
                              <div className="d-flex align-items-center gap-1">
                                <img src={item.Flag1} />
                                {item.Country1}
                              </div>
                              <div className="d-flex align-items-center gap-1">
                                <img src={item.Flag2} />
                                {item.Country2}
                              </div>
                              <div className="d-flex align-items-center gap-1">
                                <img src={item.Flag3} />
                                {item.Country3}
                              </div>
                            </div>
                            <div className="text-success">{item.Date}</div>
                          </div>
                        </Col>
                      </Col>
                    ))}
                  </Row>
                  <Pagination className="float-end">
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        previous
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </PaginationLink>
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <PaginationItem
                          key={index}
                          active={currentPage === pageNumber}
                        >
                          <PaginationLink
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink
                        next
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </TabPane>
                <TabPane tabId="3" id="messages-1">
                  <DiscussionCardDocument />
                </TabPane>
                <TabPane tabId="4" id="settings-1">
                  <DiscussionInviteTab />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default DashboardCardDetails;
