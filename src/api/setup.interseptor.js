import axios from "axios";
import Swal from "sweetalert2";

const user = JSON.parse(localStorage.getItem("user"));

let headers = {
  "Content-Type": "application/json"
};
if (user && user.token) {
  headers["Authorization"] = `Bearer ${user.token}`;
}
export const BASE_URL = process.env.REACT_APP_BASE_URL;
const headerOption = {
  axios_option: {
    baseURL: `${BASE_URL}`,
    headers,
  },
};

const axios_option = headerOption.axios_option;
const instance = axios.create(axios_option);

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Login again",
      }).then(() => {
        localStorage.clear();
        window.location.href = "/";
      });
    }
    const err = {
      url: error?.toJSON().config.baseURL,
      body: JSON.parse(error?.toJSON().config.data),
      message: error?.response?.data?.message,
      code: error?.response?.status,
    };

    return Promise.reject(err);
  }
);

export { instance as axios };
