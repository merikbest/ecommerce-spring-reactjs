import { PerfumeErrors, User } from "../../types/types";
import {
    AddPerfumeFailureActionType,
    AddPerfumeSuccessActionType,
    FETCH_ALL_USERS_BY_QUERY_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_USER_INFO_BY_QUERY_SUCCESS,
    FETCH_USER_INFO_SUCCESS,
    FORM_RESET,
    FormResetActionType,
    GetAllUsersActionType,
    GetAllUsersByQueryActionType,
    GetUserInfoActionType,
    GetUserInfoByQueryActionType,
    LOADING_DATA,
    LoadingDataActionType,
    PERFUME_ADDED_FAILURE,
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_FAILURE,
    PERFUME_UPDATED_SUCCESS,
    UpdatePerfumeFailureActionType,
    UpdatePerfumeSuccessActionType
} from "./admin-action-types";

export const loadingData = (): LoadingDataActionType => ({
    type: LOADING_DATA
});

export const addPerfumeSuccess = (): AddPerfumeSuccessActionType => ({
    type: PERFUME_ADDED_SUCCESS
});

export const addPerfumeFailure = (error: PerfumeErrors): AddPerfumeFailureActionType => ({
    type: PERFUME_ADDED_FAILURE,
    payload: error
});

export const updatePerfumeSuccess = (): UpdatePerfumeSuccessActionType => ({
    type: PERFUME_UPDATED_SUCCESS
});

export const updatePerfumeFailure = (error: PerfumeErrors): UpdatePerfumeFailureActionType => ({
    type: PERFUME_UPDATED_FAILURE,
    payload: error
});

export const getAllUsers = (users: Array<User>): GetAllUsersActionType => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload: users
});

export const getUserInfo = (user: User): GetUserInfoActionType => ({
    type: FETCH_USER_INFO_SUCCESS,
    payload: user
});

export const formReset = (): FormResetActionType => ({
    type: FORM_RESET
});

export const getUserInfoByQuery = (user: User): GetUserInfoByQueryActionType => ({
    type: FETCH_USER_INFO_BY_QUERY_SUCCESS,
    payload: user
});

export const getAllUsersByQuery = (users: Array<User>): GetAllUsersByQueryActionType => ({
    type: FETCH_ALL_USERS_BY_QUERY_SUCCESS,
    payload: users
});
