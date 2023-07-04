import axios from "axios";
import { apiError, userDetailFailure, userDetailSuccess } from "./reducer";

export const getAllUsers = async () => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_USER_URL}user`);
    return resp;
  } catch (error) {
    console.log(error, "Unable to get Users");
  }
};

export const getUserDetails = async () => {
  try {
    // const resp = await axios.get("http://localhost:5000/api/v1/user/");
    const resp = await axios.get(process.env.REACT_APP_USER_URL + "user");
    // if (resp.success) {
    let data = resp;
    data = data.map((value) => {
      return {
        _id: value?._id,
        name: value?.firstName + " " + value?.lastName,
        company: value?.organization,
        designation: value?.position,
        email: value?.email,
        phone: value?.phone,
        country: value?.country,
        last_contacted: value?.updatedAt,
        image_src: value?.profilePic,
        state: value?.state,
        ...value,
      };
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserDetails = (userId) => async (dispatch, getState) => {
  try {
    const resp = await axios.delete(
      `${process.env.REACT_APP_USER_URL}user/${userId}`
    );
    if (resp.success) {
      const userDetail = getState().UserDetail.userDetail;
      const updateded = userDetail.filter((elem) => elem._id !== userId);
      //filter:
      dispatch(userDetailSuccess(updateded));
    } else {
      dispatch(userDetailFailure());
    }
  } catch (error) {
    console.error(error);
    dispatch(apiError(error));
  }
};

export const updatedUserDetails = (user) => async (dispatch, getState) => {
  try {
    const { _id } = user;
    const resp = await axios.delete(
      `${process.env.REACT_APP_USER_URL}user/${user._Id}`
    );
    if (resp.success) {
      const userDetail = getState().UserDetail.userDetail;
      let ob;
      dispatch(userDetailSuccess());
    } else {
      dispatch(userDetailFailure());
    }
  } catch (error) {
    console.error(error);
    dispatch(apiError(error));
  }
};
