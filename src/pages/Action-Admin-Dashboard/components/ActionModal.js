import React, { useEffect, useState, useCallback, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Col,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
  Button,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  ModalFooter,
} from "reactstrap";
import classnames from "classnames";
import Medal from "../../../assets/images/Medal.png";
import {
  category,
  cost,
  potential,
  resourceData,
  scale,
  tabContent,
  tabs,
  weight,
} from "./ActionModalData";
import { toast } from "react-toastify";
import {
  getAllAdminActions,
  createAdminActions,
  createAdminResources,
  updatedAdminActions,
  createAdminStatus,
  createAdminStep,
  deleteAdminResources,
  deleteAdminStep,
  updateAdminResources,
  updateAdminStep,
} from "../../../slices/thunks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { set } from "lodash";
const ActionModal = ({
  info,
  setInfo,
  isDataUpdated,
  setIsDataUpdated,
  modal_grid,
  setmodal_grid,
  adminCategories,
  setAdminCategories,
  adminTimeScale,
  setAdminTimeScale,
  adminActions,
  setAdminActions,
  adminCosts,
  setAdminCosts,
  adminPotential,
  setAdminPotential,
  adminRelation,
  setAdminRelation,
  adminStatus,
  setAdminStatus,
  adminResources,
  setAdminResources,
  adminSteps,
  setAdminSteps,
}) => {
  const [open, isOpen] = useState(false);
  const [isWeight, setIsWeight] = useState(false);
  const [isCost, setIsCost] = useState(false);
  const [isScale, setIsScale] = useState(false);
  const [isPotential, setIsPotential] = useState(false);

  //gm
  const [resourceInput, setResourceInput] = useState("");
  const [isManageResourceUpdate, setIsManageResourceUpdate] = useState(false);
  const [isActionStepUpdate, setIsActionStepUpdate] = useState(false);
  const [actionStepId, setActionStepId] = useState();
  const [resourceManageId, setResourceManageId] = useState();
  const [actionTitle, setActionTitle] = useState("");
  const [actionDescription, setActionDescription] = useState("");
  const [actionScore, setActionScore] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //Data values States

  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const handleClick = (language) => {
    setSelectedLanguage(language);
  };
  const [isChecked5, setIsChecked5] = useState(true);
  const [isChecked6, setIsChecked6] = useState(true);

  const handleCheckboxChange5 = (event) => {
    setIsChecked5(!isChecked5);
  };
  const handleCheckboxChange6 = (event) => {
    setIsChecked6(!isChecked6);
  };
  const [activeArrowTab, setactiveArrowTab] = useState(1);
  const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
  function toggleArrowTab(index) {
    if (activeArrowTab !== index) {
      var modifiedSteps = [...passedarrowSteps, index];

      setactiveArrowTab(index);
    }
  }
  const [isCategoryClick, setIsCategoryClick] = useState(0);
  const [categorySelectTitle, setCategorySelectTitle] = useState("");
  const [isCostClick, setIsCostClick] = useState(0);
  const [costSelectTitle, setCostSelectTitle] = useState("");
  const [isScaleClick, setIsScaleClick] = useState(0);
  const [scaleSelectTitle, setScaleSelectTitle] = useState("");
  const [isPotentialClick, setIsPotentialClick] = useState(0);
  const [potentialSelectTitle, setPotentialSelectTitle] = useState("");

  const handleCategoryClick = (index) => {
    if (isDataUpdated) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        categoryId: index, // Update the answerRelationshipId with the clicked item's ID
      }));
      setIsCategoryClick(index);
      setCategorySelectTitle(index.title);
    }
    setIsCategoryClick(index);
    setCategorySelectTitle(index.title);
  };

  const handleCostClick = (index) => {
    if (isDataUpdated) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        costId: index, // Update the answerRelationshipId with the clicked item's ID
      }));
      setIsCostClick(index);
      setCostSelectTitle(index.title);
    }
    setIsCostClick(index);
    setCostSelectTitle(index.title);
  };
  const handleScaleClick = (index) => {
    if (isDataUpdated) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        timescaleId: index, // Update the answerRelationshipId with the clicked item's ID
      }));
      setIsScaleClick(index);
      setScaleSelectTitle(index.title);
    }
    setIsScaleClick(index);
    setScaleSelectTitle(index.title);
  };
  const handlePotentialClick = (index) => {
    if (isDataUpdated) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        potentialId: index, // Update the answerRelationshipId with the clicked item's ID
      }));
      setIsPotentialClick(index);
      setPotentialSelectTitle(index.title);
    }
    setIsPotentialClick(index);
    setPotentialSelectTitle(index.title);
  };

  //HANDLING DELETE

  const [deleteId, setDeleteId] = useState(null);
  const handleResourceDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirmation2(true);
  };

  const [deleteConfirmation2, setDeleteConfirmation2] = useState(false);
  const confirmDelete2 = () => {
    deleteAdminResources(deleteId)
      .then((resp) => {
        const updatedResponses = adminResources.filter(
          (c) => c._id !== deleteId
        );
        setAdminResources(updatedResponses);
        toast.success("Successfully Deleted");
      })
      .catch((err) => {
        toast.error(toast.error("Unable to Delete"));
        console.log("err in deleteing Resource", err);
      });
    setDeleteConfirmation2(false);
    setDeleteId(null);
  };

  const cancelDelete2 = () => {
    setDeleteConfirmation2(false);
    setDeleteId(null);
  };

  const handleResourceEdit = (data) => {
    // setEditingDataId(dataId);

    setIsManageResourceUpdate(true);
    setResourceManageId(data._id);
    setResourceInput(data?.title);
  };

  const handleManageResource = () => {
    if (resourceInput !== "") {
      const mappedData = {
        title: resourceInput,
      };
      if (isManageResourceUpdate) {
        //update
        updateAdminResources(resourceManageId, mappedData)
          .then((data) => {
            setAdminResources((prev) => {
              const updateAdminResources = prev.map((value) => {
                if (value._id === resourceManageId) {
                  value.title = mappedData.title;
                  return value;
                }
                return value;
              });
              return updateAdminResources;
            });
            setResourceInput("");
            setIsManageResourceUpdate(false);
          })
          .catch(() => toast.error("Error in adding link"));
      } else {
        //create
        createAdminResources(mappedData)
          .then((data) => {
            setAdminResources([...adminResources, data]);
            setResourceInput("");
          })
          .catch(() => toast.error("Error in adding link"));
      }
    }
  };

  const handleAddActions = () => {
    if (actionTitle !== "" && actionDescription !== "" && actionScore) {
      const mappedData = {
        title: actionTitle,
        description: actionDescription,
        score: actionScore,
      };
      if (isActionStepUpdate) {
        updateAdminStep(actionStepId, mappedData).then((resp) => {
          setAdminSteps((prev) => {
            const updateAdminResources = prev.map((value) => {
              if (value._id === actionStepId) {
                value.title = mappedData.title;
                (value.description = mappedData.description),
                  (value.score = mappedData.score);
                return value;
              }
              return value;
            });
            return updateAdminResources;
          });
        });
      } else {
        createAdminStep(mappedData)
          .then((res) => {
            setAdminSteps([...adminSteps, mappedData]);
          })
          .catch(() => toast.error("Error in adding step"));
      }
      setIsActionStepUpdate(false);
      setActionTitle("");
      setActionDescription("");
      setActionScore("");
    } else {
      toast.error("Title, Description or Score can not be null.");
    }
  };
  const handleEdit = (data) => {
    setActionStepId(data._id);
    setActionTitle(data.title);
    setActionDescription(data.description);
    setActionScore(data.score);
    setIsActionStepUpdate(true);
  };

  const handleDelete = (id) => {
    console.log("delte id", id);
    deleteAdminStep(id)
      .then((res) => {
        if (res !== undefined) {
          setAdminSteps((prev) => {
            const updateAdminResources = prev.filter(
              (value) => value._id !== id
            );
            return updateAdminResources;
          });
          toast.success("Step deleted.");
        }
      })
      .catch(() => toast.error("Error in adding step"));
  };

  //HANDLING TABS CLICK ON NEXT AND BACK
  const [activeTab, setActiveTab] = useState(1);

  const handleNextTab = (e) => {
    e.preventDefault();
    setactiveArrowTab((prevTab) => prevTab + 1);
  };

  // Function to handle the previous tab
  const handlePrevTab = (e) => {
    e.preventDefault();
    setactiveArrowTab((prevTab) => prevTab - 1);
  };

  const handleSubmit = () => {
    const mappedData = {
      title,
      description,
      stat: isChecked5,
      visibility: isChecked6,
      steps: adminSteps.map((value) => value._id),
      categoryId: isCategoryClick._id,
      costId: isCostClick._id,
      potentialId: isPotentialClick._id,
      timescaleId: isScaleClick._id,
    };
    console.log("hanlde submit", mappedData);

    if (title !== "" && description !== "") {
      createAdminActions(mappedData)
        .then((resp) => {
          if (resp !== undefined) {
            setAdminActions([...adminActions, resp]);
            setmodal_grid(false);
            toast.success("Successfully Created Action");
          }
        })
        .catch((err) => toast.error("Error in creating action"));
    } else {
      toast.error("title or description can not be null");
    }
  };

  const handleUpdate = (id) => {
    const mappedData = {
      title,
      description,
      stat: isChecked5,
      visibility: isChecked6,
      categoryId: isCategoryClick._id,
      costId: isCostClick._id,
      potentialId: isPotentialClick._id,
      timescaleId: isScaleClick._id,
    };

    console.log(mappedData, "MAPPED DATA");

    updatedAdminActions(mappedData, id)
      .then((resp) => {
        getAllAdminActions().then((res) => {
          setAdminActions(res);
          setmodal_grid(false);
          toast.success("Successfully updated");
        });
      })
      .catch((err) => {
        console.log("error in updating", err);
        toast.error("Error in updating action");
      });
  };

  const [scoreError, setScoreError] = useState(false);

  const handleScoreChange = (e) => {
    const inputValue = e.target.value;
    // Regular expression to match only numbers
    const numberRegex = /^[0-9]*$/;

    if (numberRegex.test(inputValue)) {
      setActionScore(inputValue);
      setScoreError(false);
    } else {
      setActionScore(inputValue);
      setScoreError(true);
    }
  };

  return (
    <>
      <Modal
        size="lg p-5"
        className="postion-relative m-0 float-end"
        isOpen={modal_grid} //null
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
          <h4 className="modal-title">Add Action</h4>
        </ModalHeader>
        <ModalBody>
          <form className="p-4 pt-2 pb-2" action="#">
            <div className="row g-3">
              <div className="p-0 d-flex align-items-center justify-content-between">
                <Col lg={7} className="border p-2">
                  Language Selector:
                  <div className="d-flex justify-content-between pt-2">
                    <Button
                      onClick={() => handleClick("ENGLISH")}
                      style={
                        selectedLanguage === "ENGLISH"
                          ? { backgroundColor: "#4A7BA4" }
                          : {
                              backgroundColor: "#E9EBEC",
                              border: "none",
                            }
                      }
                    >
                      ENGLISH
                    </Button>
                    <Button
                      onClick={() => handleClick("FRENCH")}
                      style={
                        selectedLanguage === "FRENCH"
                          ? { backgroundColor: "#4A7BA4" }
                          : {
                              backgroundColor: "#E9EBEC",
                              border: "none",
                            }
                      }
                    >
                      FRENCH
                    </Button>
                    <Button
                      onClick={() => handleClick("SPANISH")}
                      style={
                        selectedLanguage === "SPANISH"
                          ? { backgroundColor: "#4A7BA4" }
                          : {
                              backgroundColor: "#E9EBEC",
                              border: "none",
                            }
                      }
                    >
                      SPANISH
                    </Button>
                    <Button
                      onClick={() => handleClick("ARABIC")}
                      style={
                        selectedLanguage === "ARABIC"
                          ? { backgroundColor: "#4A7BA4" }
                          : {
                              backgroundColor: "#E9EBEC",
                              border: "none",
                              lineHeight: "-5px",
                            }
                      }
                    >
                      ARABIC
                    </Button>
                  </div>
                </Col>
                <div>
                  <div className="flex-shrink-0 border p-3 pt-1 pb-1 mb-2 rounded">
                    <div className="form-check form-switch form-switch-right form-switch-md ">
                      <Label
                        htmlFor="form-grid-showcode"
                        className="form-label text-muted"
                      >
                        Status:
                      </Label>
                      <Input
                        className="form-check-input code-switcher"
                        type="checkbox"
                        value="active"
                        checked={isChecked5}
                        onChange={handleCheckboxChange5}
                        style={{
                          backgroundColor: isChecked5 ? "#88C756" : "#fff",
                          width: "80px",
                          border: "0",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 border p-3 pt-1 pb-1 d-flex justify-content-end rounded">
                    <div className="form-check form-switch form-switch-right form-switch-md">
                      <Label
                        htmlFor="form-grid-showcode"
                        className="form-label text-muted"
                      >
                        Visibility:
                      </Label>
                      <Input
                        className="form-check-input code-switcher"
                        type="checkbox"
                        value="active"
                        checked={isChecked6}
                        onChange={handleCheckboxChange6}
                        style={{
                          backgroundColor: isChecked6 ? "#88c765" : "#fff",
                          width: "50px",
                          border: "0",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Col xxl={12} className="p-0">
                <div>
                  <Input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Title"
                    value={isDataUpdated ? info.title : title}
                    onChange={(e) => {
                      if (isDataUpdated) {
                        // If data is updated, handle changes differently
                        const updatedInfo = { ...info, title: e.target.value };
                        setInfo(updatedInfo);
                        setTitle(updatedInfo.title);
                      } else {
                        // If data is not updated, update the local state
                        setTitle(e.target.value);
                      }
                    }}
                  />
                </div>
              </Col>
              <Col xxl={12} className="p-0">
                <div className="ck-editor-reverse">
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(e, editor) => {
                      const value = editor.getData();
                      const div = document.createElement("div");
                      div.innerHTML = value;
                      const pValue = div.querySelector("p").innerHTML;
                      if (isDataUpdated) {
                        // If data is updated, handle changes differently
                        const updatedInfo = {
                          ...info,
                          description: pValue,
                        };
                        setInfo(updatedInfo);
                        setDescription(updatedInfo.description);
                      } else {
                        // If data is not updated, update the local state
                        setDescription(pValue);
                      }
                    }}
                    validate={{
                      required: { value: true },
                    }}
                    class="form-control"
                    placeholder="Description"
                    id="floatingTextarea"
                    value={isDataUpdated ? info.description : description}
                    style={{
                      height: "120px",
                      overflow: "hidden",
                      backgroundColor: "#dfdfdf",
                    }}
                  />
                </div>
              </Col>
              <Col xxl={12} className="p-0">
                <Card>
                  <CardHeader className="d-flex align-iteems-center justify-content-between">
                    <h5 className="mt-2">Action Steps</h5>
                  </CardHeader>
                  <CardBody>
                    <Form className="form-steps">
                      <div className="step-arrow-nav mb-4">
                        <Nav
                          className="nav-pills custom-nav nav-justified"
                          role="tablist"
                        >
                          {tabs.map((tab) => (
                            <NavItem key={tab.id}>
                              <NavLink
                                href="#"
                                id={`steparrow-gen-info-tab-${tab.id}`}
                                // Assuming activeArrowTab is the active tab's ID
                                className={classnames({
                                  active: activeArrowTab === tab.id,
                                  done:
                                    activeArrowTab <= tab.id + 1 &&
                                    activeArrowTab > tab.id,
                                })}
                                onClick={() => {
                                  toggleArrowTab(tab.id);
                                }}
                              >
                                {tab.tab}
                              </NavLink>
                            </NavItem>
                          ))}
                        </Nav>
                      </div>

                      <TabContent activeTab={activeArrowTab}>
                        {tabs.map((tab) => (
                          <TabPane
                            key={tab.id}
                            id={`steparrow-gen-info-${tab.id}`}
                            tabId={tab.id}
                            active={activeTab === tab.id}
                          >
                            {tab.id == 1 && (
                              <Col xxl={12} className="p-0 mb-2">
                                <label>Add Title</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  placeholder="Title"
                                  value={actionTitle}
                                  onChange={(e) =>
                                    setActionTitle(e.target.value)
                                  }
                                />
                                <div className=" d-flex gap-1 text-success">
                                  <div>
                                    <i class="ri-error-warning-line"></i>
                                  </div>
                                  <span>
                                    Please not to enter the words 'Step X', this
                                    will be generated by the system.
                                  </span>
                                </div>
                              </Col>
                            )}
                            {tab.id == 2 && (
                              <Col xxl={12} className="p-0 mb-2">
                                <label>Add Description</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  placeholder="Discription"
                                  value={actionDescription}
                                  onChange={(e) =>
                                    setActionDescription(e.target.value)
                                  }
                                />
                                <div className=" d-flex gap-1 text-success">
                                  <div>
                                    <i class="ri-error-warning-line"></i>
                                  </div>
                                  <span>
                                    Please not to enter the words 'Step X', this
                                    will be generated by the system.
                                  </span>
                                </div>
                              </Col>
                            )}
                            {tab.id == 3 && (
                              <Col xxl={12} className="p-0 mb-2">
                                <label>Add Value</label>
                                <div>
                                  <Input
                                    type="text"
                                    className={`form-control ${
                                      scoreError ? "is-invalid" : ""
                                    }`}
                                    id="firstName"
                                    placeholder="Value"
                                    value={actionScore}
                                    onChange={handleScoreChange}
                                  />
                                  {scoreError && (
                                    <div className="invalid-feedback">
                                      Please enter only numbers in the Value
                                      field.
                                    </div>
                                  )}
                                </div>
                                <div className=" d-flex gap-1 text-success">
                                  <div>
                                    <i class="ri-error-warning-line"></i>
                                  </div>
                                  <span>
                                    Please not to enter the words 'Step X', this
                                    will be generated by the system.
                                  </span>
                                </div>
                              </Col>
                            )}
                            <Col className="d-flex justify-content-between">
                              <div className="text-end mb-4">
                                {activeArrowTab > 1 && (
                                  <button
                                    className="btn btn-light btn-label left ms-auto"
                                    onClick={handlePrevTab}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-bottom fs-16"></i>{" "}
                                    Back
                                  </button>
                                )}
                              </div>
                              <div className="text-end mb-4">
                                <Button
                                  className={`p-4 pt-2 pb-2`}
                                  color="secondary"
                                  onClick={handleAddActions}
                                >
                                  Save
                                </Button>
                              </div>
                              <div className="text-end mb-4">
                                {activeArrowTab < tabs.length && (
                                  <button
                                    className="btn btn-info btn-label right ms-auto"
                                    onClick={handleNextTab}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-bottom fs-16 ms-2"></i>{" "}
                                    Next
                                  </button>
                                )}
                              </div>
                            </Col>

                            {/* <Col className="d-flex justify-content-between">
                              <div className="text-end mb-4">
                                {activeTab > 1 && (
                                  <button
                                    className="btn btn-light btn-label left ms-auto"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handlePrevTab;
                                    }}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-bottom fs-16"></i>{" "}
                                    Back
                                  </button>
                                )}
                              </div>
                              <div className="text-end mb-4">
                                <Button
                                  className={`p-4 pt-2 pb-2`}
                                  color="secondary"
                                  onClick={handleAddActions}
                                >
                                  Save
                                </Button>
                              </div>
                              <div className="text-end mb-4">
                                {activeTab < tabs.length && (
                                  <button
                                    className="btn btn-info btn-label right ms-auto"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNextTab;
                                    }}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-bottom fs-16 ms-2"></i>{" "}
                                    Next
                                  </button>
                                )}
                              </div>
                            </Col> */}
                            {/* <Col className="d-flex justify-content-between">
                              <div className="text-end mb-4">
                                {activeTab > 1 && (
                                  <button
                                    className="btn btn-light btn-label left ms-auto"
                                    onClick={handleBack}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-bottom fs-16"></i>{" "}
                                    Back
                                  </button>
                                )}
                              </div>
                              <div className="text-end mb-4">
                                <Button
                                  className={`p-4 pt-2 pb-2`}
                                  color="secondary"
                                  onClick={handleAddActions}
                                >
                                  Save
                                </Button>
                              </div>
                              <div className="text-end mb-4">
                                {activeTab < tabs.length && (
                                  <button
                                    className="btn btn-info btn-label right ms-auto"
                                    onClick={handleNext}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-bottom fs-16 ms-2"></i>{" "}
                                    Next
                                  </button>
                                )}
                              </div>
                            </Col> */}
                            {tab.id &&
                              adminSteps.map((action) => {
                                return (
                                  <div className="border rounded mb-2 p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-beetween w-100">
                                      <div className="d-flex align-items-center gap-2">
                                        <i
                                          className="ri-drag-move-2-line fs-24"
                                          style={{ color: "#4A7BA4" }}
                                        ></i>
                                        <h5 className="m-0">{action?.title}</h5>
                                      </div>
                                      <div className="d-flex gap-2 justify-content-end w-25  mt-1">
                                        <img src={Medal} />
                                        {action?.score}
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-end gap-2 w-25">
                                      <i
                                        className="ri-pencil-fill fs-18"
                                        style={{ color: "gray" }}
                                        onClick={() => handleEdit(action)}
                                      ></i>
                                      <i
                                        className="ri-delete-bin-2-line fs-18"
                                        style={{ color: "red" }}
                                        onClick={() => handleDelete(action._id)}
                                      ></i>
                                    </div>
                                  </div>
                                );
                              })}
                          </TabPane>
                        ))}
                      </TabContent>
                    </Form>
                  </CardBody>
                </Card>
              </Col>

              <Col lg={12} className="border rounded p-0 bg-white">
                <Col className="p-3 border  rounded" lg={12}>
                  Manage Resource Links
                </Col>
                <Col className="p-3">
                  {adminResources.map((resource) => {
                    return (
                      <div className="border rounded mb-2 p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i
                            className="ri-drag-move-2-line fs-24"
                            style={{ color: "#4A7BA4" }}
                          ></i>
                          <h5 className="m-0">{resource.title}</h5>
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                          <i
                            className="ri-pencil-fill fs-18"
                            style={{ color: "gray", cursor: "pointer" }}
                            onClick={() => handleResourceEdit(resource)}
                          ></i>
                          <i
                            className="ri-delete-bin-2-line fs-18"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleResourceDelete(resource._id)}
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                  <Modal isOpen={deleteConfirmation2} toggle={cancelDelete2}>
                    <ModalHeader toggle={cancelDelete2}>
                      Confirm Deletion
                    </ModalHeader>
                    <ModalBody>
                      Are you sure you want to delete this category variation?
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

                  <Col xxl={12}>
                    <div>
                      <div className="form-icon right">
                        <Input
                          type="text"
                          value={resourceInput}
                          className="form-control form-control-icon"
                          id="iconrightInput"
                          placeholder="Manage Resource link"
                          onChange={(e) => setResourceInput(e.target.value)}
                        />
                        <i
                          className="ri-add-line cursor-pointer"
                          onClick={handleManageResource}
                        ></i>
                      </div>
                    </div>
                  </Col>
                </Col>
              </Col>
              <Col lg={12} className="d-flex justify-content-between">
                <Col lg={5} className="p-0 ">
                  <Col
                    lg={5}
                    onClick={() => isOpen(!open)}
                    disable
                    className="form-select "
                  >
                    {categorySelectTitle || "Select a Category"}
                  </Col>
                  <div style={{ position: "relative" }}>
                    {open && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey "
                      >
                        {adminCategories.map((item) => {
                          const isChecked =
                            isDataUpdated && item._id === info.categoryId._id;
                          return (
                            <li
                              onClick={() => handleCategoryClick(item)}
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                isChecked || isCategoryClick === item._id
                                  ? {
                                      backgroundColor: "#C3C887",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {item.title}
                            </li>
                          );
                        })}
                      </Col>
                    )}
                  </div>
                </Col>
                <Col lg={6} className="p-0 ">
                  <Col
                    lg={6}
                    onClick={() => setIsCost(!isCost)}
                    disable
                    className="form-select "
                  >
                    {costSelectTitle || "Select a Cost"}
                    <i class="fa fa-window-maximize" aria-hidden="true"></i>
                  </Col>
                  <div style={{ position: "relative" }}>
                    {isCost && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey "
                      >
                        {adminCosts.map((item) => {
                          const isChecked =
                            isDataUpdated && item._id === info.costId._id;
                          return (
                            <li
                              onClick={() => handleCostClick(item)}
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                isChecked || isCostClick === item._id
                                  ? {
                                      backgroundColor: "#C3C887",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {item.title}
                            </li>
                          );
                        })}
                      </Col>
                    )}
                  </div>
                </Col>
              </Col>
              <Col className="d-flex gap-2 mt-2">
                <Col lg={6} className="p-0 ">
                  <Col
                    lg={6}
                    onClick={() => setIsScale(!isScale)}
                    disable
                    className="form-select "
                  >
                    {scaleSelectTitle || "Select a Scale"}
                    <i class="fa fa-window-maximize" aria-hidden="true"></i>
                  </Col>
                  <div style={{ position: "relative" }}>
                    {isScale && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey "
                      >
                        {adminTimeScale.map((item) => {
                          const isChecked =
                            isDataUpdated && item._id === info.timescaleId._id;
                          return (
                            <li
                              onClick={() => handleScaleClick(item)}
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                isChecked || isScaleClick === item._id
                                  ? {
                                      backgroundColor: "#C3C887",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {item.title}
                            </li>
                          );
                        })}
                      </Col>
                    )}
                  </div>
                </Col>
                <Col lg={6} className="p-0 ">
                  <Col
                    lg={6}
                    onClick={() => setIsPotential(!isPotential)}
                    disable
                    className="form-select "
                  >
                    {potentialSelectTitle || "Select a Potential"}
                    <i class="fa fa-window-maximize" aria-hidden="true"></i>
                  </Col>
                  <div style={{ position: "relative" }}>
                    {isPotential && (
                      <Col
                        lg={12}
                        className="p-1 mb-3 border-top-0 border border-grey "
                      >
                        {adminPotential.map((item) => {
                          const isChecked =
                            isDataUpdated && item._id === info.potentialId._id;
                          return (
                            <li
                              onClick={() => handlePotentialClick(item)}
                              className="list-unstyled border border-grey pt-1 pb-1 p-3 rounded d-flex gap-3 fs-5 mb-2"
                              style={
                                isChecked || isPotentialClick === item._id
                                  ? {
                                      backgroundColor: "#C3C887",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {item.title}
                            </li>
                          );
                        })}
                      </Col>
                    )}
                  </div>
                </Col>
              </Col>
              <div className="col-lg-12 d-flex gap-3">
                <div className="hstack gap-2 justify-content-start">
                  <Button className="btn btn-danger p-4 pt-2 pb-2">
                    Cancel
                  </Button>
                </div>
                <div className="hstack gap-2 justify-content-start">
                  <Button
                    className={`p-4 pt-2 pb-2 ${
                      isDataUpdated ? "disabled" : ""
                    }`}
                    color="secondary"
                    onClick={handleSubmit}
                    disabled={isDataUpdated}
                  >
                    Save
                  </Button>
                </div>
                <Button
                  className={`p-4 pt-2 pb-2 ${
                    !isDataUpdated ? "disabled" : ""
                  }`}
                  color="primary"
                  disabled={!isDataUpdated}
                  onClick={() => handleUpdate(info._id)}
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ActionModal;
