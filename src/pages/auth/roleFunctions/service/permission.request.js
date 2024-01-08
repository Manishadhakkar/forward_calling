import { axios } from "../../../../api/setup.interseptor";

export const getAllRoleReq = () => {
  return axios({
    method: "GET",
    url: "/role",
  });
};

export const getPermissionReq = (user_slug) => {
  return axios({
    method: "GET",
    url: `/permission/permission-by-group/${user_slug}`,
  });
};

export const getRolePermissionReq = (user_slug) => {
  return axios({
    method: "GET",
    url: `/permission/all/${user_slug}`,
  });
};
/////////////////////////////

export const updateRolePermissionReq = (value) => {
  return axios({
    method: "PUT",
    url: `/permission/role-permission`,
    data: value,
  });
};
