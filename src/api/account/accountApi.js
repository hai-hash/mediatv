import axiosClient from "./../axiosClient";
import * as urls from './urlAccountApi'
const accountApi = {
    // getAll: (params) => {
    //     const url = urls.GET_ALL_FILM_DISPLAY;
    //     return axiosClient.get(url, { params });
    // },

    // get: (id) => {
    //     const url = `${urls.GET_DETAIL_FILM_BY_ID}/${id}`;
    //     return axiosClient.get(url);
    // },

    signup: (params) => {
        const url = urls.SIGN_UP;
        return axiosClient.post(url, params);
    }
}

export default accountApi;