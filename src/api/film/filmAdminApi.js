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
    },
    patch: (data, id) => {
        const url = `${urls.UPDATE_FILM}/${id}`;
        return axiosClient.patch(url, data);
    },
    changeHot: (id) => {
        const url = `${urls.CHANGE_HOT}/${id}`;
        return axiosClient.put(url);
    },
    changeActive: (id) => {
        const url = `${urls.CHANGE_ACTIVE}/${id}`;
        return axiosClient.put(url);
    },
    addCategory: (idCategory, idFilm) => {
        const url = `${urls.ADD_CATEGORY_FILM}/${idCategory}/${idFilm}`;
        return axiosClient.put(url);
    },
    deleteCategory: (idCategory, idFilm) => {
        const url = `${urls.DELETE_CATEGORY_FILM}/${idCategory}/${idFilm}`;
        return axiosClient.put(url);
    }

}

export default filmAdminApi;