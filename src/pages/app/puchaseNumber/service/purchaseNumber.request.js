import { axios } from "../../../../api/setup.interseptor";


export const getAllCountriesReq = () => {
  return axios({
    method: "GET",
    url: "/countries",
  });
};

export const getAllSearchNumbersReq = (body) =>{
  return axios({
    method: "POST",
    url: "/cart/number-search",
    data: body
  })
}

export const addToCartReq = (body) =>{
  return axios({
    method: "POST",
    url: "/cart/add-to-cart",
    data: body
  })
}
export const getCartListReq = (body) =>{
  return axios({
    method: "GET",
    url: "/cart/cartlist",
    data: body
  })
}
export const removeCartItemReq = (id) =>{
  return axios({
    method: "PATCH",
    url: `/cart/remove-to-cart/${id}`,
  })
}
