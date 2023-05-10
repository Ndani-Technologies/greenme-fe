import axios from "axios";
import { apiError, userDetailFailure, userDetailSuccess } from "./reducer";

export const getUserDetails = (history) => async (dispatch) => {
  try {
    const resp = await axios.get("http://localhost:5000/api/v1/user/");
    if (resp.success) {
      let data = resp.data;
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
      dispatch(userDetailSuccess(data));
    } else {
      dispatch(userDetailFailure());
    }
  } catch (error) {
    console.error(error);
    dispatch(apiError(error));
  }
};

export const deleteUserDetails = (userId) => async (dispatch, getState) => {
  try {
    const resp = await axios.delete(
      `http://localhost:5000/api/v1/user/${userId}`
    );
    if (resp.success) {
      const userDetail = getState().UserDetail.userDetail;
      // console.log("Current state", userDetail);
      // const updateded = userDetail.filter((elem) => elem._id !== userId);
      //filter:
      // dispatch(userDetailSuccess(updateded));
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
    const resp = await axios.patch(
      `http://localhost:5000/api/v1/user/${user._id}`,
      user
    );
    if (resp.success) {
      console.log("updated users", resp, user);

      const userDetail = getState().UserDetail.userDetail;
      let ob;
      // const updatededData = userDetail.filter((value) => {
      //   console.log("check", value._id, user._id, value._id == user._id);
      //   if (value._id == user._id) {
      //     console.log("here");
      //     return {
      //       name: user.firstName + user?.lastName,
      //       company: user?.organization,
      //       designation: user?.position,
      //       email: user?.email,
      //       phone: user?.phone,
      //       country: user?.country,
      //       last_contacted: user?.last_contacted,
      //       profilePic: user?.profilePic,
      //       state: user?.state,
      //       tags: user.tags,
      //       lead_score: user?.lead_score,
      //       ...value,
      //     };
      //   } else {
      //     return value;
      //   }
      // });
      // console.log("updated store", updatededData);
      // //filter:
      // dispatch(userDetailSuccess(updatededData));
      dispatch(getUserDetails());
    } else {
      dispatch(userDetailFailure());
    }
  } catch (error) {
    console.error(error);
    dispatch(apiError(error));
  }
};
