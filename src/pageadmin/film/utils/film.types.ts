import { BlobOptions } from "buffer";

export interface Film{
    id: number;
    nameFilm:string;
    countView:number;
    cost:boolean;
    hot: boolean;
    active: boolean;
    createDate: string;
}

export interface IFilmParams {
    id?: number;
    nameFilm?:string;
    countView?:number;
    cost?:boolean;
    hot?: boolean;
    active?: boolean;
    createDate?: string;
}

export const DISPLAY = 'DISPLAY';
export const EDIT = 'EDIT';
export const ADD = 'ADD';
export const DETAIL = 'DETAIL';