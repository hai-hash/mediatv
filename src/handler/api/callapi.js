import axios from "axios";
import * as urls from './apis.url'
export const get = async (url,size,page) =>{
    var res =  await axios.get(`${urls.URL}/${url}?size=${size}&page=${page}`);
    return res;
}

export const getDetail = async (url,id) =>{
    var res =  await axios.get(`${urls.URL}/${url}/${id}`);
    return res;
}

export const getNoPage = async (url) =>{
    var res =  await axios.get(`${urls.URL}/${url}`);
    return res;
}

export const post = async (url,data) =>{
    const res = await axios.post(`${urls.URL}/${url}`,data)
    return res;
}
export const postCategory =  async (url,data) =>{
    const res = await axios.post(`${urls.URL}/${url}`,data)
    return res;
}

export const put = async (url) =>{
    const res = await axios.put(`${urls.URL}/${url}`);
    return res;
}