import { axios } from "../../../../api/setup.interseptor";

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

export const userSignup = (body) => {
  return axios({
    method: "POST",
    url: "/registration",
    data: body,
  });
};
