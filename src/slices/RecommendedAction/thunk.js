import axios from "axios";
import { toast } from "react-toastify";

export const getAllRecommendedAction = async () => {
  let resp = await axios.get(`${process.env.REACT_APP_RA_URL}actionsteps`);
  console.log("get action steps", resp);
  return resp;
};

export const updateRecommendedActionStep = async (id, data) => {
  try {
    // const res = await axios.patch(
    //   `http://localhost:5002/api/v1/ra/steps/${id}`,
    //   data
    // );
    const res = await axios.patch(
      `${process.env.REACT_APP_RA_URL}actionsteps/${id}`,
      data
    );
    console.log(res, "INSIDE RA THUNK");
    return res;
  } catch (error) {
    console.log("Unable to Add", error);
  }
};

export const getAllRecommendedRelation = async () => {
  let resp = await axios.get(`${process.env.REACT_APP_RA_URL}relationships`);
  let answers = "";
  let data = resp.map((value) => {
    answers = "";
    value?.qid?.answerOptions.forEach((element) => {
      answers += element.answerOption.answerOption + ",";
    });
    return {
      ...value,
      status: value.status ? "true" : false,
      ra_title: value?.recomendedActionId[0]?.title,
      answr_option: answers,
      question_title: value?.qid?.title,
      assignment_type: value?.assignment_type
        ? resp.assignment_type
        : "Automatic",
      number_of_assignment: value?.number_of_assignment || 0,
    };
  });

  return data;
};
export const createRecommendActionRelation = async (data) => {
  let resp = await axios.post(
    `${process.env.REACT_APP_RA_URL}relationships`,
    data
  );
  if (resp) {
    return resp;
  }
};
export const updatedRecommendActionRelation = async (id, data, toastId) => {
  let resp = await axios.patch(
    `${process.env.REACT_APP_RA_URL}relationships/${id}`,
    data
  );
  if (resp) {
    toast.update(toastId, {
      render: "Recommend Relation is updated.",
      type: "success",
      isLoading: false,
    });
    return resp;
  }
};
export const deleteRecommendActionRelation = (id) => {
  return axios.delete(`${process.env.REACT_APP_RA_URL}relationships/${id}`);
};
