import axiosClient from "./../axiosClient";
import * as urls from './urlAccountApi'
const accountApi = {
    signup: (params) => {
        const url = urls.SIGN_UP;
        return axiosClient.post(url, params);
    },
    signin: (params) => {
        const url = urls.SIGN_IN;
        return axiosClient.post(url, params);
    },
}

export default accountApi;