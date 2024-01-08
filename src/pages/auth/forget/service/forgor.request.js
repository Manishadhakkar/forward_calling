import { axios } from "../../../../api/setup.interseptor";

export const forgotOtpRequest = (body) => {
  return axios({
    method: "POST",
    url: "/forgot-password-otp",
    data: body,
  });
};
export const forgotConfirmRequest = (body) => {
  return axios({
    method: "POST",
    url: `/password-reset/${body.otp}`,
    data: body.data,
  });
};
