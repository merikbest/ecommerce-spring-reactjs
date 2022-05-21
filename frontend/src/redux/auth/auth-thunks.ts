import { Dispatch } from "redux";
import { History, LocationState } from "history";

import {
    activateAccountFailure,
    activateAccountSuccess,
    forgotPasswordFailure,
    forgotPasswordSuccess,
    loginFailure,
    loginSuccess,
    registerFailure,
    registerSuccess,
    resetPasswordCodeFailure,
    resetPasswordCodeSuccess,
    resetPasswordFailure,
    resetPasswordSuccess,
    showLoader
} from "./auth-actions";
import { UserData, UserRegistration, UserResetPasswordData } from "../../types/types";
import RequestService from "../../utils/request-service";
import { AUTH_FORGOT, AUTH_LOGIN, AUTH_RESET, REGISTRATION, REGISTRATION_ACTIVATE } from "../../constants/urlConstants";
import { ACCOUNT, LOGIN } from "../../constants/routeConstants";

export const login = (userData: UserData, history: History<LocationState>) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post(AUTH_LOGIN, userData);
        localStorage.setItem("token", response.data.token);
        dispatch(loginSuccess(response.data.userRole));
        history.push(ACCOUNT);
    } catch (error) {
        dispatch(loginFailure(error.response.data));
    }
};

export const registration = (userRegistrationData: UserRegistration) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        await RequestService.post(REGISTRATION, userRegistrationData);
        dispatch(registerSuccess());
    } catch (error) {
        dispatch(registerFailure(error.response.data));
    }
};

export const activateAccount = (code: string) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.get(`${REGISTRATION_ACTIVATE}/${code}`);
        dispatch(activateAccountSuccess(response.data));
    } catch (error) {
        dispatch(activateAccountFailure(error.response.data));
    }
};

export const forgotPassword = (email: { email: string }) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await RequestService.post(AUTH_FORGOT, email);
        dispatch(forgotPasswordSuccess(response.data));
    } catch (error) {
        dispatch(forgotPasswordFailure(error.response.data));
    }
};

export const fetchResetPasswordCode = (code: string) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.get(`${AUTH_RESET}/${code}`);
        dispatch(resetPasswordCodeSuccess(response.data));
    } catch (error) {
        dispatch(resetPasswordCodeFailure(error.response.data));
    }
};

export const resetPassword =
    (data: UserResetPasswordData, history: History<LocationState>) => async (dispatch: Dispatch) => {
        try {
            const response = await RequestService.post(AUTH_RESET, data);
            dispatch(resetPasswordSuccess(response.data));
            history.push(LOGIN);
        } catch (error) {
            dispatch(resetPasswordFailure(error.response.data));
        }
    };
