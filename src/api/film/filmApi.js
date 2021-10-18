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
    },
    getFilmByCountry: (params, name) => {
        const url = `${urls.GET_FILM_BY_COUNTRY}/${name}`;
        return axiosClient.get(url, { params });
    },
    getFilmNewUpdateByType: (params) => {
        const url = urls.GET_FILM_NEW_UPDATE_BY_TYPE;
        return axiosClient.get(url, { params });
    },
    getFilmNewUpdateByCategory: (params) => {
        const url = urls.GET_FILM_NEW_UPDATE_BY_CATEGORY;
        return axiosClient.get(url, { params });
    },
    getFilmViewMost: (name) => {
        const url = `${urls.GET_FILM_VIEW_MOST}/${name}`;
        return axiosClient.get(url);
    },
    searchFilm: (params) => {
        const url = urls.SEARCH_FILM;
        return axiosClient.get(url, { params });
    },
    getFilmViewMostByCategory: (params) => {
        const url = urls.GET_FILM_VIEW_MOST_BY_CATEGORY;
        return axiosClient.get(url, { params });
    },
    getFilmRecommender: (params) => {
        const url = urls.GET_FILM_RECOMMENDER;
        return axiosClient.get(url, { params });
    },
    getFilmViewMostIncurrent: () => {
        const url = urls.GET_FILM_VIEW_MOST_IN_CURRENT;
        return axiosClient.get(url);
    },
    getUpComingMovie: (params) => {
        const url = urls.UP_COMING_MOVIE;
        return axiosClient.get(url, { params });
    },


}

export default filmApi;