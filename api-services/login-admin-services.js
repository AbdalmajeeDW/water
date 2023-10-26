import { axiosInstance } from "../utils/axios-instance";

const root = "login";

export const postAdminLogin = (login) => {
  return axiosInstance().post(root, login);
};
