import { axiosInstance } from "../utils/axios-instance";

const root = "clients/";

export const postRegister = (register) => {
  return axiosInstance().post(root, register);
};
export const getUsers = () => {
  const token = localStorage.getItem("token-admin");

  const headers = {
    Accept: "application/json",
    Authorization: "Token" + " " + token,
  };
  return axiosInstance().get(root, { headers });
};
