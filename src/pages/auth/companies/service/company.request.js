import { axios } from "../../../../api/setup.interseptor";

export const getAllCompanyRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/company?page=${page}&perpage=${perpage}`,
  });
};

export const createCompanyRequest = (body) => {
  return axios({
    method: "POST",
    url: "/company",
    data: body,
  });
};
export const updateCompanyRequest = (body) => {
  return axios({
    method: "PUT",
    url: `/company/billing-address/${body.id}`,
    data: body.data,
  });
};

export const updateCompanyStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/company/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};
