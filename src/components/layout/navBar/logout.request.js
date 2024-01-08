import { axios } from "../../../api/setup.interseptor";

export const logoutRequest = (body) => {
    return axios({
      method: "POST",
      url: "/logout",
    });
  };

