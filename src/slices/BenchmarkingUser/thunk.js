export const getAllBenchmarks = () => async (dispatch, getState) => {
  try {
    // Open a popup window to initiate the SSO process
    let resp = await axios.get(env.URL + `user/${userId}`, user);

    console.log("resp", resp);
    if (resp.success) {
      const { data } = resp;
      console.log("user updated", data);
      // const currentState = getState().Login.user
    }
  } catch (error) {
    console.error(error);
  }
};
