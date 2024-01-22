import { axios } from "../../../../api/setup.interseptor";

export const getAllIvrMediaRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/ivr-media?page=${page}&perpage=${perpage}`,
  });
};

export const createIvrMedia = (body) => {
  return axios({
    method: "POST",
    url: "/ivr-media",
    data: body,
  });
};

export const updateIvrMedia = (body) => {
  return axios({
    method: "PUT",
    url: `/ivr-media/${body.id}`,
    data: body.data,
  });
};
export const updateMediaStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/ivr-media/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};