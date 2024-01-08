import { axios } from "../../../../api/setup.interseptor";

export const getBlockNoRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/block-rule?page=${page}&perpage=${perpage}`,
  });
};
export const createBlockNoRequest = (body) => {
  return axios({
    method: "POST",
    url: "/block-rule",
    data: body,
  });
};
export const updateBlockNoRequest = (value) => {
  return axios({
    method: "PUT",
    url: `/block-rule/${value.id}`,
    data: value.data,
  });
};
export const updateBlockNoStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/block-rule/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};

export const getAllGroupsRequest = (id) => {
  return axios({
    method: "GET",
    url: `/block-group/getByCompany/${id}`,
  });
};
