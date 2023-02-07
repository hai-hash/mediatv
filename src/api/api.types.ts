export enum ResponseCode {
    SUCCESS = 200,
    UNAUTHORIZED = 401,
    PERMISSION = 403,
    SERVER_ERROR = 500
}

export interface IMetaData {
    currentPage: number;
    itemPage: number;
    total: number;
    totalPage: number;
}

export interface ResponseBase<T> {
    code: ResponseCode;
    success: boolean;
    message?: string;

    content: T;
    metadata: IMetaData;
}

export interface DataResponseError {
    code: ResponseCode;
    success: boolean;
    message?: string;

    content: ResponseErrorCommon;
}

export interface ErrorObject {
    property: string;
    message: string[];
}

export interface ResponseErrorCommon {
    constraints?: ErrorObject[];
    errorType?: string;
    messageContent?: string;
    name?: string;
    statusCode?: ResponseCode;
}
