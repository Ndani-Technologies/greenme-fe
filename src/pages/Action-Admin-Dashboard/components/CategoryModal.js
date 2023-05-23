import React, { useState } from "react";
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

const CategoryModal = ({
  modals_grid,
  setmodals_grid,
  setCategories,
  categories,
  Title,
  FieldName,
  Edit,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const handleClick = (language) => {
    setSelectedLanguage(language);
  };
  //   const [categories, setCategories] = useState(data);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [inputField, setInputField] = useState("");

  const handleAdd = () => {
    const newCategoryName = inputField;
    if (newCategoryName) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
      };
      setCategories([newCategory, ...categories]);
      setInputField("");
    }
  };
  const handleEdit = (categoryId) => {
    setEditingCategoryId(categoryId);
    const category = categories.find((c) => c.id === categoryId);
    setInputField(category.name);
  };

  const handleUpdate = () => {
    const updatedCategoryName = inputField;
    const updatedCategories = categories.map((c) => {
      if (c.id === editingCategoryId) {
        return { ...c, name: updatedCategoryName };
      }
      return c;
    });
    setCategories(updatedCategories);
    setEditingCategoryId(null);
    setInputField("");
  };
  const [updCategories, setUpdCategories] = useState();
  const handleDelete = (categoryId) => {
    const updatedCategories = categories.filter((c) => c.id !== categoryId);
    console.log("upda", updatedCategories);
    setUpdCategories(updatedCategories);
    setDeleteConfirmation2(true);
    // setCategories(updatedCategories);
    // setUpdCategories(updatedCategories);
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

    const newCategories = [...categories];
    const draggedCategory = newCategories[result.source.index];

    newCategories.splice(result.source.index, 1);
    newCategories.splice(result.destination.index, 0, draggedCategory);

    setCategories(newCategories);
  };
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteConfirmation2, setDeleteConfirmation2] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = (AnswerId, id) => {
    // TODO: implement deletion logic using `deleteId`
    // setCategories(updCategories);

    setAnswers(updAnswers);
    setDeleteConfirmation(false);
    // setUpdAnswers([]);
    // setUpdCategories([]);
    setDeleteId(null);
  };
  const confirmDelete2 = (AnswerId, id) => {
    setCategories(updCategories);
    setDeleteConfirmation2(false);
    // setUpdAnswers([]);
    // setUpdCategories([]);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setDeleteId(null);
  };
  const cancelDelete2 = () => {
    setDeleteConfirmation(false);
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
              <Droppable droppableId="categories">
                {(provided) => (
                  <div
                    className="mt-0 p-0"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {categories &&
                      categories.map((category, index) => (
                        <Draggable
                          key={category.id}
                          draggableId={category.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              key={category.id}
                              className="border p-3 pt-1 pb-1 bg-white d-flex justify-content-between align-items-center"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <i
                                  className="ri-drag-move-2-line fs-24"
                                  style={{ color: "#4A7BA4" }}
                                ></i>
                                <h5 className="m-0">{category.name}</h5>
                              </div>
                              <div className="d-flex justify-content-end gap-2">
                                <i
                                  className="ri-pencil-fill fs-18"
                                  style={{ color: "gray" }}
                                  onClick={() => handleEdit(category.id)}
                                ></i>
                                <i
                                  className="ri-delete-bin-2-line fs-18"
                                  style={{ color: "red" }}
                                  onClick={() => handleDelete(category.id)}
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
