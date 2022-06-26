import axios from 'axios';
import queryString from 'query-string';
// import { useContext } from 'react';
// import { PublicContext } from '../publicContexts/contexts';

// const GetIdToken = () => {
//     const { idToken } = useContext(PublicContext);
//     return idToken;
// }
// baseURL: "https://file-managementt.herokuapp.com",
const axiosClient = axios.create({
    baseURL: "https://file-managementt.herokuapp.com",
    headers: {
        'content-type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : ""}`,
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClient;