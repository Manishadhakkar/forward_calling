import { axios } from "../../../../api/setup.interseptor";

export const totalCallsReq = (body) => {
    return axios({
      method: "GET",
      url: "/livecalls",
    });
  };