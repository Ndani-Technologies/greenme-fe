import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  deleteAdminTimeScale,
  updateAdminTimeScale,
  createAdminTimeScale,
  createAdminCosts,
  updateAdminCosts,
  deleteAdminCosts,
  deleteAdminPotential,
  createAdminPotential,
  updateAdminPotential,
  createAdminStatus,
  updateAdminStatus,
  deleteAdminStatus,
  createAdminRelationships,
  updateAdminRelationships,
  deleteAdminRelationships,
  createAdminCategories,
  updateAdminCategories,
  deleteAdminCategories,
} from "../../../slices/thunks";

const CategoryModal = ({
  modals_grid,
  setmodals_grid,
  setData,
  data,
  Title,
  FieldName,
  Edit,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const handleClick = (language) => {
    setSelectedLanguage(language);
  };

  const [editingDataId, setEditingDataId] = useState(null);
  const [inputField, setInputField] = useState("");

  const handleAdd = () => {
    const newDataTitle = inputField;
    if (newDataTitle) {
      const newData = {
        title: newDataTitle,
      };
      if (Title === "Manage Scale") {
        createAdminTimeScale(newData)
          .then((resp) => {
            toast.success("Successfully Added Scale");

            setData([...data, resp]);
          })
          .catch((err) => {
            toast.error("Unable to Update");
          });
      } else if (Title === "Manage Costs") {
        createAdminCosts(newData)
          .then((resp) => {
            toast.success("Successfully Added Costs");

            setData([...data, resp]);
          })
          .catch((err) => {
            toast.error("Unable to Update");
          });
      } else if (Title === "Manage Potential") {
        createAdminPotential(newData)
          .then((resp) => {
            toast.success("Successfully Added Potential");

            setData([...data, resp]);
          })
          .catch((err) => {
            toast.error("Unable to Update");
          });
      } else if (Title === "Manage Status") {
        createAdminStatus(newData)
          .then((resp) => {
            toast.success("Successfully Added Status");

            setData([...data, resp]);
          })
          .catch((err) => {
            toast.error("Unable to Update");
          });
      } else if (Title === "Manage Answer Relationship") {
        createAdminRelationships(newData)
          .then((resp) => {
            toast.success("Successfully Added Relation");

            setData([...data, resp]);
          })
          .catch((err) => {
            toast.error("Unable to Update");
          });
      } else if (Title === "Manage Categories") {
        createAdminCategories(newData)
          .then((resp) => {
            toast.success("Successfully Added Category");

            setData([...data, resp]);
          })
          .catch((err) => {
            toast.error("Unable to Update");
          });
      }
      setInputField("");
    }
  };

  const handleEdit = (dataId) => {
    setEditingDataId(dataId);
    const data_value = data.find((c) => {
      return c._id === dataId; // Add return statement here
    });
    setInputField(data_value?.title);
  };

  const handleUpdate = () => {
    const updateData = (updateFunction, successMessage) => {
      updateFunction(editingDataId, mappedData)
        .then((resp) => {
          const updatedData = data.map((c) => {
            if (c._id === editingDataId) {
              return { ...c, title: updatedDataName };
            }
            return c;
          });
          toast.success(successMessage);
          setData(updatedData);
        })
        .catch((err) => {
          toast.error("Unable to Update");
        });
    };

    const mappedData = {
      title: inputField,
    };

    if (Title === "Manage Scale") {
      updateData(updateAdminTimeScale, "Successfully Updated Scale");
    } else if (Title === "Manage Costs") {
      updateData(updateAdminCosts, "Successfully Updated Cost");
    } else if (Title === "Manage Potential") {
      updateData(updateAdminPotential, "Successfully Updated Potential");
    } else if (Title === "Manage Status") {
      updateData(updateAdminStatus, "Successfully Updated Status");
    } else if (Title === "Manage Answer Relationship") {
      updateData(updateAdminRelationships, "Successfully Updated Relation");
    } else if (Title === "Manage Categories") {
      updateData(updateAdminCategories, "Successfully Updated Category");
    }

    setEditingDataId(null);
    setInputField("");
  };

  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirmation2(true);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(Answers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAnswers(items);
  };
  const handleDragEnds = (result) => {
    if (!result.destination) {
      return;
    }

    const newData = [...data];
    const draggedCategory = newData[result.source.index];

    newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, draggedCategory);

    setData(newData);
  };
  const [deleteConfirmation2, setDeleteConfirmation2] = useState(false);

  const confirmDelete2 = () => {
    const deleteData = (deleteFunction, deleteMessage) => {
      deleteFunction(deleteId)
        .then((resp) => {
          const updatedData = data.filter((c) => c._id !== deleteId);
          setData(updatedData);
          toast.success(deleteMessage);
        })
        .catch((err) => toast.error("err in deleting category"));
    };

    if (Title === "Manage Scale") {
      deleteData(deleteAdminTimeScale, "Successfully Deleted Scale");
    } else if (Title === "Manage Costs") {
      deleteData(deleteAdminCosts, "Successfully Deleted Cost");
    } else if (Title === "Manage Potential") {
      deleteData(deleteAdminPotential, "Successfully Deleted Potential");
    } else if (Title === "Manage Status") {
      deleteData(deleteAdminStatus, "Successfully Deleted Status");
    } else if (Title === "Manage Answer Relationship") {
      deleteData(deleteAdminRelationships, "Successfully Deleted Relation");
    } else if (Title === "Manage Categories") {
      deleteData(deleteAdminCategories, "Successfully Deleted Category");
    }

    setDeleteConfirmation2(false);
    setDeleteId(null);
  };

  const cancelDelete2 = () => {
    setDeleteConfirmation2(false);
    setDeleteId(null);
  };

  return (
    <Modal
      size="lg p-5"
      className="postion-relative"
      isOpen={modals_grid}
      toggle={() => {
        tog_grids();
      }}
    >
      <div
        className="postion-absolute top-0 start-0 translate-middle bg-white rounded-circle d-flex justify-content-center align-items-center shadow-lg bg-body rounded"
        style={{ width: "35px", height: "35px" }}
      >
        <Button
          type="button"
          onClick={() => {
            setmodals_grid(false);
          }}
          className="btn-close color-black bg-white border border-dark rounded-circle "
          aria-label="close"
        ></Button>
      </div>
      <ModalHeader className="border-bottom border-dark p-4 pt-0">
        <h4 className="modal-title">{Title}</h4>
      </ModalHeader>
      <ModalBody>
        <form className="p-4 pt-2 pb-2" action="#">
          <div className="row g-3">
            <Col lg={12} className="border p-2">
              Language Selector:
              <div className="d-flex gap-2 pt-2">
                <Button
                  onClick={() => handleClick("ENGLISH")}
                  style={
                    selectedLanguage === "ENGLISH"
                      ? { backgroundColor: "#4A7BA4" }
                      : {
                          backgroundColor: "#E9EBEC",
                          border: "none",
                          color: "#9DB1C7",
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
                          color: "#9DB1C7",
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
                          color: "#9DB1C7",
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
                          color: "#9DB1C7",
                        }
                  }
                >
                  ARABIC
                </Button>
                <Button
                  onClick={() => handleClick("GERMAN")}
                  style={
                    selectedLanguage === "GERMAN"
                      ? { backgroundColor: "#4A7BA4" }
                      : {
                          backgroundColor: "#E9EBEC",
                          border: "none",
                          color: "#9DB1C7",
                        }
                  }
                >
                  GERMAN
                </Button>
                <Button
                  onClick={() => handleClick("ITALIAN")}
                  style={
                    selectedLanguage === "ITALIAN"
                      ? { backgroundColor: "#4A7BA4" }
                      : {
                          backgroundColor: "#E9EBEC",
                          color: "#9DB1C7",
                          border: "none",
                        }
                  }
                >
                  ITALIAN
                </Button>
              </div>
            </Col>
            <DragDropContext onDragEnd={handleDragEnds}>
              <Col lg={12} className="border p-3 rounded bg-white">
                {FieldName}
              </Col>
              <Droppable droppableId="data">
                {(provided) => (
                  <div
                    className="mt-0 p-0"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {data &&
                      data.map((data_value, index) => (
                        <Draggable
                          key={data_value._id}
                          draggableId={data_value._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              key={data_value._id}
                              className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <div className="d-flex align-items-center  gap-2">
                                <i
                                  className="ri-drag-move-2-line fs-24"
                                  style={{ color: "#4A7BA4" }}
                                ></i>
                                <h5 className="m-0">{data_value.title}</h5>
                              </div>
                              <div className="d-flex justify-content-end gap-2">
                                <i
                                  className="ri-pencil-fill fs-18"
                                  style={{ color: "gray" }}
                                  onClick={() => handleEdit(data_value._id)}
                                ></i>
                                <i
                                  className="ri-delete-bin-2-line fs-18"
                                  style={{ color: "red" }}
                                  onClick={() => handleDelete(data_value._id)}
                                ></i>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
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
                        <Input
                          type="text"
                          className="form-control mt-2"
                          id="firstName"
                          placeholder={Edit}
                          onChange={(e) => setInputField(e.target.value)}
                          value={inputField}
                        />
                      </div>
                    </Col>
                    <div className="d-flex gap-3 col-lg-12 mt-3">
                      <div className="d-flex gap-2">
                        <Button color="primary" onClick={handleUpdate}>
                          Update Category
                        </Button>
                        <Button color="primary" onClick={handleAdd}>
                          Add new item to list
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CategoryModal;
