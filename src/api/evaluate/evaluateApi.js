import axiosClient from "./../axiosClient";
import * as urls from './urlValuateApi';
const evaluateAdminApi = {
    getAll: (params) => {
        const url = urls.GET_ALL;
        return axiosClient.get(url, { params });
    },
    post: (data) => {
        const url = urls.CREATE_NEW_EVALUATE;
        return axiosClient.post(url, data);
    },
    delete: (id) => {
        const url = `${urls.DELETE_EVALUATE}/${id}`;
        return axiosClient.delete(url);
    },
}

export default evaluateAdminApi;