import { axios } from "../../../../api/setup.interseptor";

export const getAllCarriersRequest = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/carrier/get?page=${page}&perpage=${perpage}`
  });
};
export const getCarriersByIdRequest = (id) => {
  return axios({
    method: "GET",
    url: `/carrier/${id}`,
  });
};
export const createCarriersRequest = (body) => {
  return axios({
    method: "POST",
    url: "/carrier",
    data: body,
  });
};
export const updateCarriersRequest = (value) => {
  return axios({
    method: "PUT",
    url: `/carrier/${value.id}`,
    data: value.data,
  });
};
export const updateCarriersStatusRequest = (body) => {
  return axios({
    method: "PATCH",
    url: `/carrier/changeStatus/${body.id}`,
    data:{status:  body.status},
  });
};
export const getAllCompanyRequest = () =>{
  return axios({
    method: "GET",
    url: `/company`,
  })
}