import axios from "axios";
import { apiError, userDetailFailure, userDetailSuccess } from "./reducer";
export const getUserDetails = async () => {
  try {
    // const resp = await axios.get("http://localhost:5000/api/v1/user/");
    const resp = await axios.get(process.env.REACT_APP_USER_URL + "user");
    // if (resp.success) {
    let data = resp;
    console.log("response post", data);
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
    // dispatch(userDetailSuccess(data));
    // } else {
    //   dispatch(userDetailFailure());
    // }
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserDetails = (userId) => async (dispatch, getState) => {
  try {
    // const resp = await axios.delete(
    //   `http://localhost:5000/api/v1/user/${userId}`
    // );
    const resp = await axios.delete(
      `${process.env.REACT_APP_USER_URL}user/${userId}`
    );
    if (resp.success) {
      const userDetail = getState().UserDetail.userDetail;
      // console.log("Current state", userDetail);
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
    // console.log("for replace data", _id, user);
    // const resp = await axios.patch(
    //   `http://localhost:5000/api/v1/user/${user._id}`,
    //   user
    // );
    const resp = await axios.delete(
      `${process.env.REACT_APP_USER_URL}user/${user._Id}`
    );
    if (resp.success) {
      console.log("updated users", resp, user);

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
