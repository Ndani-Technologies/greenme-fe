import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Link } from "react-router-dom";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => ({
    user: state.Login.user,
  }));

  const [userName, setUserName] = useState("Dave");
  let obj = JSON.parse(sessionStorage.getItem("authUser"));
  // let obj;
  // useEffect(() => {
  //   if (sessionStorage.getItem("authUser")) {
  //     obj = JSON.parse(sessionStorage.getItem("authUser"));
  //     setUserName(
  //       obj.firstName === undefined || obj.lastName === undefined
  //         ? user.firstName + " " + user.lastName
  //           ? user.firstName + " " + user.lastName
  //           : obj.firstName + " " + obj.lastName
  //         : "Admin" || "Admin"
  //     );
  //   }
  // }, [userName, user]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={obj?.profilePic}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {obj?.firstName} {obj?.lastName}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {obj?.organization}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">
            Welcome {user.firstName} {user.lastName}!
          </h6>
          <DropdownItem className="p-0">
            <Link
              to={process.env.PUBLIC_URL + "/profile"}
              className="dropdown-item"
            >
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle"> User Profile</span>
            </Link>
          </DropdownItem>
          {/* <DropdownItem className="p-0">
            <Link
              to={process.env.PUBLIC_URL + "/apps-chat"}
              className="dropdown-item"
            >
              <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Messages</span>
            </Link>
          </DropdownItem> */}
          {/* <DropdownItem className="p-0">
            <Link to={"#"} className="dropdown-item">
              <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Taskboard</span>
            </Link>
          </DropdownItem> */}
          <div className="dropdown-divider"></div>
          {/* <DropdownItem className='p-0'>
                        <Link to={process.env.PUBLIC_URL + "/pages-profile"} className="dropdown-item">
                            <i
                                className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle">Balance : <b>$5971.67</b></span>
                        </Link>
                    </DropdownItem > */}
          {/* <DropdownItem className="p-0">
            <Link
              to={process.env.PUBLIC_URL + "/pages-profile-settings"}
              className="dropdown-item"
            >
              <span className="badge bg-soft-success text-success mt-1 float-end">
                New
              </span>
              <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Settings</span>
            </Link>
          </DropdownItem> */}
          {/* <DropdownItem className='p-0'>
                        <Link to={process.env.PUBLIC_URL + "/auth-lockscreen-basic"} className="dropdown-item">
                            <i
                                className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span>
                        </Link>
                    </DropdownItem> */}
          <DropdownItem className="p-0">
            <Link
              to={process.env.PUBLIC_URL + "/logout"}
              className="dropdown-item"
            >
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                Logout
              </span>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
