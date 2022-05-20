import {PerfumeErrors, User} from "../../types/types";

export const LOADING_DATA = "admin/LOADING_DATA";
export const FETCH_ALL_USERS_SUCCESS = "admin/FETCH_ALL_USERS_SUCCESS";
export const FETCH_USER_INFO_SUCCESS = "admin/FETCH_USER_INFO_SUCCESS";
export const FORM_RESET = "admin/FORM_RESET";
export const PERFUME_ADDED_FAILURE = "admin/PERFUME_ADDED_FAILURE";
export const PERFUME_ADDED_SUCCESS = "admin/PERFUME_ADDED_SUCCESS";
export const PERFUME_UPDATED_FAILURE = "admin/PERFUME_UPDATED_FAILURE";
export const PERFUME_UPDATED_SUCCESS = "admin/PERFUME_UPDATED_SUCCESS";
export const FETCH_USER_INFO_BY_QUERY_SUCCESS = "admin/FETCH_USER_INFO_BY_QUERY_SUCCESS";
export const FETCH_ALL_USERS_BY_QUERY_SUCCESS = "admin/FETCH_ALL_USERS_BY_QUERY_SUCCESS";

export type LoadingDataActionType = {
    type: typeof LOADING_DATA
};

export type AddPerfumeSuccessActionType = {
    type: typeof PERFUME_ADDED_SUCCESS
};
export type AddPerfumeFailureActionType = {
    type: typeof PERFUME_ADDED_FAILURE,
    payload: PerfumeErrors
};

export type UpdatePerfumeSuccessActionType = {
    type: typeof PERFUME_UPDATED_SUCCESS
};

export type UpdatePerfumeFailureActionType = {
    type: typeof PERFUME_UPDATED_FAILURE,
    payload: PerfumeErrors
};

export type GetAllUsersActionType = {
    type: typeof FETCH_ALL_USERS_SUCCESS,
    payload: Array<User>
};

export type GetUserInfoActionType = {
    type: typeof FETCH_USER_INFO_SUCCESS,
    payload: User
};

export type ResetActionType = {
    type: typeof FORM_RESET
};

export type GetUserInfoByQueryActionType = {
    type: typeof FETCH_USER_INFO_BY_QUERY_SUCCESS,
    payload: User
};

export type GetAllUsersByQueryActionType = {
    type: typeof FETCH_ALL_USERS_BY_QUERY_SUCCESS,
    payload: Array<User>
};

export type AdminActionTypes =
    | LoadingDataActionType
    | AddPerfumeSuccessActionType
    | AddPerfumeFailureActionType
    | UpdatePerfumeSuccessActionType
    | UpdatePerfumeFailureActionType
    | GetAllUsersActionType
    | GetUserInfoActionType
    | ResetActionType
    | GetUserInfoByQueryActionType
    | GetAllUsersByQueryActionType;
