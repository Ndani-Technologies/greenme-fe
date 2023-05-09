//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import env from "react-dotenv";
import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";

import axios from "axios";
import { api } from "../../../config";

const fireBaseBackend = getFirebaseBackend();

export const loginUserReal = (history) => async (dispatch) => {
  try {
    // Open a popup window to initiate the SSO process
    console.log("url", env.BACKEND_URL + " user/login");

    const popup = window.open(
      env.USER_URL + "/user/login",
      "",
      "width=500,height=500"
    );
    const messagePromise = new Promise((resolve, reject) => {
      window.addEventListener("message", (event) => {
        console.log("event", event);

        if (event.origin !== env.BASE_URL) return;

        resolve(event.data);

        popup.close();
      });
    });
    const resp = await messagePromise;
    console.log("resp", resp);
    if (resp) {
      sessionStorage.setItem("authUser", JSON.stringify(resp));
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        var finallogin = JSON.stringify(resp);
        finallogin = JSON.parse(finallogin);
        resp = finallogin.data;
        if (finallogin.status === "success") {
          dispatch(loginSuccess(resp));
          console.log("response ", resp);
          history("/Profile");
        } else {
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(loginSuccess(resp));
        console.log("response 1", resp);
        history("/Profile");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = (user, history) => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      let fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.loginUser(user.email, user.password);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = postJwtLogin({
        email: user.email,
        password: user.password,
      });
    } else if (process.env.REACT_APP_API_URL) {
      response = postFakeLogin({
        email: user.email,
        password: user.password,
      });
    }

    var data = await response;

    if (data) {
      sessionStorage.setItem("authUser", JSON.stringify(data));
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        var finallogin = JSON.stringify(data);
        finallogin = JSON.parse(finallogin);
        data = finallogin.data;
        if (finallogin.status === "success") {
          dispatch(loginSuccess(data));
          history("/dashboard");
        } else {
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(loginSuccess(data));
        history("/dashboard");
      }
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (data, history, type) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(data, type);
    } else {
      response = postSocialLogin(data);
    }

    const socialdata = await response;

    if (socialdata) {
      sessionStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      history("/dashboard");
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
