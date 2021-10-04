import axiosClient from "./../axiosClient";
import * as urls from './episodeUrl';
const episodeAdminApi = {
    getAll: (params) => {
        const url = urls.GET_ALL;
        return axiosClient.get(url, { params });
    },

    post: (data, id) => {
        const url = `${urls.CREATE_EPISODE}/${id}`;
        return axiosClient.post(url, data);
    },

    put: (data, id) => {
        const url = `${urls.EDIT_EPISODE}/${id}`;
        return axiosClient.put(url, data);
    },
    delete: (id) => {
        const url = `${urls.DELETE}/${id}`;
        return axiosClient.delete(url);
    }
}

export default episodeAdminApi;