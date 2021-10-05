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
    updateView: (id, data) => {
        const url = `${urls.UPDATE_VIEW}/${id}`;
        return axiosClient.put(url, data);
    },
}

export default viewApi;