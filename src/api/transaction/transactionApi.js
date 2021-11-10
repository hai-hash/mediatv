import axiosClient from "./../axiosClient";
import * as urls from './urlTransaction';
const transactionApi = {
    getAll: () => {
        const url = urls.GET_ALL;
        return axiosClient.get(url);
    },
    getAllType: () => {
        const url = urls.GET_ALL_TYPE_TRANSACTION;
        return axiosClient.get(url);
    },
    createNewHistoryTransaction: (data, username, type) => {
        const url = `${urls.CREATE_HISTORY}/${username}/${type}`;
        return axiosClient.post(url, data);
    },
    delete: (id) => {
        const url = `${urls.DELETE}/${id}`;
        return axiosClient.delete(url);
    },
    createNewTypeTransaction: (data) => {
        const url = urls.CREATE_NEW_TYPE_TRANSACTION;
        return axiosClient.post(url, data);
    },
    getTransactionByAccount: (params) => {
        const url = urls.GET_TRANSACTION_BY_ACCOUNT;
        return axiosClient.get(url, { params });
    }


}

export default transactionApi;