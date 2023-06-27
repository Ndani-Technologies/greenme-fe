import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Container,
  Button,
  UncontrolledTooltip,
  Input,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import classnames from "classnames";
import SimpleBar from "simplebar-react";

//Import Icons
import FeatherIcon from "feather-icons-react";
// import PersonalInfo from "./PersonalInfo";

import { chatContactData } from "../../common/data";

import Picker from "emoji-picker-react";

//redux
import { useSelector, useDispatch } from "react-redux";
// import {
//   getDirectContact as onGetDirectContact,
//   getMessages,
//   getChannels as onGetChannels,
//   addMessage as onAddMessage,
//   deleteMessage as onDeleteMessage,
// } from "../../store/actions";

import avatar2 from "../../assets/images/users/avatar-2.jpg";
import userDummyImage from "../../assets/images/users/user-dummy-img.jpg";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  addMessage,
  deleteMessage,
  getChannels,
  getDirectContact,
  getMessages,
  storeChosenChatDetails,
} from "../../slices/thunks";
import {
  getDirectChatHistory,
  sendDirectMessage,
  socketServer,
} from "../../realtimeCommunication/socketConnection";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";
import PersonalInfo from "./PersonalInfo";

const CollaborationChat = () => {
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const dispatch = useDispatch();
  const [isInfoDetails, setIsInfoDetails] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [search_Menu, setsearch_Menu] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [messageBox, setMessageBox] = useState(null);
  const [reply, setreply] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [contactUser, setContactUsers] = useState([]);
  const [isUserOnline, setIsUserOnline] = useState("");
  const loggedInUser = JSON.parse(sessionStorage.getItem("authUser"));

  const { chats, messages, channels, chosenChatDetails, onlineUsers } =
    useSelector((state) => ({
      chats: state.Chat.chats,
      messages: state.Chat.messages,
      channels: state.Chat.channels,
      chosenChatDetails: state.Chat.chosenChatDetails,
      onlineUsers: state.Chat.onlineUsers,
    }));

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  //Info details offcanvas
  const toggleInfo = () => {
    setIsInfoDetails(!isInfoDetails);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  const user = JSON.parse(sessionStorage.getItem("authUser"));

  useEffect(() => {
    fetchAllUsers();

    if (user) {
      dispatch(getDirectContact(user._id)); // get all conversations
      dispatch(getChannels());
      if (chosenChatDetails) {
        dispatch(
          getMessages({
            receiver: chosenChatDetails?.receiver,
            author: user._id,
            conversationId:
              chosenChatDetails?.conversationId &&
              chosenChatDetails?.conversationId !== ""
                ? chosenChatDetails?.conversationId
                : "",
          })
        ); // get messages of active conversation
      }
    }
  }, []);

  useEffect(() => {
    setCurrentMessages(messages);
  }, [messages]);

  const userChatOpen = (selectedChat) => {
    dispatch(
      getMessages({
        receiver: getReceiverInfo(selectedChat)._id,
        author: user._id,
        conversationId: selectedChat._id,
      })
    );
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_USER_URL}user`);
      if (response) {
        let usersData = response.filter(
          (user) => user._id !== loggedInUser._id
        );
        usersData = usersData.map((userData) => {
          const { firstName, lastName, status, roomId } = userData;
          const contact = {
            id: userData.uid,
            name: `${firstName} ${lastName}`,
            status: status || "offline",
            roomId: roomId || null,
          };

          return {
            title: firstName.charAt(0),
            contacts: [contact],
          };
        });
        setContactUsers(usersData);
      }
    } catch (error) {
      toast.error(error?.message ?? "Something Went Wrong");
    }
  };

  useEffect(() => {
    setCurrentMessages(messages);
  }, [messages]);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const id = uuid();
      let temp = {
        content: currentMessage,
        author: {
          _id: user._id,
        },
        date: new Date(),
        receiver: chosenChatDetails?.receiver,
        uuid: id,
      };
      debugger;
      let tempMessages = [...(messages ?? []), temp];
      dispatch(addMessage(tempMessages));
      sendDirectMessage({
        author: chosenChatDetails?.author,
        receiver: chosenChatDetails?.receiver,
        content: currentMessage,
        uuid: id,
      });
      setCurrentMessage("");
    }
  };

  const scrollToBottom = useCallback(() => {
    console.log("scroll", messageBox, messageBox?.scrollHeight);
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 10000;
    }
  }, [messageBox]);

  useEffect(() => {
    const ob = onlineUsers?.includes(chosenChatDetails?.receiver)
      ? "Online"
      : "offline";
    setIsUserOnline(ob);
    if (!isEmpty(messages?.messages)) scrollToBottom();
  }, [messages, scrollToBottom]);
  const onKeyPress = (e) => {
    const { key, value } = e;
    if (key === "Enter") {
      setCurrentMessage(value);
      sendMessage();
    }
  };

  //serach recent user
  const searchUsers = () => {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-user");
    filter = input.value.toUpperCase();
    var userList = document.getElementsByClassName("users-list");
    Array.prototype.forEach.call(userList, function (el) {
      li = el.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    });
  };

  //Search Message
  const searchMessages = () => {
    var searchInput, searchFilter, searchUL, searchLI, a, i, txtValue;
    searchInput = document.getElementById("searchMessage");
    searchFilter = searchInput.value.toUpperCase();
    searchUL = document.getElementById("users-conversation");
    searchLI = searchUL.getElementsByTagName("li");
    Array.prototype.forEach.call(searchLI, function (search) {
      a = search.getElementsByTagName("p")[0]
        ? search.getElementsByTagName("p")[0]
        : "";
      txtValue =
        a.textContent || a.innerText ? a.textContent || a.innerText : "";
      if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
        search.style.display = "";
      } else {
        search.style.display = "none";
      }
    });
  };

  // Copy Message
  const handleCopyMessage = (ele) => {
    var copy = ele
      .closest(".chat-list")
      .querySelector(".ctext-content").innerHTML;
    navigator.clipboard.writeText(copy);

    document.getElementById("copyClipBoard").style.display = "block";
    setTimeout(() => {
      document.getElementById("copyClipBoard").style.display = "none";
    }, 2000);
  };

  const onEmojiClick = (event) => {
    setCurrentMessage((prev) => prev + event.emoji);
  };

  function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function getReceiverInfo(chat) {
    let receiver;
    if (chat.participants[0]._id === user._id) {
      receiver = chat.participants[1];
    } else {
      receiver = chat.participants[0];
    }
    return receiver;
  }

  document.title = "Chat | GreenMe";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="chat-leftsidebar">
              <div className="px-4 pt-4 mb-4">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h5 className="mb-4">Chats</h5>
                  </div>
                  <div className="flex-shrink-0">
                    <UncontrolledTooltip placement="bottom" target="addcontact">
                      Add Contact
                    </UncontrolledTooltip>

                    <Button
                      color=""
                      id="addcontact"
                      className="btn btn-soft-info btn-sm"
                    >
                      <i className="ri-add-line align-bottom"></i>
                    </Button>
                  </div>
                </div>
                <div className="search-box">
                  <input
                    onKeyUp={searchUsers}
                    id="search-user"
                    type="text"
                    className="form-control bg-light border-light"
                    placeholder="Search here..."
                  />
                  <i className="ri-search-2-line search-icon"></i>
                </div>
              </div>

              <Nav
                tabs
                className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3"
              >
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
                    }}
                  >
                    Chats
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                    }}
                  >
                    Contacts
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={customActiveTab} className="text-muted">
                <TabPane tabId="1" id="chats">
                  <SimpleBar
                    className="chat-room-list pt-3"
                    style={{ margin: "-16px 0px 0px" }}
                  >
                    <div className="d-flex align-items-center px-4 mb-2">
                      <div className="flex-grow-1">
                        <h4 className="mb-0 fs-11 text-muted text-uppercase">
                          Direct Messages
                        </h4>
                      </div>
                      <div className="flex-shrink-0">
                        <UncontrolledTooltip
                          placement="bottom"
                          target="addnewmsg"
                        >
                          New Message
                        </UncontrolledTooltip>

                        <button
                          type="button"
                          id="addnewmsg"
                          className="btn btn-soft-info btn-sm"
                        >
                          <i className="ri-add-line align-bottom"></i>
                        </button>
                      </div>
                    </div>

                    <div className="chat-message-list">
                      <ul
                        className="list-unstyled chat-list chat-user-list users-list"
                        id="userList"
                      >
                        {(chats?.conversations || []).map((chat, index) => (
                          <li
                            key={index}
                            className={`active px-3 py-1`}
                            // className={
                            //   currentRoomId === chat.roomId ? "active" : ""
                            // }
                          >
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                scrollToBottom();
                                dispatch(
                                  storeChosenChatDetails({
                                    author: user._id,
                                    receiver: getReceiverInfo(chat)._id,
                                    receiverProfilePicture:
                                      getReceiverInfo(chat).profilePic,
                                    receiverFullName:
                                      getReceiverInfo(chat).firstName +
                                      getReceiverInfo(chat).lastName,
                                  })
                                );
                                userChatOpen(chat);
                              }}
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                                  <div className="avatar-xxs">
                                    {getReceiverInfo(chat).profilePic !== "" ? (
                                      <img
                                        src={getReceiverInfo(chat).profilePic}
                                        className="rounded-circle img-fluid userprofile"
                                        alt=""
                                      />
                                    ) : (
                                      <div
                                        className="avatar-title rounded-circle userprofile"
                                        style={{
                                          backgroundColor:
                                            generateRandomColor(),
                                        }}
                                      >
                                        {getReceiverInfo(chat).firstName.charAt(
                                          0
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <span className="user-status" />
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                  <p className="text-truncate mb-0">
                                    {getReceiverInfo(chat).firstName}
                                    {getReceiverInfo(chat).lastName}
                                  </p>
                                </div>
                                <div className="flex-shrink-0">
                                  <span className="badge badge-soft-dark rounded p-1">
                                    {chat.unreadCount}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="d-flex align-items-center px-4 mt-4 pt-2 mb-2">
                      <div className="flex-grow-1">
                        <h4 className="mb-0 fs-11 text-muted text-uppercase">
                          Channels
                        </h4>
                      </div>
                      <div className="flex-shrink-0">
                        <UncontrolledTooltip
                          placement="bottom"
                          target="createnewmsg"
                        >
                          Create group
                        </UncontrolledTooltip>
                        <Button
                          color=""
                          id="createnewmsg"
                          className="btn btn-soft-info btn-sm"
                        >
                          <i className="ri-add-line align-bottom"></i>
                        </Button>
                      </div>
                    </div>

                    <div className="chat-message-list">
                      <ul
                        className="list-unstyled chat-list chat-user-list mb-0 users-list"
                        id="channelList"
                      >
                        {channels.map((channel, key) => (
                          <React.Fragment key={key}>
                            <li>
                              <Link to="#" className="unread-msg-user">
                                <div className="d-flex align-items-center">
                                  <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                                    <div className="avatar-xxs">
                                      <div className="avatar-title bg-light rounded-circle text-body">
                                        #
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-truncate mb-0">
                                      {channel.name}
                                    </p>
                                  </div>
                                  {channel.unReadMessage && (
                                    <div className="flex-shrink-0">
                                      <span className="badge badge-soft-dark rounded p-1">
                                        {channel.unReadMessage}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </Link>
                            </li>
                          </React.Fragment>
                        ))}
                      </ul>
                    </div>
                  </SimpleBar>
                </TabPane>
                <TabPane tabId="2" id="contacts">
                  <SimpleBar
                    className="chat-room-list pt-3"
                    style={{ margin: "-16px 0px 0px" }}
                  >
                    <div className="sort-contact users-list">
                      {(contactUser || []).map((item, key) => (
                        <div className="mt-3" key={key}>
                          <div className="contact-list-title">{item.title}</div>
                          <ul
                            id={"contact-sort-" + item.title}
                            className="list-unstyled contact-list"
                          >
                            {item.contacts.map((item, key) => (
                              <li key={key}>
                                <div className="d-flex align-items-center">
                                  <div className="flex-shrink-0 me-2">
                                    <div className="avatar-xxs">
                                      {item.image ? (
                                        <img
                                          src={item.image}
                                          className="img-fluid rounded-circle"
                                          alt=""
                                        />
                                      ) : (
                                        <span className="avatar-title rounded-circle bg-primary fs-10">
                                          {item.name.charAt(0) +
                                            item.name
                                              .split(" ")
                                              .slice(-1)
                                              .toString()
                                              .charAt(0)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="flex-grow-1"
                                    onClick={(e) => {
                                      userChatOpen(
                                        item.id,
                                        item.name,
                                        item.status,
                                        item.roomId,
                                        item.image
                                      );
                                    }}
                                  >
                                    <p className="text-truncate contactlist-name mb-0">
                                      {item.name}
                                    </p>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        tag="a"
                                        className="text-muted"
                                      >
                                        <i className="ri-more-2-fill" />
                                      </DropdownToggle>
                                      <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem>
                                          <i className="ri-pencil-line text-muted me-2 align-bottom" />
                                          Edit
                                        </DropdownItem>
                                        <DropdownItem>
                                          <i className="ri-forbid-2-line text-muted me-2 align-bottom" />
                                          Block
                                        </DropdownItem>
                                        <DropdownItem>
                                          <i className="ri-delete-bin-6-line text-muted me-2 align-bottom" />{" "}
                                          Remove
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </SimpleBar>
                </TabPane>
              </TabContent>
            </div>

            <div className="user-chat w-100 overflow-hidden">
              <div className="chat-content d-lg-flex h-100">
                <div className="w-100 overflow-hidden position-relative h-100">
                  {chosenChatDetails ? (
                    <div className="position-relative">
                      <div className="p-3 user-chat-topbar">
                        <Row className="align-items-center">
                          <Col sm={4} xs={8}>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 d-block d-lg-none me-3">
                                <Link
                                  to="#"
                                  className="user-chat-remove fs-18 p-1"
                                >
                                  <i className="ri-arrow-left-s-line align-bottom"></i>
                                </Link>
                              </div>
                              <div className="flex-grow-1 overflow-hidden">
                                <div className="d-flex align-items-center">
                                  <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                    <img
                                      src={
                                        chosenChatDetails?.receiverProfilePicture &&
                                        chosenChatDetails?.receiverProfilePicture !==
                                          ""
                                          ? chosenChatDetails?.receiverProfilePicture
                                          : userDummyImage
                                      }
                                      className="rounded-circle avatar-xs"
                                      alt={`${chosenChatDetails?.receiverFullName}`}
                                    />
                                    <span className="user-status" />
                                  </div>
                                  <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="text-truncate mb-0 fs-16">
                                      <a
                                        className="text-reset username"
                                        data-bs-toggle="offcanvas"
                                        href="#userProfileCanvasExample"
                                        aria-controls="userProfileCanvasExample"
                                      >
                                        {chosenChatDetails?.receiverFullName}
                                      </a>
                                    </h5>
                                    <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                      <small>
                                        {onlineUsers?.includes(
                                          chosenChatDetails.receiver
                                        )
                                          ? "Online"
                                          : "offline"}
                                      </small>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col sm={8} xs={4}>
                            <ul className="list-inline user-chat-nav text-end mb-0">
                              <li className="list-inline-item m-0">
                                <Dropdown
                                  isOpen={search_Menu}
                                  toggle={toggleSearch}
                                >
                                  <DropdownToggle
                                    className="btn btn-ghost-secondary btn-icon"
                                    tag="button"
                                  >
                                    <FeatherIcon
                                      icon="search"
                                      className="icon-sm"
                                    />
                                  </DropdownToggle>
                                  <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-lg">
                                    <div className="p-2">
                                      <div className="search-box">
                                        <Input
                                          onKeyUp={searchMessages}
                                          type="text"
                                          className="form-control bg-light border-light"
                                          placeholder="Search here..."
                                          id="searchMessage"
                                        />
                                        <i className="ri-search-2-line search-icon"></i>
                                      </div>
                                    </div>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>

                              <li className="list-inline-item d-none d-lg-inline-block m-0">
                                <button
                                  type="button"
                                  className="btn btn-ghost-secondary btn-icon"
                                  onClick={toggleInfo}
                                >
                                  <FeatherIcon
                                    icon="info"
                                    className="icon-sm"
                                  />
                                </button>
                              </li>

                              <li className="list-inline-item m-0">
                                <Dropdown
                                  isOpen={settings_Menu}
                                  toggle={toggleSettings}
                                >
                                  <DropdownToggle
                                    className="btn btn-ghost-secondary btn-icon"
                                    tag="button"
                                  >
                                    <FeatherIcon
                                      icon="more-vertical"
                                      className="icon-sm"
                                    />
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      href="#"
                                      className="d-block d-lg-none user-profile-show"
                                    >
                                      <i className="ri-user-2-fill align-bottom text-muted me-2"></i>{" "}
                                      View Profile
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>{" "}
                                      Archive
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      <i className="ri-mic-off-line align-bottom text-muted me-2"></i>{" "}
                                      Muted
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      {" "}
                                      <i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i>{" "}
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>

                      <div className="position-relative" id="users-chat">
                        <PerfectScrollbar
                          className="chat-conversation p-3 p-lg-4"
                          id="chat-conversation"
                          containerRef={(ref) => setMessageBox(ref)}
                          // containerRef={messageBox}
                        >
                          <div id="elmLoader" />
                          <ul
                            className="list-unstyled chat-conversation-list"
                            id="users-conversation"
                          >
                            {currentMessages?.length > 0 &&
                              map(currentMessages, (message, key) => (
                                <li
                                  className={
                                    message.author?._id === user?._id
                                      ? "chat-list right"
                                      : "chat-list left"
                                  }
                                  key={key}
                                >
                                  <div className="conversation-list">
                                    {message.author._id !== user._id && (
                                      <div className="chat-avatar">
                                        <img
                                          src={
                                            chosenChatDetails.receiverProfilePicture &&
                                            chosenChatDetails.receiverProfilePicture !==
                                              ""
                                              ? chosenChatDetails.receiverProfilePicture
                                              : userDummyImage
                                          }
                                          alt=""
                                        />
                                      </div>
                                    )}

                                    <div className="user-chat-content">
                                      <div className="ctext-wrap">
                                        <div className="ctext-wrap-content">
                                          <p className="mb-0 ctext-content">
                                            {message.content}
                                          </p>
                                        </div>
                                        <UncontrolledDropdown className="align-self-start message-box-drop">
                                          <DropdownToggle
                                            href="#"
                                            className="btn nav-btn"
                                            tag="i"
                                          >
                                            <i className="ri-more-2-fill"></i>
                                          </DropdownToggle>
                                          <DropdownMenu>
                                            <DropdownItem
                                              href="#"
                                              className="reply-message"
                                              onClick={() => setreply(message)}
                                            >
                                              <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                              Reply
                                            </DropdownItem>
                                            <DropdownItem href="#">
                                              <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                              Forward
                                            </DropdownItem>
                                            <DropdownItem
                                              href="#"
                                              onClick={(e) =>
                                                handleCopyMessage(e.target)
                                              }
                                            >
                                              <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                              Copy
                                            </DropdownItem>
                                            <DropdownItem href="#">
                                              <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                              Bookmark
                                            </DropdownItem>
                                            <DropdownItem
                                              href="#"
                                              onClick={() => {
                                                dispatch(
                                                  deleteMessage(message._id)
                                                );
                                              }}
                                            >
                                              <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                              Delete
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </UncontrolledDropdown>
                                      </div>
                                      <div className="conversation-name">
                                        <small className="text-muted time">
                                          {moment(message.date)
                                            .subtract(1, "minutes")
                                            .fromNow()}
                                        </small>
                                        <span className="text-success check-message-icon">
                                          {!message?.createdAt ? (
                                            <FeatherIcon
                                              icon="circle"
                                              className="align-bottom"
                                            />
                                          ) : message?.createdAt &&
                                            !message?.read ? (
                                            <FeatherIcon
                                              icon="check"
                                              className="align-bottom"
                                            />
                                          ) : message?.createdAt &&
                                            message?.read ? (
                                            <i className="ri-check-double-line align-bottom" />
                                          ) : null}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </PerfectScrollbar>
                        <div
                          className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                          id="copyClipBoard"
                          role="alert"
                        >
                          Message copied
                        </div>
                        {emojiPicker && (
                          <div
                            className="alert pickerEmoji"
                            style={{ left: "17%", bottom: "-42px" }}
                          >
                            <Picker
                              disableSearchBar={true}
                              onEmojiClick={onEmojiClick}
                            />
                          </div>
                        )}
                      </div>

                      <div className="chat-input-section p-3 p-lg-4">
                        <form id="chatinput-form">
                          <Row className="g-0 align-items-center">
                            <div className="col-auto">
                              <div className="chat-input-links me-2">
                                <div className="links-list-item">
                                  <button
                                    type="button"
                                    className="btn btn-link text-decoration-none emoji-btn"
                                    id="emoji-btn"
                                    onClick={() => setEmojiPicker(!emojiPicker)}
                                  >
                                    <i className="bx bx-smile align-middle" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="col">
                              <div className="chat-input-feedback">
                                Please Enter a Message
                              </div>
                              <input
                                type="text"
                                value={currentMessage}
                                KeyPress={onKeyPress}
                                onChange={(e) =>
                                  setCurrentMessage(e.target.value)
                                }
                                className="form-control chat-input bg-light border-light"
                                id="chat-input"
                                placeholder="Type your message..."
                              />
                            </div>
                            <div className="col-auto">
                              <div className="chat-input-links ms-2">
                                <div className="links-list-item">
                                  <Button
                                    type="submit"
                                    color="info"
                                    onClick={(e) => {
                                      scrollToBottom();
                                      e.preventDefault();
                                      sendMessage();
                                      setEmojiPicker(false);
                                    }}
                                    className="chat-send waves-effect waves-light"
                                  >
                                    <i className="ri-send-plane-2-fill align-bottom"></i>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </form>
                      </div>

                      <div className={reply ? "replyCard show" : "replyCard"}>
                        <Card className="mb-0">
                          <CardBody className="py-3">
                            <div className="replymessage-block mb-0 d-flex align-items-start">
                              <div className="flex-grow-1">
                                <h5 className="conversation-name">
                                  {reply && reply.sender}
                                </h5>
                                <p className="mb-0">{reply && reply.message}</p>
                              </div>
                              <div className="flex-shrink-0">
                                <button
                                  type="button"
                                  id="close_toggle"
                                  className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                  onClick={() => setreply("")}
                                >
                                  <i className="bx bx-x align-middle"></i>
                                </button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <h1>No Chat Selected</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <PersonalInfo
        show={isInfoDetails}
        onCloseClick={() => setIsInfoDetails(false)}
        currentuser={chosenChatDetails}
        isUserOnline={isUserOnline}
        // cuurentiseImg={Chat_Box_Image}
      />
    </React.Fragment>
  );
};

export default CollaborationChat;
