import ApiUtils from "../../../api/axiosClient";
import { IAccountParams, AccountRequest, Account, LoginRequest, LoginResponse, SignUpRequest } from "./account.types";
import {
    GET_ALL,
    SIGN_IN, SIGN_UP,
    CREATE_NEW_USER,
    UPDATE_ACCOUNT,
    UPDATE_ACCOUNT_UPTO_VIP,
    UPDATE_ACCOUNT_INFO,
    SEND_MAIL,
    CHECK_VIP,
    CHANGE_STATUS,
    RESET_PASSWORD
} from "./account.urls";


export const getListAccount = async (params?: IAccountParams) => {
    const res = await ApiUtils.fetch<IAccountParams, Account[]>(GET_ALL, params);
    return res;
}

export const signIn = async (dataBody: LoginRequest) => {
    const res = await ApiUtils.post<LoginRequest, LoginResponse>(SIGN_IN, dataBody);
    return res;
}

export const singUp = async (dataBody: SignUpRequest) => {
    const res = await ApiUtils.post<SignUpRequest, any>(SIGN_UP, dataBody);
    return res;
}

export const createNewUser = async (dataBody: AccountRequest) => {
    const res = await ApiUtils.post<AccountRequest, any>(CREATE_NEW_USER, dataBody);
    return res;
}

export const updateUser = async (dataBody: AccountRequest, idAccount: number) => {
    const URL_REQUEST = `${UPDATE_ACCOUNT}/${idAccount}`;
    const res = await ApiUtils.put<AccountRequest, any>(URL_REQUEST, dataBody);
    return res;
}

export const upToVip = async (username: string, month: number) => {
    const URL_REQUEST = `${UPDATE_ACCOUNT_UPTO_VIP}/${username}/${month}`;
    return await ApiUtils.put(URL_REQUEST);
}

export const updateInfoAccount = async (dataBody: AccountRequest, username: string) => {
    const URL_REQUEST = `${UPDATE_ACCOUNT_INFO}/${username}`;
    const res = await ApiUtils.put<AccountRequest, any>(URL_REQUEST, dataBody);
    return res;
}

export const sendMail = async (params: any) => {
    const res = await ApiUtils.fetch<any, any>(SEND_MAIL, params);
    return res;
}

export const checkVip = async (params: any) => {
    const res = await ApiUtils.fetch<any, any>(CHECK_VIP, params);
    return res;
}

export const changeStatusAccount = async (username: string) => {
    const URL_REQUEST = `${CHANGE_STATUS}/${username}`;
    const res = await ApiUtils.put(URL_REQUEST);
    return res;
}

export const resetPassWord = async (username: string) => {
    const URL_REQUEST = `${RESET_PASSWORD}/${username}`;
    const res = ApiUtils.put<any, any>(URL_REQUEST);
    return res;
}

