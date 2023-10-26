import { axiosInstance } from "../utils/axios-instance";

const root = "clients/";

export const postRegister = (register) => {
  return axiosInstance().post(root, register);
};
