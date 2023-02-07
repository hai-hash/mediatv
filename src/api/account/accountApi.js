import axiosClient from "../axiosClient";
import * as urls from './urlAccountApi'
const accountApi = {
    signup: (params) => {
        const url = urls.SIGN_UP;
        return axiosClient.post(url, params);
    },
    signin: (params) => {
        const url = urls.SIGN_IN;
        return axiosClient.post(url, params);
    },
    getAll: (params) => {
        const url = urls.GET_ALL;
        return axiosClient.get(url, { params });
    },
    createUser: (data) => {
        const url = urls.CREATE_NEW_USER;
        return axiosClient.post(url, data);
    },
    updateUser: (data, id) => {
        const url = `${urls.UPDATE_ACCOUNT}/${id}`;
        return axiosClient.put(url, data);
    },
    upToVip: (username, month) => {
        const url = `${urls.UPDATE_ACCOUNT_UPTO_VIP}/${username}/${month}`;
        return axiosClient.put(url);
    },
    updateInfoAccount: (username, data) => {
        const url = `${urls.UPDATE_ACCOUNT_INFO}/${username}`;
        return axiosClient.put(url, data);
    },
    sendMail: (params) => {
        const url = urls.SEND_MAIL;
        return axiosClient.get(url, { params });
    },
    checkVip: (params) => {
        const url = urls.CHECK_VIP;
        return axiosClient.get(url, { params });
    },
    changeStatusAccount: (username) => {
        const url = `${urls.CHANGE_STATUS}/${username}`;
        return axiosClient.put(url);
    },
    resetPassWord: (username) => {
        const url = `${urls.RESET_PASSWORD}/${username}`;
        return axiosClient.put(url);
    }

}

export default accountApi;