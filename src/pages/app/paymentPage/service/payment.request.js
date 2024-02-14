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
export const paymentBtcQrGenerateReq = (body) => {
  return axios({
    method: "POST",
    url: `/payment/crypto-create`,
    data: body,
  });
};
export const paymentBTCPaymentStatusReq = (body) => {
  return axios({
    method: "POST",
    url: `/payment/crypto-status`,
    data: body,
  });
};