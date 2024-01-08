import { axios } from "../../../../api/setup.interseptor";

export const getGroupsRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/block-group?page=${page}&perpage=${perpage}`,
  });
};
export const createGroupsRequest = (body) => {
  return axios({
    method: "POST",
    url: "/block-group",
    data: body,
  });
};
export const updateGroupsRequest = (value) => {
  return axios({
    method: "PUT",
    url: `/block-group/${value.id}`,
    data: value.data,
  });
};
export const updateGroupsStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/block-group/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};
