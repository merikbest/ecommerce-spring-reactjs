import axios from 'axios';

import {API_BASE_URL} from "../../utils/constants/url";
import {
    activateAccountFailure,
    activateAccountSuccess,
    fetchAccountSuccess,
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

export const login = (data: any, history: any) => async (dispatch: any) => {
    try {
        const response = await axios.post(API_BASE_URL + "/auth/login", data);
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

export const registration = (data: any) => async (dispatch: any) => {
    try {
        dispatch(showLoader());
        const response = await axios.post(API_BASE_URL + "/registration", data);
        dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFailure(error.response.data));
    }
};

export const logout = () => async (dispatch: any) => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    dispatch(logoutSuccess());
};

export const activateAccount = (code: any) => async (dispatch: any) => {
    try {
        const response = await axios.get(API_BASE_URL + "/registration/activate/" + code);
        dispatch(activateAccountSuccess(response.data));
    } catch (error) {
        dispatch(activateAccountFailure(error.response.data));
    }
};

export const forgotPassword = (data: any) => async (dispatch: any) => {
    try {
        dispatch(showLoader());
        const response = await axios.post(API_BASE_URL + "/auth/forgot", data);
        dispatch(forgotPasswordSuccess(response.data));
    } catch (error) {
        dispatch(forgotPasswordFailure(error.response.data));
    }
};

export const fetchResetPasswordCode = (code: any) => async (dispatch: any) => {
    try {
        const response = await axios.get(API_BASE_URL + "/auth/reset/" + code);
        dispatch(resetPasswordCodeSuccess(response.data));
    } catch (error) {
        dispatch(resetPasswordCodeFailure(error.response.data));
    }
};

export const resetPassword = (data: any, history: any) => async (dispatch: any) => {
    try {
        const response = await axios.post(API_BASE_URL + "/auth/reset", data);
        dispatch(resetPasswordSuccess(response.data));
        history.push("/login");
    } catch (error) {
        dispatch(resetPasswordFailure(error.response.data));
    }
};

export const formReset = () => async (dispatch: any) => {
    dispatch(reset());
};

export const fetchAccount = () => async (dispatch: any) => {
    const userRole: string | null = localStorage.getItem("userRole");
    dispatch(fetchAccountSuccess(userRole));
};
