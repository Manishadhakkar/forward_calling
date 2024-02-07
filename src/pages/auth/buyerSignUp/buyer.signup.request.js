import { axios } from "../../../api/setup.interseptor.js";

export const getCountry = () => {
  return axios({
    method: "GET",
    url: "/countries",
  });
};

export const getState = (id) => {
  return axios({
    method: "GET",
    url: `/states/${id}`,
  });
};
