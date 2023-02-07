import ApiUtils from "../../../api/axiosClient";
import {IFilmParams,Film} from "./film.types";
import {
    GET_ALL_FILM_ADMIN,
    GET_DETAIL_FILM_BY_ID_ADMIN,
    CREATE_NEW_FILM,
    UPDATE_FILM,
    CHANGE_HOT,
    CHANGE_ACTIVE,
    CHANGE_COST,
    ADD_CATEGORY_FILM,
    DELETE_CATEGORY_FILM
} from "./film.urls";


export const getListAccount = async (params?: IFilmParams) => {
    return await ApiUtils.fetch<IFilmParams, Film[]>(GET_ALL_FILM_ADMIN, params);
}

export const getDetailFilm =async (id:string) => {
    const url = `${GET_DETAIL_FILM_BY_ID_ADMIN}/${id}`;
    return await ApiUtils.fetch<any,Film>(url);
}

export const createNewFilm =async (data:IFilmParams) => {
    return await ApiUtils.post<IFilmParams,Film>(CREATE_NEW_FILM,data);
}
export const updateFilm=async (data:IFilmParams,id:string) => {
    const url = `${UPDATE_FILM}/${id}`;
    return await ApiUtils.put<IFilmParams,Film>(url,data);
}

export const changeStatusHot =async (id:string) => {
    const url = `${CHANGE_HOT}/${id}`;
    return await ApiUtils.put(url);
}

export const changeStatusActive =async (id:string) => {
    const url = `${CHANGE_ACTIVE}/${id}`;
    return await ApiUtils.put(url);
}

export const changeStatusCost =async (id:string) => {
    const url = `${CHANGE_COST}/${id}`;
    return await ApiUtils.put(url);
}

export const addCategoryIntoFilm=async (idCategory:string,idFilm:string) => {
    const url = `${ADD_CATEGORY_FILM}/${idCategory}/${idFilm}`;
    return await ApiUtils.put(url);
}

export const deleteCategoryIntoFilm=async (idCategory:string,idFilm:string) => {
    const url = `${DELETE_CATEGORY_FILM}/${idCategory}/${idFilm}`;
    return await ApiUtils.put(url);
}
