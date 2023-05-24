//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
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
    // Open a popup window to initiate the SSO
    const popup = window.open(
      env.USER_URL + "user/login",
      "",
      "width=500,height=700"
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
    if (resp) {
      sessionStorage.setItem("authUser", JSON.stringify(resp));
      if (env.REACT_APP_DEFAULTAUTH === "fake") {
        var finallogin = JSON.stringify(resp);
        finallogin = JSON.parse(finallogin);
        resp = finallogin.data;
        if (finallogin.status === "success") {
          dispatch(loginSuccess(resp));
          history("/Profile");
        } else {
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(loginSuccess(resp));
        history("/Profile");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const registerUserReal = (history) => async (dispatch) => {
  try {
    const popup = window.open(
      env.USER_URL + "user/signup",
      "",
      "width=500,height=700"
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
    if (resp) {
      sessionStorage.setItem("authUser", JSON.stringify(resp));
      if (env.REACT_APP_DEFAULTAUTH === "fake") {
        var finallogin = JSON.stringify(resp);
        finallogin = JSON.parse(finallogin);
        resp = finallogin.data;
        if (finallogin.status === "success") {
          dispatch(loginSuccess(resp));
          history("/Profile");
        } else {
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(loginSuccess(resp));
        history("/Profile");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
export const updateUser = async (userId, user) => {
  try {
    let resp = await axios.patch(
      process.env.REACT_APP_USER_URL + `user/${userId}`,
      user
    );
    console.log("update user resp", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authUser");

    if (env.REACT_APP_DEFAULTAUTH === "firebase") {
      // let response = await axios.get(
      //   "http://localhost:5000/api/v1/user/logout"
      // );
      let response = await axios.get(
        `${process.env.REACT_APP_USER_URL}user/logout`
      );
      // const response = fireBaseBackend.logout;
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

    if (env.REACT_APP_DEFAULTAUTH === "firebase") {
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
