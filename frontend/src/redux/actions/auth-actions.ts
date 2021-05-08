import {AuthErrors, User} from "../../types/types";
import {
    ACTIVATE_ACCOUNT_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    RESET_PASSWORD_CODE_FAILURE,
    RESET_PASSWORD_CODE_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    SHOW_LOADER,
    ActivateAccountFailureActionType,
    ActivateAccountSuccessActionType,
    ForgotPasswordFailureActionType,
    ForgotPasswordSuccessActionType,
    LoginFailureActionType,
    LoginSuccessActionType,
    LogoutSuccessActionType,
    RegisterFailureActionType,
    RegisterSuccessActionType,
    ResetPasswordCodeFailureActionType,
    ResetPasswordCodeSuccessActionType,
    ResetPasswordFailureActionType,
    ResetPasswordSuccessActionType,
    ShowLoaderActionType
} from "../action-types/auth-action-types";

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

