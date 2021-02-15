import {Order, Perfume, PerfumeErrors, User} from "../../types/types";

export const FETCH_ALL_USERS_ORDERS_SUCCESS = "FETCH_ALL_USERS_ORDERS_SUCCESS";
export const FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS";
export const FETCH_PERFUMES = "FETCH_PERFUMES";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FORM_RESET = "FORM_RESET";
export const PERFUME_ADDED_FAILURE = "PERFUME_ADDED_FAILURE";
export const PERFUME_ADDED_SUCCESS = "PERFUME_ADDED_SUCCESS";
export const PERFUME_UPDATED_FAILURE = "PERFUME_UPDATED_FAILURE";
export const PERFUME_UPDATED_SUCCESS = "PERFUME_UPDATED_SUCCESS";

export type GetPerfumesActionType = { type: typeof FETCH_PERFUMES, payload: Array<Perfume> };
export type AddPerfumeSuccessActionType = { type: typeof PERFUME_ADDED_SUCCESS };
export type AddPerfumeFailureActionType = { type: typeof PERFUME_ADDED_FAILURE, payload: PerfumeErrors };
export type UpdatePerfumeSuccessActionType = { type: typeof PERFUME_UPDATED_SUCCESS, payload: Perfume };
export type UpdatePerfumeFailureActionType = { type: typeof PERFUME_UPDATED_FAILURE, payload: PerfumeErrors };
export type GetAllUsersOrdersActionType = { type: typeof FETCH_ALL_USERS_ORDERS_SUCCESS, payload: Array<Order> };
export type GetAllUsersActionType = { type: typeof FETCH_ALL_USERS_SUCCESS, payload: Array<User> };
export type GetUserActionType = { type: typeof FETCH_USER_SUCCESS, payload: User };
export type ResetActionType = { type: typeof FORM_RESET };

export type AdminActionTypes = GetPerfumesActionType | AddPerfumeSuccessActionType | AddPerfumeFailureActionType |
    UpdatePerfumeSuccessActionType | UpdatePerfumeFailureActionType | GetAllUsersOrdersActionType |
    GetAllUsersActionType | GetUserActionType | ResetActionType;
