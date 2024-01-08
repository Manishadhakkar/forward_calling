import { axios } from "../../../../api/setup.interseptor";

export const getAllUsersRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/user?page=${page}&perpage=${perpage}`,
  });
};
export const getAllCompanyUsersRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/user?page=${page}&perpage=${perpage}`,
  });
};
export const getAllActiveRole = () =>{
  return axios({
    method: "GET",
    url: `/role/active`,
  })
}
export const createUsersRequest = (body) => {
  return axios({
    method: "POST",
    url: "/user",
    data: body,
  });
};
export const updateUsersRequest = (value) => {
  return axios({
    method: "PUT",
    url: `/user/${value.id}`,
    data: value.data,
  });
};
export const updateUsersStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/user/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};

export const getAllCountryRequest = () => {
  return axios({
    method: "GET",
    url: "/countries" ,
  });
};
export const getStateByCountry = (id) =>{
  return axios({
    method: "GET",
    url: `/states/${id}`
  })
}
export const createUserRequest = (body) => {
  return axios({
    method: "POST",
    url: "/user",
    data: body,
  });
};

export const createCompanyRequest = (body) => {
  return axios({
    method: "POST",
    url: "/company",
    data: body,
  });
};
export const getAllCompanyRequest = () =>{
  return axios({
    method: "GET",
    url: `/company`,
  })
}