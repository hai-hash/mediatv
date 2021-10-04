import axiosClient from "./../axiosClient";
import * as urls from './urlViewApi';
const viewApi = {
    getAll: (params) => {
        const url = urls.GET_ALL;
        return axiosClient.get(url, { params });
    },
    addViewByFilm: (id) => {
        const url = `${urls.ADD_VIEW_BY_FILM}/${id}`;
        return axiosClient.post(url);
    },
}

export default viewApi;