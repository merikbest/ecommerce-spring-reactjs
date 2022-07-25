import { createAsyncThunk } from "@reduxjs/toolkit";
import { History, LocationState } from "history";

import { AuthErrors, UserResponse, UserData, UserRegistration, UserResetPasswordRequest } from "../../types/types";
import RequestService from "../../utils/request-service";
import { AUTH_FORGOT, AUTH_LOGIN, AUTH_RESET, REGISTRATION, REGISTRATION_ACTIVATE } from "../../constants/urlConstants";
import { ACCOUNT, LOGIN } from "../../constants/routeConstants";
import { setUser } from "../user/user-slice";

export const login = createAsyncThunk<
    UserResponse,
    { userData: UserData; history: History<LocationState> },
    { rejectValue: string }
>("auth/login", async ({ userData, history }, thunkApi) => {
    try {
        const response = await RequestService.post(AUTH_LOGIN, userData);
        localStorage.setItem("token", response.data.token);
        history.push(ACCOUNT);
        thunkApi.dispatch(setUser(response.data.user));
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

export const registration = createAsyncThunk<{}, UserRegistration, { rejectValue: AuthErrors }>(
    "auth/registration",
    async (userRegistrationData, thunkApi) => {
        try {
            await RequestService.post(REGISTRATION, userRegistrationData);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const activateAccount = createAsyncThunk<string, string, { rejectValue: string }>(
    "auth/activateAccount",
    async (code, thunkApi) => {
        try {
            const response = await RequestService.get(`${REGISTRATION_ACTIVATE}/${code}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const forgotPassword = createAsyncThunk<string, string, { rejectValue: string }>(
    "auth/forgotPassword",
    async (email, thunkApi) => {
        try {
            const response = await RequestService.get(`${AUTH_FORGOT}/${email}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const fetchResetPasswordCode = createAsyncThunk<string, string, { rejectValue: string }>(
    "auth/fetchResetPasswordCode",
    async (code, thunkApi) => {
        try {
            const response = await RequestService.get(`${AUTH_RESET}/${code}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const resetPassword = createAsyncThunk<
    string,
    { request: UserResetPasswordRequest; history: History<LocationState> },
    { rejectValue: AuthErrors }
>("auth/resetPassword", async ({ request, history }, thunkApi) => {
    try {
        const response = await RequestService.post(AUTH_RESET, request);
        history.push(LOGIN);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});
