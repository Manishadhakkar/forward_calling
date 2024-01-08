import { axios } from "../../../../api/setup.interseptor";

export const getAllCountries = () => {
  return axios({
    method: "GET",
    url: "/countries",
  });
};

export const getAllNumbersRequest = (page, limit) => {
  return axios({
    method: "GET",
    url: `/number?page=${page}&perpage=${limit}`,
  });
};
export const createNumberRequest = (body) => {
  return axios({
    method: "POST",
    url: "/number",
    data: body,
  });
};
export const getAllActiveCarriersRequest = (id) => {
  return axios({
    method: "GET",
    url: `/carrier/active`,
  });
};
export const updateNumberRequest = (value) => {
  return axios({
    method: "PUT",
    url: `/number/${value.id}`,
    data: value.data,
  });
};
export const allGetAllUsersRequest = () =>{
  return axios({
    method: "GET",
    url: `/user`
  });
}
export const updateCarriersStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/number/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};
export const getAllCompanyRequest = () =>{
  return axios({
    method: "GET",
    url: `/company`,
  })
}