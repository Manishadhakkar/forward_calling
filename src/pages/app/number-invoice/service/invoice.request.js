import { axios } from "../../../../api/setup.interseptor";

export const getInvoiceDataReq = (id) => {
  return axios({
    method: "GET",
    url: `/invoice/get-invoice/${id}`,
  });
};