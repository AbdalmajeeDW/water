import axios from "axios";
export const axiosInstance = () => {
  const token = localStorage.getItem("token-client");
  const a = axios.create({
    baseURL: "https://garorah15.pythonanywhere.com/api/",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return a;
};
