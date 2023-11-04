import axios from "axios";

const root = "https://garorah15.pythonanywhere.com/api/transactions/";

export const postTransactions = (trans) => {
  const token = localStorage.getItem("token-admin");
  const headers = {
    Accept: "application/json",
    Authorization: "Token" + " " + token,
  };
  return axios.post(root, trans,{ headers });
};

