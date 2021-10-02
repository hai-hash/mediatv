import axiosClient from "./../axiosClient";
import * as urls from './urlFilmApi';
const filmApi = {
    getAll: (params) => {
        const url = urls.GET_ALL_FILM_DISPLAY;
        return axiosClient.get(url, { params });
    },

    get: (id) => {
        const url = `${urls.GET_DETAIL_FILM_BY_ID}/${id}`;
        return axiosClient.get(url);
    },
    getepisode: (id) => {
        const url = `${urls.GET_EPISODE_BY_ID}/${id}`;
        return axiosClient.get(url);
    },
    getFilmByType: (params) => {
        const url = urls.GET_FILM_BY_TYPE;
        return axiosClient.get(url, { params });
    },
    getFilmByNameCategory: (params) => {
        const url = urls.GET_FILM_BY_NAME_CATEGORY;
        return axiosClient.get(url, { params });
    }
}

export default filmApi;