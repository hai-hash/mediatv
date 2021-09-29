import axiosClient from "./../axiosClient";
import * as urls from './urlFilmApi';
const filmAdminApi = {
    getAll: (params) => {
        const url = urls.GET_ALL_FILM_ADMIN;
        return axiosClient.get(url, { params });
    },

    get: (id) => {
        const url = `${urls.GET_DETAIL_FILM_BY_ID_ADMIN}/${id}`;
        return axiosClient.get(url);
    },
    post: (data) => {
        const url = urls.CREATE_NEW_FILM;
        return axiosClient.post(url, data);
    }
}

export default filmAdminApi;