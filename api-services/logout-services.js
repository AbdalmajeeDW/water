import { axiosInstance } from "../utils/axios-instance";

const root = "/api/logout";

export const postLogout = () => {
    return axiosInstance().post(root);
};
