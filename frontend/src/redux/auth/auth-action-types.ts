import { AuthErrors, LoadingStatus } from "../../types/types";

export const ACTIVATE_ACCOUNT_FAILURE = "auth/ACTIVATE_ACCOUNT_FAILURE";
export const ACTIVATE_ACCOUNT_SUCCESS = "auth/ACTIVATE_ACCOUNT_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "auth/FORGOT_PASSWORD_FAILURE";
export const FORGOT_PASSWORD_SUCCESS = "auth/FORGOT_PASSWORD_SUCCESS";
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE";
export const REGISTER_FAILURE = "auth/REGISTER_FAILURE";
export const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
export const RESET_PASSWORD_CODE_FAILURE = "auth/RESET_PASSWORD_CODE_FAILURE";
export const RESET_PASSWORD_CODE_SUCCESS = "auth/RESET_PASSWORD_CODE_SUCCESS";
export const RESET_PASSWORD_FAILURE = "auth/RESET_PASSWORD_FAILURE";
export const RESET_PASSWORD_SUCCESS = "auth/RESET_PASSWORD_SUCCESS";
export const SET_AUTH_LOADING_STATE = "auth/SET_AUTH_LOADING_STATE";
export const RESET_AUTH_STATE = "auth/RESET_AUTH_STATE";

export type LoginFailureActionType = {
    type: typeof LOGIN_FAILURE;
    payload: string;
};

export type SetAuthLoadingStateActionType = {
    type: typeof SET_AUTH_LOADING_STATE;
    payload: LoadingStatus;
};

export type RegisterSuccessActionType = {
    type: typeof REGISTER_SUCCESS;
};

export type RegisterFailureActionType = {
    type: typeof REGISTER_FAILURE;
    payload: AuthErrors;
};

export type ActivateAccountSuccessActionType = {
    type: typeof ACTIVATE_ACCOUNT_SUCCESS;
    payload: string;
};

export type ActivateAccountFailureActionType = {
    type: typeof ACTIVATE_ACCOUNT_FAILURE;
    payload: string;
};

export type ForgotPasswordSuccessActionType = {
    type: typeof FORGOT_PASSWORD_SUCCESS;
    payload: string;
};

export type ForgotPasswordFailureActionType = {
    type: typeof FORGOT_PASSWORD_FAILURE;
    payload: string;
};

export type ResetPasswordCodeSuccessActionType = {
    type: typeof RESET_PASSWORD_CODE_SUCCESS;
    payload: string;
};

export type ResetPasswordCodeFailureActionType = {
    type: typeof RESET_PASSWORD_CODE_FAILURE;
    payload: string;
};

export type ResetPasswordSuccessActionType = {
    type: typeof RESET_PASSWORD_SUCCESS;
    payload: string;
};

export type ResetPasswordFailureActionType = {
    type: typeof RESET_PASSWORD_FAILURE;
    payload: AuthErrors;
};

export type ResetAuthStateActionType = {
    type: typeof RESET_AUTH_STATE;
};

export type AuthActionTypes =
    | LoginFailureActionType
    | SetAuthLoadingStateActionType
    | RegisterSuccessActionType
    | RegisterFailureActionType
    | ActivateAccountSuccessActionType
    | ActivateAccountFailureActionType
    | ForgotPasswordSuccessActionType
    | ForgotPasswordFailureActionType
    | ResetPasswordCodeSuccessActionType
    | ResetPasswordCodeFailureActionType
    | ResetPasswordSuccessActionType
    | ResetPasswordFailureActionType
    | ResetAuthStateActionType;
