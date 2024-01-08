import { axios } from "../../../../api/setup.interseptor";

export const userLoginRequest = (body) => {
  return axios({
    method: "POST",
    url: "/login",
    data: body,
  });
};

export const getPermissionReq = (user_slug) => {
  return axios({
    method: "GET",
    url: `/permission/all/${user_slug}`,
  });
};