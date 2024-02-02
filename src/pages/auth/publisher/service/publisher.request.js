import { axios } from "../../../../api/setup.interseptor";

export const getAllCompanyRequest = () => {
  return axios({
    method: "GET",
    url: `/buyer/getallcompany`,
  });
};

export const getAllCountryRequest = () => {
  return axios({
    method: "GET",
    url: "/countries",
  });
};
export const getStateByCountry = (id) => {
  return axios({
    method: "GET",
    url: `/states/${id}`,
  });
};
export const getAllPublisherReq = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/publisher/getAllPublisher?page=${page}&perpage=${perpage}`,
  });
};
export const createPublisherRequest = (body) => {
  return axios({
    method: "POST",
    url: "/publisher",
    data: body,
  });
};

export const updatePublisherStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/publisher/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};