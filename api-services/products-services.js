import axios from "axios";

const root = "https://garorah15.pythonanywhere.com/api/products/";

export const getProducts = (login) => {
  const token = localStorage.getItem("token-client");
  const headers = {
    Accept: "application/json",
    Authorization: "Token" + " " + token,
  };
  return axios.get(root, { headers });
};
