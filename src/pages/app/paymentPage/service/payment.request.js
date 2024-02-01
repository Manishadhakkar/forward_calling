import { axios } from "../../../../api/setup.interseptor";

export const createCardPayment = (body) => {
  return axios({
    method: "POST",
    url: `/payment`,
    data: body,
  });
};
export const createWalletPaymentReq = (body) => {
  return axios({
    method: "POST",
    url: `/payment/pay-with-wallet`,
    data: body,
  });
};