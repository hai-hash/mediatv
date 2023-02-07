import axiosClient from "../axiosClient";
import * as urls from './urlCategoryApi';
const categoryAdminApi = {
    getAll: (params) => {
        const url = urls.GET_ALL;
        return axiosClient.get(url, { params });
    },
    getAllPublic: (params) => {
        const url = urls.GET_ALL_PUBLIC;
        return axiosClient.get(url, { params });
    },

    post: (data) => {
        const url = urls.CREATE_NEW_CATEGORY;
        return axiosClient.post(url, data);
    },

    put: (data, id) => {
        const url = `${urls.Update_Category}/${id}`;
        return axiosClient.put(url, data);
    },
}

export default categoryAdminApi;