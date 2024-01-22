import { axios } from "../../../../api/setup.interseptor";

export const getAllActiveMedia = () => {
  return axios({
    method: "GET",
    url: `/ivr-media/active`,
  });
};

export const getAllIvrRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/ivr?page=${page}&perpage=${perpage}`,
  });
};

export const createIvrRequest = (body) => {
  return axios({
    method: "POST",
    url: "/ivr",
    data: body,
  });
};

export const updateIvrRequest = (body) => {
  return axios({
    method: "PUT",
    url: `/ivr/${body.id}`,
    data: body.data,
  });
};

export const updateStatusIvrRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/ivr/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};
