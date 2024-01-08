import { axios } from "../../../../api/setup.interseptor";

export const verifyOtpRequest = (body) => {
  return axios({
    method: "POST",
    url: "/verified",
    data: body,
  });
};

export const sendOtpRequest = (body) => {
  return axios({
    method: "GET",
    url: `/resend-otp?email=${body.email}`
  });
};
