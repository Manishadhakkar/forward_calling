import { axios } from "../../../../api/setup.interseptor";

export const updateCompanyRequest = (body) => {
  return axios({
    method: "PUT",
    url: `/company/billing-address/${body.id}`,
    data: body.data,
  });
};
export const getCompanyByIdRequest = (id) => {
  return axios({
    method: "GET",
    url: `/company/${id}`,
  });
};
export const getUserByIdRequest = (id) => {
    return axios({
      method: "GET",
      url: `/user/${id}`,
    });
  };
export const getCountriesReq = () => {
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
export const updateUsersRequest = (value) => {
    return axios({
      method: "PUT",
      url: `/user/${value.id}`,
      data: value.data,
    });
  };