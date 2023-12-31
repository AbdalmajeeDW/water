import axios from "axios";

const root = "https://garorah15.pythonanywhere.com/api/orders/";

export const getOrders = (login) => {
  const token = localStorage.getItem("token-admin");
  const tokenDeliveryMans = localStorage.getItem("token-deliveryMan");
  if (!token) {
    const headers = {
      Accept: "application/json",
      Authorization: "Token" + " " + tokenDeliveryMans,
    };
    return axios.get(root, { headers });
  } else {
    const headers = {
      Accept: "application/json",
      Authorization: "Token" + " " + token,
    };
    return axios.get(root, { headers });
  }
};
