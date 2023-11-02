import axios from "axios";

const root = "https://garorah15.pythonanywhere.com/api/orders/";

export const addOrderServices = (item) => {
    const token = localStorage.getItem("token-client");
    const headers = {
        Accept: "application/json",
        Authorization: "Token" + " " + token,
    };
    return axios.post(root, item, { headers });
};

export const getOrderServices = () => {
    const token = localStorage.getItem("token-client");
    const headers = {
        Accept: "application/json",
        Authorization: "Token" + " " + token,
    };
    return axios.get(root, { headers });
};