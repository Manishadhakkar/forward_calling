import { axios } from "../../../../api/setup.interseptor";

export const getActiveTargetsRequest = () => {
  return axios({
    method: "GET",
    url: `/target/active`,
  });
};

export const getAllNumbersRequest = () => {
  return axios({
    method: "GET",
    url: `/number/active`,
  });
};

export const getAllIvrRequest = () => {
  return axios({
    method: "GET",
    url: `/ivr/active`,
  });
};