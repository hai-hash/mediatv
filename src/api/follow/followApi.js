import axiosClient from "./../axiosClient";
import * as urls from './followUrl';
const followApi = {
    addFollow: (idFilm, username) => {
        const url = `${urls.BASE_FOLLOW}/${idFilm}/${username}`;
        return axiosClient.post(url, {});
    },
    deleteFollow: (idFilm, username) => {
        const url = `${urls.BASE_FOLLOW}/${idFilm}/${username}`
        return axiosClient.delete(url);
    },
    checkFollow: (idFilm, username) => {
        const url = `${urls.CHECK_FOLLOW}/${idFilm}/${username}`;
        return axiosClient.get(url);
    }



}

export default followApi;