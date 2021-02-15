import {Order, Perfume, PerfumeErrors, User} from "../../types/types";
import {
    FETCH_ALL_USERS_ORDERS_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_PERFUMES,
    FETCH_USER_SUCCESS,
    FORM_RESET,
    PERFUME_ADDED_FAILURE,
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_FAILURE,
    PERFUME_UPDATED_SUCCESS,
    AddPerfumeFailureActionType,
    AddPerfumeSuccessActionType,
    ResetActionType,
    UpdatePerfumeFailureActionType,
    UpdatePerfumeSuccessActionType,
    GetAllUsersActionType,
    GetAllUsersOrdersActionType,
    GetPerfumesActionType,
    GetUserActionType,
} from "../action-types/admin-action-types";

export const getPerfumes = (perfumes: Array<Perfume>): GetPerfumesActionType => ({
    type: FETCH_PERFUMES,
    payload: perfumes
});

export const addPerfumeSuccess = (): AddPerfumeSuccessActionType => ({
    type: PERFUME_ADDED_SUCCESS
});

export const addPerfumeFailure = (error: PerfumeErrors): AddPerfumeFailureActionType => ({
    type: PERFUME_ADDED_FAILURE,
    payload: error
});

export const updatePerfumeSuccess = (perfume: Perfume): UpdatePerfumeSuccessActionType => ({
    type: PERFUME_UPDATED_SUCCESS,
    payload: perfume
});

export const updatePerfumeFailure = (error: PerfumeErrors): UpdatePerfumeFailureActionType => ({
    type: PERFUME_UPDATED_FAILURE,
    payload: error
});

export const getAllUsersOrders = (orders: Array<Order>): GetAllUsersOrdersActionType => ({
    type: FETCH_ALL_USERS_ORDERS_SUCCESS,
    payload: orders
});

export const getAllUsers = (users: Array<User>): GetAllUsersActionType => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload: users
});

export const getUser = (user: User): GetUserActionType => ({
    type: FETCH_USER_SUCCESS,
    payload: user
});

export const reset = (): ResetActionType => ({
    type: FORM_RESET
});
