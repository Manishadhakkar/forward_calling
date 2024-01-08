import { axios } from "../../../../api/setup.interseptor";


export const getAllCountriesReq = () => {
  return axios({
    method: "GET",
    url: "/countries",
  });
};