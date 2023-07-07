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
        ...value,
        title: value?.title,
        status: value?.status === "Active" ? "Complete" : "Incomplete",
        completion_level: Math.floor(value?.completionLevel),
        country: value?.country,
        start_date: value?.start_date,
        end_data: value?.end_date,
      };
    });
    return data;
    // dispatch(benchmarkSuccess(data))
  } catch (error) {
    console.error(error);
  }
};

export const getSingleBenchmark = async (id) => {
  let resp = await axios.get(`${process.env.REACT_APP_BENCHMARK_URL}/${id}`);
  // let resp = await axios.get(`http://192.168.137.120:5001/api/v1/bench/benchmarking/${id}`);

  // let resp = await axios.get(process.env.REACT_APP_BENCHMARK_URL);
  return resp;
};

export const getUserProgress = async (id) => {
  let resp = await axios.get(
    `${process.env.REACT_APP_BENCHMARK_URL}/percentage/percentageOfBenchmarks/${id}`
  );
  return resp;
};

export const updateUserResp = async (id, user_resp) => {
  // let resp = await axios.patch(
  //   `http://192.168.137.1:5001/api/v1/bench/benchmarking/user_resp_submit/${id}`,
  //   user_resp
  // );
  let resp = await axios.patch(
    `${process.env.REACT_APP_BENCHMARK_URL}/user_resp_submit/${id}`,
    user_resp
  );

  // Wait for the toast notification to be displayed for a brief duration
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (resp) {
    toast.success("User response submitted successfully!");
    // if (navigate) {
    //   navigate("/benchmarking");
    // }
  }
  return resp;
};

export const updateUserRespSave = async (id, user_resp) => {
  let resp = await axios.patch(
    `${process.env.REACT_APP_BENCHMARK_URL}/user_resp_save/${id}`,
    user_resp
  );
  if (resp) {
    toast.success("progress is successfullly saved");
  } else {
    toast.error("Unable to save progress");
  }
  return resp;
};

export const addBenchmark = async (benchmark) => {
  let resp;
  try {
    // let user = getState().Login.user
    let user = JSON.parse(sessionStorage.getItem("authUser"));
    let { _id } = user;
    let mapData = {
      title: benchmark.title,
      country: benchmark.country.value,
      userId: _id,
    };
    resp = await axios.post(process.env.REACT_APP_BENCHMARK_URL, mapData);
    // resp = await axios.post("http://localhost:5001/api/v1/benchmarking", mapData);
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
  }
};

//ADMIN BENCHMARK SUMMARY

export const removeBenchmarkUserResp = async (id, data) => {
  try {
    let resp = await axios.put(
      `${process.env.REACT_APP_BENCHMARK_URL}/${id}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAdminSummaryBenchmarking = async (id) => {
  // let resp = await axios.get(
  //   `${process.env.REACT_APP_BENCHMARK_URL}/summaryByAdmin/${id}`
  // );

  let resp = await axios.get(
    `${process.env.REACT_APP_BENCHMARK_URL}/summaryByAdmin/${id}`
  );
  // let resp = await axios.patch(`${process.env.REACT_APP_BENCHMARK_URL}/${id}`, { user_resp });

  return resp;
};

//USER BENCHMARK SUMMARY

export const getUserSummaryBenchmarking = async (id) => {
  // let resp = await axios.get(
  //   `${process.env.REACT_APP_BENCHMARK_URL}/summaryByUser/${id}`
  // );
  let resp = await axios.get(
    `${process.env.REACT_APP_BENCHMARK_URL}/summaryByUser/${id}`,
    data
  );
  // let resp = await axios.patch(`${process.env.REACT_APP_BENCHMARK_URL}/${id}`, { user_resp });

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
        response: value.response !== undefined ? value.response : 0,
        answered: value.whoHasAnswer?.totalUsers,
        category: value?.category?.titleEng,
        status: value?.status ? "Complete" : "Incomplete",
        visibility: value?.visibility ? "True" : "False",
      };
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getQAComparison = async (id) => {
  const body = {
    id: id,
  };
  let resp = await axios.post(
    `${process.env.REACT_APP_BENCHMARK_URL}/compare/benchmarkcomparison`,
    {
      data: body,
    }
  );

  return resp;
};

export const removeAllQA = async (idsArr) => {
  try {
    const body = {
      id: idsArr,
    };
    let resp = await axios.delete(
      `${process.env.REACT_APP_QUESTION_URL}/delete/deleteall`,
      {
        data: body,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const getAllAnswers = async () => {
  try {
    // let resp = await axios.get("http://localhost:5001/api/v1/answer");
    let resp = await axios.get(process.env.REACT_APP_ANSWER_URL);

    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const addAnswer = async (data) => {
  try {
    // let resp = await axios.post("http://localhost:5001/api/v1/answer", data);
    let resp = await axios.post(process.env.REACT_APP_ANSWER_URL, data);
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

    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const deleteAnswer = async (id) => {
  try {
    // let resp = await axios.delete(`http://localhost:5001/api/v1/answer/${id}`);
    let resp = await axios.delete(`${process.env.REACT_APP_ANSWER_URL}/${id}`);

    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const getAllCategories = async () => {
  try {
    // let resp = await axios.get("http://localhost:5001/api/v1/category");
    let resp = await axios.get(process.env.REACT_APP_CATEGORY_URL);

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

    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const addCategory = async (data) => {
  try {
    // let resp = await axios.post("http://localhost:5001/api/v1/category", data);
    let resp = await axios.post(process.env.REACT_APP_CATEGORY_URL, data);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const addQuestion = async (data, category) => {
  try {
    const res = await axios.post(process.env.REACT_APP_QUESTION_URL, data);
    if (res !== undefined) {
      const updatedResp = {
        ...res,
        response: 0,
        answered: res.whoHasAnswer?.totalUsers,
        category: category,
        status: res?.status ? "Complete" : "Incomplete",
        visibility: res?.visibility ? "True" : "False",
      };
      return updatedResp;
    }
    return res;
  } catch (error) {
    console.error(error);
    return {};
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
        status: value?.status === "Active" ? "Complete" : "Incomplete",
      };
    });
    return data;
    // dispatch(benchmarkSuccess(data))
  } catch (error) {
    console.error(error);
  }
};
export const updateQuestion = async (id, data) => {
  try {
    // let resp = await axios.post("http://localhost:5001/api/v1/questionnaire", data);
    // let resp = await axios.put(`{${process.env.REACT_APP_QUESTION_URL}/${id}}`, data);
    let resp = await axios.put(
      `${process.env.REACT_APP_QUESTION_URL}/${id}`,

      data
    );
    return resp;
  } catch (error) {
    console.error(error);
  }
};
export const deleteQuestion = async (id) => {
  try {
    // let resp = await axios.post("http://localhost:5001/api/v1/questionnaire", data);
    // let resp = await axios.put(`{${process.env.REACT_APP_QUESTION_URL}/${id}}`, data);
    let resp = await axios.delete(
      `${process.env.REACT_APP_QUESTION_URL}/${id}`
    );
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
    // return resp;
  } catch (error) {
    console.error(error);
  }
};
