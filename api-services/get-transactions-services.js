import axios from "axios";

const root = "https://garorah15.pythonanywhere.com/api/transactions/";


export const getTransactions = () => {
  const token3 = localStorage.getItem("token-admin");
  const headers = {
      Accept: "application/json",
      Authorization: "Token" + " " + token3,
  };
  return axios.get(root, {
      headers: headers
  });
};