import axiosClient from "./../axiosClient";
import * as urls from './urlMessage';
const messageApi = {
    send: (data, numberRoom) => {
        const url = `${urls.SEND_MESSAGE}/${numberRoom}`;
        return axiosClient.post(url, data);
    }
}
export default messageApi;