import axios from 'axios';

import {API_BASE_URL} from "../../utils/constants/url";
import {
    activateAccountFailure,
    activateAccountSuccess,
    forgotPasswordFailure,
    forgotPasswordSuccess,
    loginFailure,
    loginSuccess,
    logoutSuccess,
    registerFailure,
    registerSuccess,
    resetPasswordCodeFailure,
    resetPasswordCodeSuccess,
    resetPasswordFailure,
    resetPasswordSuccess,
    showLoader
} from "../actions/auth-actions";
import {reset} from "../actions/admin-actions";
import {UserData, UserRegistration, UserResetPasswordData} from "../../types/types";
import {Dispatch} from "redux";

export const login = (userData: UserData, history: any) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/auth/login", userData);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.userRole);
        localStorage.setItem("isLoggedIn", "true");

        dispatch(loginSuccess(response.data.userRole));
        history.push("/account");
    } catch (error) {
        dispatch(loginFailure(error.response.data));
    }
};

export const registration = (userRegistrationData: UserRegistration) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios.post(API_BASE_URL + "/registration", userRegistrationData);
        dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFailure(error.response.data));
    }
};

export const logout = () => async (dispatch: Dispatch) => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    dispatch(logoutSuccess());
};

export const activateAccount = (code: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(API_BASE_URL + "/registration/activate/" + code);
        dispatch(activateAccountSuccess(response.data));
    } catch (error) {
        dispatch(activateAccountFailure(error.response.data));
    }
};

export const forgotPassword = (email: { email: string }) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios.post(API_BASE_URL + "/auth/forgot", email);
        dispatch(forgotPasswordSuccess(response.data));
    } catch (error) {
        dispatch(forgotPasswordFailure(error.response.data));
    }
};

export const fetchResetPasswordCode = (code: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(API_BASE_URL + "/auth/reset/" + code);
        dispatch(resetPasswordCodeSuccess(response.data));
    } catch (error) {
        dispatch(resetPasswordCodeFailure(error.response.data));
    }
};

export const resetPassword = (data: UserResetPasswordData, history: any) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/auth/reset", data);
        dispatch(resetPasswordSuccess(response.data));
        history.push("/login");
    } catch (error) {
        dispatch(resetPasswordFailure(error.response.data));
    }
};

export const formReset = () => async (dispatch: Dispatch) => {
    dispatch(reset());
};
