import axiosClient from "./../axiosClient";
import * as urls from './urlNotify';
const notifyApi = {
    getNotify: () => {
        const url = `${urls.GET_NOTIFY}`;
        return axiosClient.get(url);
    }
}
export default notifyApi;