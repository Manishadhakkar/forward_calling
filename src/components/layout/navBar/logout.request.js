import { axios } from "../../../api/setup.interseptor";

export const logoutRequest = (body) => {
    return axios({
      method: "POST",
      url: "/logout",
    });
  };

  export const completedCallsReq = () => {
    return axios({
      method: "GET",
      url: "/cdr/completed-calls-count",
    });
  };

  export const totalCallsReq = () => {
    return axios({
      method: "GET",
      url: "/livecalls/total-livecalls",
    });
  };
  
  export const totalAccDataReq = () => {
    return axios({
      method: "GET",
      url: "/account",
    });
  };