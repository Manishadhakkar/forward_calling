import { axios } from "../../../api/setup.interseptor";

export const logoutRequest = (body) => {
    return axios({
      method: "POST",
      url: "/logout",
    });
  };

  export const liveCallsReq = (body) => {
    return axios({
      method: "GET",
      url: "/livecalls",
    });
  };

  export const totalCallsReq = (body) => {
    return axios({
      method: "GET",
      url: "/livecalls/total-livecalls",
    });
  };
  