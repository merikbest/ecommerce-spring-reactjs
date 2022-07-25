import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthErrors, LoadingStatus, ReviewError, UserResponse, UserEditErrors } from "../../types/types";
import {
    addReviewToPerfume,
    fetchUserInfo,
    fetchUserInfoByQuery,
    updateUserInfo,
    updateUserPassword
} from "./user-thunks";

export interface UserState {
    user?: UserResponse;
    loadingState: LoadingStatus;
    successMessage: string;
    userEditErrors: Partial<UserEditErrors>;
    userResetPasswordErrors: Partial<AuthErrors>;
    reviewErrors: Partial<ReviewError>;
    isReviewAdded: boolean;
}

export const initialState: UserState = {
    user: undefined,
    loadingState: LoadingStatus.LOADING,
    successMessage: "",
    userEditErrors: {},
    userResetPasswordErrors: {},
    reviewErrors: {},
    isReviewAdded: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserResponse>) {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        resetInputForm(state) {
            state.userResetPasswordErrors = {};
            state.successMessage = "";
            state.userEditErrors = {};
            state.reviewErrors = {};
        },
        logoutSuccess(state) {
            state.user = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            state.userEditErrors = {};
        });
        builder.addCase(updateUserInfo.rejected, (state, action) => {
            state.userEditErrors = action.payload!;
        });
        builder.addCase(updateUserPassword.fulfilled, (state, action) => {
            state.successMessage = action.payload;
            state.userResetPasswordErrors = {};
        });
        builder.addCase(updateUserPassword.rejected, (state, action) => {
            state.userResetPasswordErrors = action.payload!;
        });
        builder.addCase(addReviewToPerfume.fulfilled, (state) => {
            state.reviewErrors = {};
            state.isReviewAdded = true;
        });
        builder.addCase(addReviewToPerfume.rejected, (state, action) => {
            state.reviewErrors = action.payload!;
            state.isReviewAdded = false;
        });
        builder.addCase(fetchUserInfoByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserInfoByQuery.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const { setUser, resetInputForm, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
