import axiosClient from "./../axiosClient";
import * as urls from './urlCommentApi';
const commentUserApi = {
    getAll: (params) => {
        const url = urls.GET_ALL_COMMENT;
        return axiosClient.get(url, { params });
    },

    post: (data, id, username) => {
        const url = `${urls.CREATE_NEW_COMMENT}/${id}/${username}`;
        return axiosClient.post(url, data);
    },
    getAllCommentByFilm: (id, params) => {
        const url = `${urls.GET_ALL_COMMENT_BY_FILM}/${id}`;
        return axiosClient.get(url, { params })
    }
}

export default commentUserApi;