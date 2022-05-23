import { LoadingStatus, PerfumeErrors, User } from "../../types/types";

export const SET_ADMIN_LOADING_STATE = "admin/SET_ADMIN_LOADING_STATE";
export const SET_ALL_USERS = "admin/SET_ALL_USERS";
export const SET_USER_INFO = "admin/SET_USER_INFO";
export const RESET_ADMIN_STATE = "admin/RESET_ADMIN_STATE";
export const PERFUME_ADDED_FAILURE = "admin/PERFUME_ADDED_FAILURE";
export const PERFUME_ADDED_SUCCESS = "admin/PERFUME_ADDED_SUCCESS";
export const PERFUME_UPDATED_FAILURE = "admin/PERFUME_UPDATED_FAILURE";
export const PERFUME_UPDATED_SUCCESS = "admin/PERFUME_UPDATED_SUCCESS";
export const PERFUME_DELETED_SUCCESS = "admin/PERFUME_DELETED_SUCCESS";

export type SetAdminLoadingStateActionType = {
    type: typeof SET_ADMIN_LOADING_STATE;
    payload: LoadingStatus;
};

export type AddPerfumeSuccessActionType = {
    type: typeof PERFUME_ADDED_SUCCESS;
};

export type AddPerfumeFailureActionType = {
    type: typeof PERFUME_ADDED_FAILURE;
    payload: PerfumeErrors;
};

export type UpdatePerfumeSuccessActionType = {
    type: typeof PERFUME_UPDATED_SUCCESS;
};

export type UpdatePerfumeFailureActionType = {
    type: typeof PERFUME_UPDATED_FAILURE;
    payload: PerfumeErrors;
};

export type DeletePerfumeSuccessActionType = {
    type: typeof PERFUME_DELETED_SUCCESS;
};

export type SetAllUsersActionType = {
    type: typeof SET_ALL_USERS;
    payload: Array<User>;
};

export type SetUserInfoActionType = {
    type: typeof SET_USER_INFO;
    payload: User;
};

export type ResetAdminStateActionType = {
    type: typeof RESET_ADMIN_STATE;
};

export type AdminActionTypes =
    | SetAdminLoadingStateActionType
    | AddPerfumeSuccessActionType
    | AddPerfumeFailureActionType
    | UpdatePerfumeSuccessActionType
    | UpdatePerfumeFailureActionType
    | DeletePerfumeSuccessActionType
    | SetAllUsersActionType
    | SetUserInfoActionType
    | ResetAdminStateActionType;
