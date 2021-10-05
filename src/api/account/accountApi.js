import axiosClient from "./../axiosClient";
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
    }
}

export default accountApi;