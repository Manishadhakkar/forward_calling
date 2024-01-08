import { axios } from "../../../../api/setup.interseptor";

export const getAllIpRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/serverIP?page=${page}&perpage=${perpage}`,
  });
};
export const getActiveIpRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/serverIP/active`,
  });
};
export const createIpRequest = (body) => {
  return axios({
    method: "POST",
    url: "/serverIP",
    data: body,
  });
};
export const getIpByIdRequest = (id) => {
  return axios({
    method: "GET",
    url: `/serverIP/${id}`,
  });
};
export const updateIpRequest = (value) => {
  return axios({
    method: "PUT",
    url: `/serverIP/${value.id}`,
    data: value.data,
  });
};
export const updateIpStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/serverIP/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};
export const getAllCompanyRequest = () =>{
  return axios({
    method: "GET",
    url: `/company`,
  })
}