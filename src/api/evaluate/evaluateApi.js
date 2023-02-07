import axiosClient from "../axiosClient";
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
    getStar: (id, name) => {
        const url = `${urls.CHECK_UPDATE}/${id}/${name}`;
        return axiosClient.post(url);
    },
    updateStar: (id, name, star) => {
        const url = `${urls.UPDATE_STAR}/${id}/${star}`;
        return axiosClient.put(url);
    },
    getTotalAndValueTbStar: (id) => {
        const url = `${urls.GET_TOTAL_STAR_AND_VALUE}/${id}`;
        return axiosClient.get(url);
    }
}

export default evaluateAdminApi;