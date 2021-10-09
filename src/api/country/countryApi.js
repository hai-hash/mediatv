import axiosClient from "./../axiosClient";
import * as urls from './urlCountryApi';
const countryAdminApi = {
    getAll: (params) => {
        const url = urls.GET_ALL;
        return axiosClient.get(url, { params });
    },
    post: (data) => {
        const url = urls.CREATE_NEW_COUNTRY;
        return axiosClient.post(url, data);
    },
    update: (data, id) => {
        const url = `${urls.UPDATE_COUNTRY}/${id}`
        return axiosClient.put(url, data);
    }
}

export default countryAdminApi;