import { axios } from "../../../../api/setup.interseptor";

export const getWalletHistory = (page, perpage) => {
  return axios({
    method: "GET",
    url: `/payment/get-wallet-list?page=${page}&perpage=${perpage}`,
  });
};

export const createPaymentWallet = (body) => {
  return axios({
    method: "POST",
    url: "/payment/add-to-wallet",
    data: body,
  });
};
