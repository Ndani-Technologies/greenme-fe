import axios from "axios";

export const getAllRecommendedAction = async () => {
  let resp = await axios.get(`${process.env.REACT_APP_RA}/actionsteps`);
  console.log("get action steps", resp);
  return resp;
};
export const getAllRecommendedRelation = async () => {
  let resp = await axios.get(`${process.env.REACT_APP_RA}/relationships`);
  console.log("get action relation", resp);
  let answers = "";
  let data = resp.map((value) => {
    answers = "";
    value.qid?.answerOptions.forEach((element) => {
      answers += element.answerOption + ",";
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
  console.log("get action relation2", data);

  return data;
};
export const createRecommendActionRelation = (data) => {
  return axios.post(`${process.env.REACT_APP_RA}/relationships`, data);
};
export const deleteRecommendActionRelation = (id) => {
  return axios.delete(`${process.env.REACT_APP_RA}/relationships/${id}`);
};
