import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    AuthErrors,
    ReviewError,
    ReviewRequest,
    UserEditErrors,
    UserEditRequest,
    UserResetPasswordRequest,
    UserResponse
} from "../../types/types";
import RequestService from "../../utils/request-service";
import { AUTH_EDIT_PASSWORD, REVIEW, USERS, USERS_GRAPHQL } from "../../constants/urlConstants";
import { userByQuery } from "../../utils/graphql-query/users-query";

export const fetchUserInfo = createAsyncThunk<UserResponse>("user/fetchUserInfo", async () => {
    const response = await RequestService.get(USERS, true);
    return response.data;
});

export const updateUserInfo = createAsyncThunk<UserResponse, UserEditRequest, { rejectValue: UserEditErrors }>(
    "user/updateUserInfo",
    async (request, thunkApi) => {
        try {
            const response = await RequestService.put(USERS, request, true);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const updateUserPassword = createAsyncThunk<string, UserResetPasswordRequest, { rejectValue: AuthErrors }>(
    "user/updateUserPassword",
    async (request, thunkApi) => {
        try {
            const response = await RequestService.put(AUTH_EDIT_PASSWORD, request, true);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const addReviewToPerfume = createAsyncThunk<{}, ReviewRequest, { rejectValue: ReviewError }>(
    "user/addReviewToPerfume",
    async (request, thunkApi) => {
        try {
            return await RequestService.post(REVIEW, request);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

// GraphQL query
export const fetchUserInfoByQuery = createAsyncThunk<UserResponse, string>(
    "user/fetchUserInfoByQuery",
    async (userId) => {
        const response = await RequestService.post(USERS_GRAPHQL, { query: userByQuery(userId) }, true);
        return response.data.data.user;
    }
);
