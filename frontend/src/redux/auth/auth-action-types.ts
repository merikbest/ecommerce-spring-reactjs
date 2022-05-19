import {AuthErrors, User} from "../../types/types";
import {ResetActionType} from "../admin/admin-action-types";

export const ACTIVATE_ACCOUNT_FAILURE = "auth/ACTIVATE_ACCOUNT_FAILURE";
export const ACTIVATE_ACCOUNT_SUCCESS = "auth/ACTIVATE_ACCOUNT_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "auth/FORGOT_PASSWORD_FAILURE";
export const FORGOT_PASSWORD_SUCCESS = "auth/FORGOT_PASSWORD_SUCCESS";
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
export const REGISTER_FAILURE = "auth/REGISTER_FAILURE";
export const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
export const RESET_PASSWORD_CODE_FAILURE = "auth/RESET_PASSWORD_CODE_FAILURE";
export const RESET_PASSWORD_CODE_SUCCESS = "auth/RESET_PASSWORD_CODE_SUCCESS";
export const RESET_PASSWORD_FAILURE = "auth/RESET_PASSWORD_FAILURE";
export const RESET_PASSWORD_SUCCESS = "auth/RESET_PASSWORD_SUCCESS";
export const SHOW_LOADER = "SHOW_LOADER";

export type LoginSuccessActionType = {
    type: typeof LOGIN_SUCCESS,
    payload: string
};
export type LoginFailureActionType = {
    type: typeof LOGIN_FAILURE, 
    payload: string
};
export type ShowLoaderActionType = {
    type: typeof SHOW_LOADER
};
export type RegisterSuccessActionType = {
    type: typeof REGISTER_SUCCESS
};
export type RegisterFailureActionType = {
    type: typeof REGISTER_FAILURE, 
    payload: AuthErrors
};
export type LogoutSuccessActionType = {
    type: typeof LOGOUT_SUCCESS
};
export type ActivateAccountSuccessActionType = {
    type: typeof ACTIVATE_ACCOUNT_SUCCESS,
    payload: string
};
export type ActivateAccountFailureActionType = {
    type: typeof ACTIVATE_ACCOUNT_FAILURE,
    payload: string
};
export type ForgotPasswordSuccessActionType = {
    type: typeof FORGOT_PASSWORD_SUCCESS,
    payload: string
};
export type ForgotPasswordFailureActionType = {
    type: typeof FORGOT_PASSWORD_FAILURE,
    payload: string
};
export type ResetPasswordCodeSuccessActionType = {
    type: typeof RESET_PASSWORD_CODE_SUCCESS,
    payload: User
};
export type ResetPasswordCodeFailureActionType = {
    type: typeof RESET_PASSWORD_CODE_FAILURE,
    payload: string
};
export type ResetPasswordSuccessActionType = {
    type: typeof RESET_PASSWORD_SUCCESS,
    payload: string
};
export type ResetPasswordFailureActionType = {
    type: typeof RESET_PASSWORD_FAILURE,
    payload: AuthErrors
};

export type AuthActionTypes = 
    | LoginSuccessActionType 
    | LoginFailureActionType 
    | ShowLoaderActionType 
    | RegisterSuccessActionType 
    | RegisterFailureActionType 
    | LogoutSuccessActionType 
    | ActivateAccountSuccessActionType 
    | ActivateAccountFailureActionType 
    | ForgotPasswordSuccessActionType 
    | ForgotPasswordFailureActionType 
    | ResetPasswordCodeSuccessActionType 
    | ResetPasswordCodeFailureActionType 
    | ResetPasswordSuccessActionType 
    | ResetPasswordFailureActionType 
    | ResetActionType;
