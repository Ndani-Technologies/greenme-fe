import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../Components/Common/withRouter";

const Logout = (props) => {
  const dispatch = useDispatch();

  const { isUserLogout } = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  function clearCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

  useEffect(() => {
    dispatch(logoutUser());
    sessionStorage.removeItem("authUser"); // Remove the authUser item from sessionStorage
    clearCookies();
    console.log(sessionStorage.getItem("authUser"), "SESSION");
    console.log(document.cookie.split(";"), "cookie");
  }, [dispatch]);

  if (isUserLogout) {
    sessionStorage.removeItem("authUser");
    clearCookies();
    return <Navigate to="/login" />;
  }

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
