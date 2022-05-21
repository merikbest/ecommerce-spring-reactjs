import { AuthErrors, User } from "../../types/types";
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
    LOGIN_SUCCESS,
    LoginFailureActionType,
    LoginSuccessActionType,
    LOGOUT_SUCCESS,
    LogoutSuccessActionType,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    RegisterFailureActionType,
    RegisterSuccessActionType,
    RESET_PASSWORD_CODE_FAILURE,
    RESET_PASSWORD_CODE_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    ResetPasswordCodeFailureActionType,
    ResetPasswordCodeSuccessActionType,
    ResetPasswordFailureActionType,
    ResetPasswordSuccessActionType,
    SHOW_LOADER,
    ShowLoaderActionType
} from "./auth-action-types";

export const loginSuccess = (userRole: string): LoginSuccessActionType => ({
    type: LOGIN_SUCCESS,
    payload: userRole
});

export const loginFailure = (error: string): LoginFailureActionType => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const showLoader = (): ShowLoaderActionType => ({
    type: SHOW_LOADER
});

export const registerSuccess = (): RegisterSuccessActionType => ({
    type: REGISTER_SUCCESS
});

export const registerFailure = (errors: AuthErrors): RegisterFailureActionType => ({
    type: REGISTER_FAILURE,
    payload: errors
});

export const logoutSuccess = (): LogoutSuccessActionType => ({
    type: LOGOUT_SUCCESS
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

export const resetPasswordCodeSuccess = (user: User): ResetPasswordCodeSuccessActionType => ({
    type: RESET_PASSWORD_CODE_SUCCESS,
    payload: user
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
