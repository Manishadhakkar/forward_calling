import { axios } from "../../../../api/setup.interseptor";

export const getAllTargetRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/target?page=${page}&perpage=${perpage}`,
  });
};

export const createTargetRequest = (body) => {
  return axios({
    method: "POST",
    url: "/target",
    data: body,
  });
};

export const updateTargetRequest = (value) => {
  return axios({
    method: "PUT",
    url: `/target/${value.id}`,
    data: value.data,
  });
};

export const updateTargetsStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/target/changeStatus/${body.id}`,
    data: { status: body.status },
  });
};

export const deleteTargetsRequest = (body) => {
  return axios({
    method: "DELETE",
    url: `/target/delete/${body.id}`,
    data: { is_delete: body.is_delete },
  });
};

export const getAllCompanyRequest = () => {
  return axios({
    method: "GET",
    url: `/company`,
  });
};
