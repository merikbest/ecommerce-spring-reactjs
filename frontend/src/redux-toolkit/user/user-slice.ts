import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthErrors, LoadingStatus, ReviewError, User, UserEditErrors } from "../../types/types";
import {
    addReviewToPerfume,
    fetchUserInfo,
    fetchUserInfoByQuery,
    updateUserInfo,
    updateUserPassword
} from "./user-thunks";

export interface UserState {
    user?: User;
    loadingState: LoadingStatus;
    successMessage: string;
    userEditErrors: Partial<UserEditErrors>;
    userResetPasswordErrors: Partial<AuthErrors>;
    reviewErrors: Partial<ReviewError>;
    isReviewAdded: boolean;
}

const initialState: UserState = {
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
        setUserLoadingState(state, action: PayloadAction<LoadingStatus>) {
            state.loadingState = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        setUpdatedUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.userEditErrors = {};
        },
        userUpdatedFailure(state, action: PayloadAction<UserEditErrors>) {
            state.userEditErrors = action.payload;
        },
        userUpdatedPasswordSuccess(state, action: PayloadAction<string>) {
            state.successMessage = action.payload;
            state.userResetPasswordErrors = {};
        },
        userUpdatedPasswordFailure(state, action: PayloadAction<AuthErrors>) {
            state.userResetPasswordErrors = action.payload;
        },
        userAddedReviewSuccess(state) {
            state.reviewErrors = {};
            state.isReviewAdded = true;
        },
        userAddedReviewFailure(state, action: PayloadAction<ReviewError>) {
            state.reviewErrors = action.payload;
            state.isReviewAdded = false;
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
        builder.addCase(addReviewToPerfume.fulfilled, (state, action) => {
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

export const {
    setUserLoadingState,
    setUser,
    setUpdatedUser,
    userUpdatedFailure,
    userUpdatedPasswordSuccess,
    userUpdatedPasswordFailure,
    userAddedReviewSuccess,
    userAddedReviewFailure,
    resetInputForm,
    logoutSuccess
} = userSlice.actions;
export default userSlice.reducer;
