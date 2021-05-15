import {Order, PerfumeErrors, User} from "../../types/types";
import {
    FETCH_ALL_USERS_ORDERS_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    FORM_RESET,
    PERFUME_ADDED_FAILURE,
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_FAILURE,
    PERFUME_UPDATED_SUCCESS,
    FETCH_ALL_USERS_BY_QUERY_SUCCESS,
    FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS,
    FETCH_USER_INFO_BY_QUERY_SUCCESS,
    FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    LOADING_DATA,
    GetAllUsersActionType,
    GetAllUsersOrdersActionType,
    GetUserInfoActionType,
    GetUserOrdersActionType,
    ResetActionType,
    UpdatePerfumeFailureActionType,
    UpdatePerfumeSuccessActionType,
    AddPerfumeFailureActionType,
    AddPerfumeSuccessActionType,
    GetAllUsersByQueryActionType,
    GetAllUsersOrdersByQueryActionType,
    GetUserOrdersByQueryActionType,
    GetUserInfoByQueryActionType,
    LoadingDataActionType
} from "../action-types/admin-action-types";

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

export const getAllUsersOrders = (orders: Array<Order>): GetAllUsersOrdersActionType => ({
    type: FETCH_ALL_USERS_ORDERS_SUCCESS,
    payload: orders
});

export const getUserOrders = (orders: Array<Order>): GetUserOrdersActionType => ({
    type: FETCH_USER_ORDERS_SUCCESS,
    payload: orders
});

export const getAllUsers = (users: Array<User>): GetAllUsersActionType => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload: users
});

export const getUserInfo = (user: User): GetUserInfoActionType => ({
    type: FETCH_USER_INFO_SUCCESS,
    payload: user
});

export const reset = (): ResetActionType => ({
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

export const getAllUsersOrdersByQuery = (orders: Array<Order>): GetAllUsersOrdersByQueryActionType => ({
    type: FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS,
    payload: orders
});

export const getUserOrdersByQuery = (orders: Array<Order>): GetUserOrdersByQueryActionType => ({
    type: FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    payload: orders
});
