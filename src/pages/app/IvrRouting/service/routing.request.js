import { axios } from "../../../../api/setup.interseptor";

export const createIvrRoutingRequest = (body) => {
  return axios({
    method: "POST",
    url: "/ivr-route",
    data: body,
  });
};

export const getIvrRoutingRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/ivr-route?page=${page}&perpage=${perpage}`,
  });
};
export const updateIvrRouteStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/ivr-route/changeStatus/${body.id}`,
    data: { status: body.status },
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