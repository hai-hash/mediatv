export interface Account {
    id: number,
    username: string,
    fullName?: string,
    email?: string,
    numberPhone?: string,
    role: string,
    expirationDate?: string,
    status: boolean
}

export interface AccountRequest {
    username: string,
    password: string,
    fullName: string,
    email: string,
    numberPhone: string,
    role: string,
}

export interface IAccountParams {
    id?: number,
    username?: string,
    fullName?: string,
    email?: string,
    numberPhone?: string,
    role?: string,
    expirationDate?: string,
    status?: boolean
}

export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    role: string,
    username: string,
    fullName: string,
    email: string,
    numberPhone: string,
    token: string
}

export interface SignUpRequest {
    username: string,
    password: string,
    fullName: string,
    email: string,
    numberPhone: string
}

export const DISPLAY = 'DISPLAY';
export const EDIT = 'EDIT';
export const ADD = 'ADD';