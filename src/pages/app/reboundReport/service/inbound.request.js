import { axios } from "../../../../api/setup.interseptor";

export const getInboundRequest = (
  page,
  perpage,
  from_date,
  to_date,
  did_number,
  target,
  callvia
) => {
  return axios({
    method: "GET",
    url: `/cdr?page=${page}&perpage=${perpage}&from_date=${from_date}&to_date=${to_date}&did_number=${did_number}&target=${target}&callvia=${callvia}`,
  });
};

export const getForwardTargetsRequest = () => {
  return axios({
    method: "GET",
    url: `/target/forwarding-number-list`,
  });
};

export const getAllNumbersRequest = () => {
  return axios({
    method: "GET",
    url: `/number/active`,
  });
};

export const getAllIvrRequest = () => {
  return axios({
    method: "GET",
    url: `/ivr/active`,
  });
};
