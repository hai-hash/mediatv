import axiosClient from "../axiosClient";
import * as urls from './followUrl';
const followApi = {
    //UPDATE DATE 7/9/2022
    addFollow: (idFilm) => {
        const url = `${urls.BASE_FOLLOW}/${idFilm}`;
        return axiosClient.post(url, {});
    },
    //UPDATE DATE 7/9/2022
    deleteFollow: (idFilm) => {
        const url = `${urls.BASE_FOLLOW}/${idFilm}`
        return axiosClient.delete(url);
    },
    //UPDATE DATE 7/9/2022
    checkFollow: (idFilm) => {
        const url = `${urls.CHECK_FOLLOW}/${idFilm}`;
        return axiosClient.get(url);
    },
    //ADD DATE 7/9/2022
    getFollow: () => {
        const url = `${urls.GET_FOLLOW}`;
        return axiosClient.get(url);
    }



}

export default followApi;