import axios from "axios";
import { benchmarkSuccess } from "./reducer";
import { toast } from "react-toastify";
import { addBenchmarkApi } from "../../helpers/Benchmark_helper/benchmark_user_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllBenchmarks = async () => {
  try {
    const obj = JSON.parse(sessionStorage.getItem("authUser"));
    let resp = await axios.get(
      `${process.env.REACT_APP_BENCHMARK_URL}/getBenchmarksById/${obj._id}`
    );
    let data;
    data = resp.map((value) => {
      return {
        title: value?.title,
        status: value?.status,
        completion_level: value?.completionLevel,
        country: value?.country,
        start_date: value?.start_date,
        end_data: value?.end_date,
        ...value,
      };
    });
    console.log("benchmark get all", data);
    return data;
    // dispatch(benchmarkSuccess(data))
  } catch (error) {
    console.error(error);
  }
};
export const getSingleBenchmark = async (id) => {
  let resp = await axios.get(`${process.env.REACT_APP_BENCHMARK_URL}/${id}`);
  // let resp = await axios.get(process.env.REACT_APP_BENCHMARK_URL);
  console.log("benchmark get single", resp && resp);
  return resp;
};

export const getUserProgress = async (id) => {
  let resp = await axios.get(
    `${process.env.REACT_APP_BENCHMARK_URL}/percentage/percentageOfBenchmarks/${id}`
  );
  console.log(resp, "user percentage");
  return resp;
};

export const updateUserResp =
  (id, user_resp, history) => async (dispatch, getState) => {
    // let resp = await axios.patch(
    //   `https://backend.greenme.fleetforum.org/api/v1/bench/benchmarking/user_resp_submit/${id}`,
    //   { user_resp }
    // );
    let resp = await axios.patch(
      `${process.env.REACT_APP_BENCHMARK_URL}/user_resp_submit/${id}`,
      { user_resp }
    );
    console.log("benchmark  user_resp_update", resp);
    if (resp) history("/benchmarking");
  };

export const updateUserRespSave =
  (id, user_resp, history) => async (dispatch, getState) => {
    // let resp = await axios.patch(
    //   `https://backend.greenme.fleetforum.org/api/v1/bench/benchmarking/user_resp_save/${id}`,

    //   { user_resp }
    // );
    let resp = await axios.patch(
      `${process.env.REACT_APP_BENCHMARK_URL}/user_resp_save/${id}`,
      { user_resp }
    );

    console.log("benchmark  user_resp_update", resp);
    if (resp) history("/benchmarking");
  };

export const addBenchmark = async (benchmark) => {
  let resp;
  try {
    // let user = getState().Login.user
    let user = JSON.parse(sessionStorage.getItem("authUser"));
    let { _id } = user;
    let mapData = {
      title: benchmark.title,
      country: benchmark.country,
      userId: _id,
    };
    resp = await axios.post(process.env.REACT_APP_BENCHMARK_URL, mapData);
    // resp = await axios.post("http://localhost:5001/api/v1/benchmarking", mapData);
    console.log("benchmark add", mapData, resp);
    if (resp) {
      resp = {
        completion_level: resp?.completionLevel,
        ...resp,
      };
      // let data  = getAllBenchmarks()
      return resp;
    } else {
      toast.error(resp.message, { autoClose: 3000 });
    }
  } catch (err) {
    console.log(err);
    toast.error(err, { autoClose: 3000 });
  }
};

export const getSummaryBenchmarking = async (id) => {
  let resp = await axios.get(
    `${process.env.REACT_APP_BENCHMARK_URL}/summary/${id}`
  );
  // let resp = await axios.patch(`${process.env.REACT_APP_BENCHMARK_URL}/${id}`, { user_resp });

  console.log("benchmark getSummary", resp);
  return resp;
};

//admin
export const getAllQA = async () => {
  try {
    let resp = await axios.get(process.env.REACT_APP_QUESTION_URL);

    let data;
    data = resp.map((value) => {
      return {
        ...value,
        response: 0,
        answered: value.whoHasAnswer?.totalUsers,
        category: value?.category?.titleEng,
        status: value?.status ? "active" : "In-active",
        visibility: value?.visibility ? "True" : "False",
      };
    });
    console.log("QA get all", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllAnswers = async () => {
  try {
    // let resp = await axios.get("http://localhost:5001/api/v1/answer");
    let resp = await axios.get(process.env.REACT_APP_ANSWER_URL);

    console.log("get all answers", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const addAnswer = async (data) => {
  try {
    // let resp = await axios.post("http://localhost:5001/api/v1/answer", data);
    let resp = await axios.post(process.env.REACT_APP_ANSWER_URL, data);
    console.log("add answers", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const updateAnswer = async (id, data) => {
  try {
    // let resp = await axios.put(`http://localhost:5001/api/v1/answer/${id}`, data);
    let resp = await axios.put(
      `${process.env.REACT_APP_ANSWER_URL}/${id}`,
      data
    );

    console.log("update answers", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const deleteAnswer = async (id) => {
  try {
    // let resp = await axios.delete(`http://localhost:5001/api/v1/answer/${id}`);
    let resp = await axios.delete(`${process.env.REACT_APP_ANSWER_URL}/${id}`);

    console.log("delete answers", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const getAllCategories = async () => {
  try {
    // let resp = await axios.get("http://localhost:5001/api/v1/category");
    let resp = await axios.get(process.env.REACT_APP_CATEGORY_URL);

    console.log("get all categories", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const updateCategory = async (id, data) => {
  try {
    // let resp = await axios.put(`http://localhost:5001/api/v1/category/${id}`, data);
    let resp = await axios.put(
      `${process.env.REACT_APP_CATEGORY_URL}/${id}`,
      data
    );

    console.log("update categories", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const deleteCategory = async (id) => {
  try {
    // let resp = await axios.delete(`http://localhost:5001/api/v1/category/${id}`);
    let resp = await axios.delete(
      `${process.env.REACT_APP_CATEGORY_URL}/${id}`
    );

    console.log("delete category", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const addCategory = async (data) => {
  try {
    // let resp = await axios.post("http://localhost:5001/api/v1/category", data);
    let resp = await axios.post(process.env.REACT_APP_CATEGORY_URL, data);
    console.log("add category", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const addQuestion = async (data, category) => {
  console.log(data, "Inside add question thunk");
  try {
    // let resp = await axios.post("http://localhost:5001/api/v1/questionnaire", data);

    let resp = await axios.post(process.env.REACT_APP_QUESTION_URL, data);
    console.log("add question", resp);
    const updatedResp = {
      ...resp,
      response: 0,
      answered: resp.whoHasAnswer?.totalUsers,
      category: category,
      status: resp?.status ? "active" : "Inactive",
      visibility: resp?.visibility ? "True" : "False",
    };
    return updatedResp;
  } catch (error) {
    console.error(error);
  }
};
export const getAllAdminBenchmarks = async () => {
  try {
    let resp = await axios.get(process.env.REACT_APP_BENCHMARK_URL);
    // let resp = await axios.get("http://localhost:5001/api/v1/benchmarking");

    let data;
    data = resp.map((value) => {
      return {
        ...value,
        name: value.user.firstName + value.user.lastName,
        organization: value.user.organization,
      };
    });
    console.log("admin benchmark get all", data);
    return data;
    // dispatch(benchmarkSuccess(data))
  } catch (error) {
    console.error(error);
  }
};
export const updateQuestion = async (id, data) => {
  try {
    console.log(data, "Data inside updatequestionaiire");
    // let resp = await axios.post("http://localhost:5001/api/v1/questionnaire", data);
    // let resp = await axios.put(`{${process.env.REACT_APP_QUESTION_URL}/${id}}`, data);
    let resp = await axios.put(
      `${process.env.REACT_APP_QUESTION_URL}/${id}`,

      data
    );
    console.log("update question", resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const deleteQuestion = async (id) => {
  try {
    // console.log(data, "Data inside updatequestionaiire");
    // let resp = await axios.post("http://localhost:5001/api/v1/questionnaire", data);
    // let resp = await axios.put(`{${process.env.REACT_APP_QUESTION_URL}/${id}}`, data);
    let resp = await axios.delete(
      `${process.env.REACT_APP_QUESTION_URL}/${id}`
    );
    console.log("delete question", resp);
    // return resp;
  } catch (error) {
    console.error(error);
  }
};
export const deleteBenchmark = async (id) => {
  try {
    // let resp = await axios.delete(
    //   `https://backend.greenme.fleetforum.org/api/v1/bench/benchmarking/${id}`
    // );
    let resp = await axios.delete(
      `${process.env.REACT_APP_BENCHMARK_URL}/${id}`
    );
    console.log("delete benchmark", resp);
    // return resp;
  } catch (error) {
    console.error(error);
  }
};
