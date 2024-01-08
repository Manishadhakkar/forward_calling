import { axios } from "../../../../api/setup.interseptor";

export const getAllCampaignRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/campaign?page=${page}&perpage=${perpage}`,
  });
};
export const getCampaignByIdRequest = (id) => {
  return axios({
    method: "GET",
    url: `/campaign/${id}`,
  });
};
export const createCampRequest = (body) => {
  return axios({
    method: "POST",
    url: "/campaign",
    data: body,
  });
};
export const updateCampaignRequest = (body) => {
  return axios({
    method: "PUT",
    url: `/campaign/${body.id}`,
    data: body.data,
  });
};
export const updateCampaignStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/campaign/changeStatus/${body.id}`,
    data: body.data,
  });
};
export const getAllActiveNumber = (id) => {
  return axios({
    method: "GET",
    url: `/number/active`,
  });
};
export const getAllTargetReq = () => {
  return axios({
    method: "GET",
    url: `/target/active`,
  });
};

export const getAllCompanyRequest = () => {
  return axios({
    method: "GET",
    url: `/company`,
  });
};
