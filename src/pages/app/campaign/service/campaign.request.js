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

export const assignCompanyReq = (body) => {
  return axios({
    method: "POST",
    url: `"/campaign/assignTo"`,
    data: body,
  });
};

export const assignCampaignTargetReq = (body) =>{
  return axios({
    method: "POST",
    url: "/campaign-member/add",
    data: body,
  });
}
export const removeCampaignTargetReq = (id) =>{
  return axios({
    method: "DELETE",
    url: `/campaign-member/remove/${id}`
  });
}
export const getCompanyTargetAndRemainsReq = (id) =>{
  return axios({
    method: "GET",
    url: `/campaign-member/campaignMemberAndOther/${id}`
  })
}