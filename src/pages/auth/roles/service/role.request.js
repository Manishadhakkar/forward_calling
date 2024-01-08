import { axios } from "../../../../api/setup.interseptor";

export const getAllRoles = () => {
  return axios({
    method: "GET",
    url: "/role",
  });
};
export const getAllActiveRoles = () => {
  return axios({
    method: "GET",
    url: "/role/active",
  });
};
export const getRoleByIdRequest = (id) => {
  return axios({
    method: "GET",
    url: `/role/${id}`,
  });
};
export const createRole = (body) => {
  return axios({
    method: "POST",
    url: "/role",
    data: body,
  });
};
export const updateRoleRequest = (value) => {
  return axios({
    method: "PUT",
    url: `/role/${value.id}`,
    data: value.data,
  });
};
export const updateRoleStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/role/changeStatus/${body.id}`,
    data:{status:  body.status},
  });
};
