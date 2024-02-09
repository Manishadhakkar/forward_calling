import { axios } from "../../../../api/setup.interseptor.js";

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
export const verifyBuyerTokenReq = (token) => {
  return axios({
    method: "GET",
    url: `/verifyBuyerAccountToken/${token}`,
  });
};
export const buyerSignupReq = (body) => {
  return axios({
    method: "POST",
    url: "/buyer",
    data: body
  });
};