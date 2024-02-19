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

export const getAllBuyerRequest = () => {
  return axios({
    method: "GET",
    url: `/buyer/getAllActiveBuyer`,
  });
};

export const assignCompanyReq = (body) => {
  return axios({
    method: "POST",
    url: `"/campaign/assignTo"`,
    data: body,
  });
};

export const assignBuyerReq = (body) => {
  return axios({
    method: "POST",
    url: "/campaign/assignToBuyer",
    data: body,
  });
};

export const assignCampaignTargetReq = (body) => {
  return axios({
    method: "POST",
    url: "/campaign-member/add",
    data: body,
  });
};
export const removeCampaignTargetReq = (id) => {
  return axios({
    method: "DELETE",
    url: `/campaign-member/remove/${id}`,
  });
};
export const getCompanyTargetAndRemainsReq = (id) => {
  return axios({
    method: "GET",
    url: `/campaign-member/campaignMemberAndOther/${id}`,
  });
};

export const updateTargetPriorityReq = (body) => {
  return axios({
    method: "PATCH",
    url: `/campaign-member/priority/${body.id}`,
    data: body.data,
  });
};

export const updateTargetWeightageReq = (body) => {
  return axios({
    method: "PATCH",
    url: `/campaign-member/weightage/${body.id}`,
    data: body.data,
  });
};

export const getAllIvrListReq = () => {
  return axios({
    method: "GET",
    url: `/ivr/active`,
  });
};

export const getAllIvrReq = (id) => {
  return axios({
    method: "GET",
    url: `/ivr-options/${id}`,
  });
};

export const getAllRoutesReq = (id) => {
  return axios({
    method: "GET",
    url: `/ivr-route/active`,
  });
};

export const createIvrReq = (body) => {
  return axios({
    method: "POST",
    url: `/ivr-options/add`,
    data: body,
  });
};

export const updateIvrReq = (body) => {
  return axios({
    method: "PUT",
    url: `/ivr-options/${body.id}`,
    data: body.data,
  });
};

export const removeIvrReq = (id) => {
  return axios({
    method: "DELETE",
    url: `/ivr-options/remove/${id}`,
  });
};

export const setCampaignIvrReq = (body) => {
  return axios({
    method: "POST",
    url: `/campaign/ivrAssignToCampaign`,
    data: body,
  });
};
export const getRouteMembersAndRemainsReq = (id) => {
  return axios({
    method: "GET",
    url: `/ivr-route/ivrRouteMemberAndOther/${id}`,
  });
};
export const assignRouteTargetReq = (body) => {
  return axios({
    method: "POST",
    url: "/ivr-route/addMember",
    data: body,
  });
};
export const removeRouteTargetReq = (id) => {
  return axios({
    method: "DELETE",
    url: `/ivr-route/remove/${id}`,
  });
};
export const updateRouteTargetPriorityReq = (body) => {
  return axios({
    method: "PATCH",
    url: `/ivr-route/priority/${body.id}`,
    data: body.data,
  });
};
export const updateRouteTargetWeightageReq  = (body) => {
  return axios({
    method: "PATCH",
    url: `/ivr-route/weightage/${body.id}`,
    data: body.data,
  });
};