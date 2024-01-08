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
export const getAllBuyersReq = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/buyer/getAllBuyer?page=${page}&perpage=${perpage}`,
  });
};
export const createBuyerRequest = (body) => {
  return axios({
    method: "POST",
    url: "/buyer",
    data: body,
  });
};

export const updateUsersStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/buyer/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};
