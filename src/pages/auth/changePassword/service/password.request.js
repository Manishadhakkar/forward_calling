import { axios } from "../../../../api/setup.interseptor";


export const changePasswordRequest = (body) => {
  return axios({
    method: "POST",
    url: "/change-password",
    data: body,
  });
};