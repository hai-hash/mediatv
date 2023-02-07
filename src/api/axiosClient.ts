import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';

interface CustomHeaders {
    isAuth: boolean;
}

const REQUEST_TIMEOUT = 25 * 1000;

const axiosClient = axios.create({
    baseURL: "https://file-managementt.herokuapp.com",
    timeout: REQUEST_TIMEOUT,
});

const initHeader: CustomHeaders = { isAuth: true };

export const getAccessToken = () => {
    const token = localStorage.getItem("token");
    if (token && token !== "") {
        return token
    }
    return null;
}

export const getHeader = async (customHeaders?: CustomHeaders) => {
    const header: any = customHeaders || {};
    const initCustomHeader = customHeaders ? customHeaders : initHeader;
    if (!initCustomHeader?.isAuth) {
        delete header.Authorization;
    } else {
        const token = getAccessToken();
        header.Authorization = `Bearer ${token}`;
    }

    return { ...header };

}

const requestHandle = (request: AxiosRequestConfig) => {
    return request;
}

axiosClient.interceptors.request.use((config: any) => requestHandle(config));

const successHandle = async (response: AxiosResponse) => {
    const data: any = response.data;
    return data;
}

const errorHandle = (error: AxiosError) => {
    const resError: AxiosResponse<any> | undefined = error.response;
    // perform catch error
    return Promise.reject({ ...resError?.data });
}


axiosClient.interceptors.response.use(
    (response: any) => successHandle(response),
    (error: any) => errorHandle(error)
);

async function fetch<ReqType, ResType>(
    url: string,
    params?: ReqType,
    customHeaders?: CustomHeaders,
    responseType?: ResponseType
): Promise<ResType> {
    const headers = await getHeader(customHeaders);
    return axiosClient.get(url, { params, headers, responseType });
}

async function post<ReqType, ResType>(
    url: string,
    data?: ReqType,
    customHeaders?: CustomHeaders
): Promise<ResType> {
    const headers = await getHeader(customHeaders);
    return axiosClient.post(url, { ...data }, { headers });
}

async function put<ReqType, ResType>(
    url: string,
    data?: ReqType,
    customHeaders?: CustomHeaders
): Promise<ResType> {
    const headers = await getHeader(customHeaders);
    return axiosClient.put(url, { ...data }, { headers });
}



async function remove<ReqType, ResType>(
    url: string,
    data?: ReqType,
    customHeaders?: CustomHeaders
): Promise<ResType> {
    const headers = getHeader(customHeaders);
    return axiosClient.delete(url, { data: { ...data }, headers: { ...headers } });
}
const ApiUtils = { fetch, post, put, remove };
export default ApiUtils;