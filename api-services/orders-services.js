import axios from "axios";

const root = "https://garorah15.pythonanywhere.com/api/orders/";

export const getOrders = (login) => {
  const token = localStorage.getItem("token-client");
  const headers = {
    Accept: "application/json",
    Authorization: "Token" + " " + "1766a2abc66069f2c5bbb1a0e22f21f04a6ff15b",
  };
  return axios.get(root, { headers });
};
