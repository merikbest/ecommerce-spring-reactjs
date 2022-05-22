import { AuthErrors, LoadingStatus } from "../../types/types";
import {
    ACTIVATE_ACCOUNT_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    ActivateAccountFailureActionType,
    ActivateAccountSuccessActionType,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    ForgotPasswordFailureActionType,
    ForgotPasswordSuccessActionType,
    LOGIN_FAILURE,
    LoginFailureActionType,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    RegisterFailureActionType,
    RegisterSuccessActionType,
    RESET_AUTH_STATE,
    RESET_PASSWORD_CODE_FAILURE,
    RESET_PASSWORD_CODE_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    ResetAuthStateActionType,
    ResetPasswordCodeFailureActionType,
    ResetPasswordCodeSuccessActionType,
    ResetPasswordFailureActionType,
    ResetPasswordSuccessActionType,
    SET_AUTH_LOADING_STATE,
    SetAuthLoadingStateActionType
} from "./auth-action-types";

export const loginFailure = (error: string): LoginFailureActionType => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const setAuthLoadingState = (status: LoadingStatus): SetAuthLoadingStateActionType => ({
    type: SET_AUTH_LOADING_STATE,
    payload: status
});

export const registerSuccess = (): RegisterSuccessActionType => ({
    type: REGISTER_SUCCESS
});

export const registerFailure = (errors: AuthErrors): RegisterFailureActionType => ({
    type: REGISTER_FAILURE,
    payload: errors
});

export const activateAccountSuccess = (message: string): ActivateAccountSuccessActionType => ({
    type: ACTIVATE_ACCOUNT_SUCCESS,
    payload: message
});

export const activateAccountFailure = (error: string): ActivateAccountFailureActionType => ({
    type: ACTIVATE_ACCOUNT_FAILURE,
    payload: error
});

export const forgotPasswordSuccess = (message: string): ForgotPasswordSuccessActionType => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: message
});

export const forgotPasswordFailure = (error: string): ForgotPasswordFailureActionType => ({
    type: FORGOT_PASSWORD_FAILURE,
    payload: error
});

export const resetPasswordCodeSuccess = (email: string): ResetPasswordCodeSuccessActionType => ({
    type: RESET_PASSWORD_CODE_SUCCESS,
    payload: email
});

export const resetPasswordCodeFailure = (error: string): ResetPasswordCodeFailureActionType => ({
    type: RESET_PASSWORD_CODE_FAILURE,
    payload: error
});

export const resetPasswordSuccess = (message: string): ResetPasswordSuccessActionType => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: message
});

export const resetPasswordFailure = (errors: AuthErrors): ResetPasswordFailureActionType => ({
    type: RESET_PASSWORD_FAILURE,
    payload: errors
});

export const resetAuthState = (): ResetAuthStateActionType => ({
    type: RESET_AUTH_STATE
});
