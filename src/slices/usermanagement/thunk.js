import axios from "axios";
import { apiError, userDetailFailure, userDetailSuccess } from "./reducer";

export const getUserDetails = (history) => async (dispatch) => {
  try {
    const resp = await axios.get("http://localhost:5000/api/v1/user/");
    if (resp.success) {
      let data = resp.data;
      data = data.map((value) => {
        return {
          _id: value?._id,
          name: value?.firstName + value?.lastName,
          company: value?.organization,
          designation: value?.designation,
          email: value?.email,
          phone: value?.phone,
          lead_score: value?.lead_score,
          last_contacted: value?.updatedAt,
          image_src: value?.profilePic,
          tags: value?.state,
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
  console.log("userId", userId, `http://localhost:5000/api/v1/user/${userId}`);
  try {
    const resp = await axios.delete(
      `http://localhost:5000/api/v1/user/${userId}`
    );
    if (resp.success) {
      console.log("deleted user", resp);
    } else {
      dispatch(userDetailFailure());
    }
  } catch (error) {
    console.error(error);
    dispatch(apiError(error));
  }
};
