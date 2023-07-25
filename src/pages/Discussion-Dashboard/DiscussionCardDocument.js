import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { ToastContainer } from "react-toastify";
import SimpleDonutCharts from "../FileManager/FileManagerCharts";
import DeleteModal from "../../Components/Common/DeleteModal";
//redux
import { useSelector, useDispatch } from "react-redux";

//import action
// import {
//   getFolders as onGetFolders,
//   updateFolder as onupdateFolder,
//   deleteFolder as onDeleteFolder,
//   addNewFolder as onAddNewFolder,
//   getFiles as onGetFiles,
//   updateFile as onupdateFile,
//   deleteFile as onDeleteFile,
//   addNewFile as onAddNewFile,
// } from "../../slices/thunks";

import { getFolders } from "../../helpers/fakebackend_helper";
import {
  getFolders as onGetFolders,
  updateFolder as onupdateFolder,
  deleteFolder as onDeleteFolder,
  addNewFolder as onAddNewFolder,
  getFiles as onGetFiles,
  updateFile as onupdateFile,
  deleteFile as onDeleteFile,
  addNewFile as onAddNewFile,
} from "../../slices/fileManager/thunk";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const DiscussionCardDocument = () => {
  document.title = "GreenMe | Document";

  const dispatch = useDispatch();

  const { folders, files } = useSelector((state) => ({
    folders: state.FileManager.folders,
    files: state.FileManager.files,
  }));

  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteAlt, setDeleteAlt] = useState(false);

  // Folders
  const [folder, setFolder] = useState(null);
  const [modalFolder, setModalFolder] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(onGetFolders());
  }, [dispatch]);

  useEffect(() => {
    setFolder(folders);
  }, [folders]);

  const folderToggle = useCallback(() => {
    if (modalFolder) {
      setModalFolder(false);
      setFolder(null);
    } else {
      setModalFolder(true);
    }
  }, [modalFolder]);

  // Update Folder
  const handleFolderClick = useCallback(
    (arg) => {
      const folder = arg;

      setFolder({
        id: folder.id,
        folderName: folder.folderName,
        folderFile: folder.folderFile,
        size: folder.size,
      });

      setIsEdit(true);
      folderToggle();
    },
    [folderToggle]
  );

  // Add Folder
  const handleFolderClicks = () => {
    setFolder("");
    setModalFolder(!modalFolder);
    setIsEdit(false);
    folderToggle();
  };

  // Delete Folder
  const onClickFolderDelete = (folder) => {
    setFolder(folder);
    setDeleteModal(true);
  };

  const handleDeleteFolder = () => {
    if (deleteAlt) {
      if (folder) {
        dispatch(onDeleteFolder(folder));
        setDeleteModal(false);
        setDeleteAlt(false);
      }
    } else {
      if (file) {
        dispatch(onDeleteFile(file));
        setDeleteModal(false);
        sidebarClose("file-detail-show");
      }
    }
  };

  // Files
  const [file, setFile] = useState(null);
  const [modalFile, setModalFile] = useState(false);

  const [fileList, setFileList] = useState(files);

  useEffect(() => {
    dispatch(onGetFiles());
  }, [dispatch]);

  useEffect(() => {
    setFile(files);
    setFileList(files);
  }, [files]);

  const fileToggle = useCallback(() => {
    if (modalFile) {
      setModalFile(false);
      setFile(null);
    } else {
      setModalFile(true);
    }
  }, [modalFile]);

  // Update File
  const handleFileClick = useCallback(
    (arg) => {
      const file = arg;

      setFile({
        id: file.id,
        fileName: file.fileName,
        fileItem: file.fileItem,
        size: file.size,
      });

      setIsEdit(true);
      fileToggle();
    },
    [fileToggle]
  );

  // Add File
  const handleFileClicks = () => {
    setFile("");
    setModalFile(!modalFile);
    setIsEdit(false);
    fileToggle();
  };

  // Delete File
  const onClickFileDelete = (file) => {
    setFile(file);
    setDeleteModal(true);
  };

  const [sidebarData, setSidebarData] = useState("");

  const [filterActive, setFilterActive] = useState("");

  const fileCategory = (e, ele) => {
    setFilterActive(ele);
    const element = document.getElementById("folder-list");
    if (element !== null) {
      element.style.display = "none";
    }
    // document.getElementById("folder-list").style.display = "none";

    setFileList(files.filter((item) => item.fileType === e));
  };

  // SideBar Open
  function sidebarOpen(value) {
    const element = document.getElementsByTagName("body")[0];
    element.classList.add(value);
  }

  // SideBar Close
  function sidebarClose(value) {
    const element = document.getElementsByTagName("body")[0];
    element.classList.remove(value);
  }

  useEffect(() => {
    sidebarOpen("file-detail-show");
  }, []);

  const favouriteBtn = (ele) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };

  const fileSidebar = () => {
    const element = document.getElementById("folder-overview");
    if (element !== null) {
      element.style.didplay = "none";
    }
    // document.getElementById("folder-overview").style.display = null;
    // document.getElementById("file-overview").style.display = null;
  };

  // Folder validation
  const folderValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      folderName: (folder && folder.folderName) || "",
      folderFile: (folder && folder.folderFile) || "",
      size: (folder && folder.size) || "",
    },
    validationSchema: Yup.object({
      folderName: Yup.string().required("Please Enter Folder Name"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateFolder = {
          id: folder ? folder.id : 0,
          folderName: values.folderName,
          folderFile: values.folderFile,
          size: values.size,
        };
        // save edit Folder
        dispatch(onupdateFolder(updateFolder));
        folderValidation.resetForm();
      } else {
        const newFolder = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          folderName: values["folderName"],
          folderFile: "0",
          size: "0",
        };
        // save new Folder
        dispatch(onAddNewFolder(newFolder));
        folderValidation.resetForm();
      }
      folderToggle();
    },
  });

  const dateFormat = () => {
    let d = new Date(),
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
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear()
    ).toString();
  };

  // File validation
  const fileValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      fileName: (file && file.fileName) || "",
      fileItem: (file && file.fileItem) || "",
      size: (file && file.size) || "",
    },
    validationSchema: Yup.object({
      fileName: Yup.string().required("Please Enter File Name"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateFile = {
          id: file ? file.id : 0,
          fileName: values.fileName,
          fileItem: values.fileItem,
          size: values.size,
        };
        // save edit File
        dispatch(onupdateFile(updateFile));
        fileValidation.resetForm();
      } else {
        const newFile = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          fileName: values.fileName + ".txt",
          fileItem: "0",
          icon: "ri-file-text-fill",
          iconClass: "secondary",
          fileType: "Documents",
          size: "0 KB",
          createDate: dateFormat(),
        };
        // save new File
        dispatch(onAddNewFile(newFile));
        fileValidation.resetForm();
      }
      fileToggle();
    },
  });

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteFolder()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content  pt-2">
        <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
          <div className="file-manager-sidebar">
            <div className="p-3 d-flex flex-column h-100">
              <div className="mb-3">
                <h5 className="mb-0 fw-semibold">My Drive</h5>
              </div>
              <div className="search-box">
                <input
                  type="text"
                  className="form-control bg-light border-light"
                  placeholder="Search here..."
                />
                <i className="ri-search-2-line search-icon"></i>
              </div>
              <SimpleBar className="mt-3 mx-n4 px-4 file-menu-sidebar-scroll">
                <ul className="list-unstyled file-manager-menu">
                  <li>
                    <a
                      href="#!"
                      className={filterActive === "Documents" ? "active" : ""}
                      onClick={() => fileCategory("Documents", "Documents")}
                    >
                      <i className="ri-file-list-2-line align-bottom me-2"></i>{" "}
                      <span className="file-list-link">Documents</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={filterActive === "Media" ? "active" : ""}
                      onClick={() => fileCategory("Media", "Media")}
                    >
                      <i className="ri-image-2-line align-bottom me-2"></i>{" "}
                      <span className="file-list-link">Media</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={filterActive === "Recents" ? "active" : ""}
                      onClick={() => fileCategory("Media", "Recents")}
                    >
                      <i className="ri-history-line align-bottom me-2"></i>{" "}
                      <span className="file-list-link">Recents</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={filterActive === "Important" ? "active" : ""}
                      onClick={() => fileCategory("Documents", "Important")}
                    >
                      <i className="ri-star-line align-bottom me-2"></i>{" "}
                      <span className="file-list-link">Important</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={filterActive === "Deleted" ? "active" : ""}
                      onClick={() => fileCategory("Deleted", "Deleted")}
                    >
                      <i className="ri-delete-bin-line align-bottom me-2"></i>{" "}
                      <span className="file-list-link">Deleted</span>
                    </a>
                  </li>
                </ul>
              </SimpleBar>
            </div>
          </div>
          <div lg={10} className="file-manager-content w-100 p-3 py-0">
            <SimpleBar className="mx-n3 pt-4 px-4 file-manager-content-scroll">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <h5 className="flex-grow-1 fs-16 mb-0" id="filetype-title">
                    Recent File
                  </h5>
                  <div className="flex-shrink-0">
                    <button
                      className="btn btn-light createFile-modal text-info"
                      // onClick={() => handleFileClicks()}
                    >
                      Export Report
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-middle table-nowrap mb-0">
                    <thead className="table-active">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">File Item</th>
                        <th scope="col">File Size</th>
                        <th scope="col">Recent Date</th>
                        <th scope="col" className="text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody id="file-list">
                      {(fileList || []).map((item, key) => (
                        <tr key={key}>
                          <td>
                            <input
                              className="form-control filelist-id"
                              type="hidden"
                              value="1"
                              id="filelist-1"
                            />
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 fs-17 me-2 filelist-icon">
                                <i
                                  className={
                                    item.icon +
                                    " text-" +
                                    item.iconClass +
                                    " align-bottom"
                                  }
                                />
                              </div>
                              <div className="flex-grow-1 filelist-name">
                                {item.fileName}
                              </div>
                              <div className="d-none filelist-type">
                                {" "}
                                {item.fileType}{" "}
                              </div>
                            </div>
                          </td>
                          <td>{item.fileItem}</td>
                          <td className="filelist-size">{item.size}</td>
                          <td className="filelist-create">{item.createDate}</td>
                          <td>
                            <div className="d-flex gap-3 justify-content-center">
                              <button
                                type="button"
                                className="btn btn-ghost-primary btn-icon btn-sm favourite-btn"
                                onClick={(e) => favouriteBtn(e.target)}
                              >
                                <i className="ri-star-fill fs-13 align-bottom" />
                              </button>

                              <UncontrolledDropdown dir="start">
                                <DropdownToggle
                                  tag="button"
                                  className="btn btn-light btn-icon btn-sm dropdown"
                                  id="dropdownMenuButton"
                                >
                                  <i className="ri-more-fill align-bottom" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem
                                    className="viewfile-list"
                                    onClick={() => {
                                      setSidebarData(item);
                                      fileSidebar();
                                      sidebarOpen("file-detail-show");
                                    }}
                                  >
                                    View
                                  </DropdownItem>
                                  <DropdownItem
                                    className="edit-list"
                                    onClick={() => handleFileClick(item)}
                                  >
                                    Rename
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem
                                    className="remove-list"
                                    onClick={() => onClickFileDelete(item)}
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ul id="pagination" className="pagination pagination-lg"></ul>

                <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                  <div className="col-sm">
                    <div className="text-muted">
                      Showing<span className="fw-semibold"> 5</span> of{" "}
                      <span className="fw-semibold">25</span> Results
                    </div>
                  </div>
                  <div className="col-sm-auto">
                    <ul className="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
                      <li className="page-item disabled">
                        <Link to="#" className="page-link">
                          ←
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link to="#" className="page-link">
                          1
                        </Link>
                      </li>
                      <li className="page-item active">
                        <Link to="#" className="page-link">
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link to="#" className="page-link">
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link to="#" className="page-link">
                          →
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SimpleBar>
          </div>
        </div>

        {/* Folder Modal */}
        <Modal
          className="fade zoomIn"
          isOpen={modalFolder}
          toggle={() => setModalFolder(!modalFolder)}
          id="createFolderModal"
          modalClassName="zoomIn"
          centered
          tabIndex="-1"
        >
          <ModalHeader
            className="p-3 bg-soft-success"
            id="createFolderModalLabel"
            toggle={() => setModalFolder(!modalFolder)}
          >
            {" "}
            {isEdit ? "Folder Rename" : "Create Folder"}{" "}
          </ModalHeader>
          <ModalBody>
            <form
              autoComplete="off"
              className="needs-validation createfolder-form"
              id="createfolder-form"
              noValidate=""
              onSubmit={(e) => {
                e.preventDefault();
                folderValidation.handleSubmit();
                return false;
              }}
            >
              <div className="mb-4">
                <label htmlFor="foldername-input" className="form-label">
                  Folder Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="foldername-input"
                  name="folderName"
                  placeholder="Enter folder name"
                  // validate={{
                  //     required: { value: true },
                  // }}
                  onChange={folderValidation.handleChange}
                  onBlur={folderValidation.handleBlur}
                  value={folderValidation.values.folderName || ""}
                  // invalid={folderValidation.touched.folderName && folderValidation.errors.folderName ? true : false}
                />
                {folderValidation.touched.folderName &&
                folderValidation.errors.folderName ? (
                  <FormFeedback type="invalid">
                    {folderValidation.errors.folderName}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-ghost-success"
                  onClick={() => setModalFolder(false)}
                >
                  <i className="ri-close-line align-bottom"></i> Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="addNewFolder"
                >
                  {isEdit ? "Save" : "Add Folder"}
                </button>
              </div>
            </form>
          </ModalBody>
        </Modal>

        {/* File Modal */}
        <Modal
          id="createFileModal"
          isOpen={modalFile}
          toggle={fileToggle}
          modalClassName="zoomIn"
          centered
          tabIndex="-1"
        >
          <ModalHeader toggle={fileToggle} className="p-3 bg-soft-success">
            {!!isEdit ? "File Rename" : "Create File"}
          </ModalHeader>
          <ModalBody>
            <form
              className="needs-validation createfile-form"
              id="createfile-form"
              onSubmit={(e) => {
                e.preventDefault();
                fileValidation.handleSubmit();
                return false;
              }}
            >
              <div className="mb-4">
                <label htmlFor="filename-input" className="form-label">
                  File Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="filename-input"
                  name="fileName"
                  placeholder="Enter file name"
                  // validate={{
                  //     required: { value: true },
                  // }}
                  onChange={fileValidation.handleChange}
                  onBlur={fileValidation.handleBlur}
                  value={fileValidation.values.fileName || ""}
                  // invalid={fileValidation.touched.fileName && fileValidation.errors.fileName ? true : false}
                />
                {fileValidation.touched.fileName &&
                fileValidation.errors.fileName ? (
                  <FormFeedback type="invalid">
                    {fileValidation.errors.fileName}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-ghost-success"
                  onClick={() => setModalFile(false)}
                >
                  <i className="ri-close-line align-bottom"></i> Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="addNewFile"
                >
                  {!!isEdit ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default DiscussionCardDocument;
