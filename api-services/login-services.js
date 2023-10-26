import { axiosInstance } from "../utils/axios-instance";

const root = "login-client";

export const postLogin = (login) => {
  return axiosInstance().post(root, login);
};
