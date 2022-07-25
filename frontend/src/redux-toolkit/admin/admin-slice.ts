import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BaseUserResponse, LoadingStatus, PerfumeErrors, UserResponse } from "../../types/types";
import {
    addPerfume,
    deletePerfume,
    fetchAllUsers,
    fetchAllUsersByQuery,
    fetchUserInfo,
    fetchUserInfoByQuery,
    updatePerfume
} from "./admin-thunks";

export interface AdminState {
    users: Array<BaseUserResponse>;
    user: Partial<UserResponse>;
    errors: Partial<PerfumeErrors>;
    pagesCount: number;
    totalElements: number;
    isPerfumeAdded: boolean;
    isPerfumeEdited: boolean;
    isPerfumeDeleted: boolean;
    loadingState: LoadingStatus;
}

export const initialState: AdminState = {
    users: [],
    user: {},
    errors: {},
    pagesCount: 1,
    totalElements: 0,
    isPerfumeAdded: false,
    isPerfumeEdited: false,
    isPerfumeDeleted: false,
    loadingState: LoadingStatus.LOADING
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminLoadingState(state, action: PayloadAction<LoadingStatus>) {
            state.loadingState = action.payload;
        },
        resetAdminState(state, action: PayloadAction<LoadingStatus>) {
            state.users = [];
            state.user = {};
            state.errors = {};
            state.isPerfumeAdded = false;
            state.isPerfumeEdited = false;
            state.isPerfumeDeleted = false;
            state.pagesCount = 1;
            state.totalElements = 0;
            state.loadingState = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addPerfume.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(addPerfume.fulfilled, (state) => {
            state.isPerfumeAdded = true;
            state.errors = {};
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(addPerfume.rejected, (state, action) => {
            state.isPerfumeAdded = false;
            state.errors = action.payload!;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(updatePerfume.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(updatePerfume.fulfilled, (state) => {
            state.isPerfumeEdited = true;
            state.errors = {};
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(updatePerfume.rejected, (state, action) => {
            state.isPerfumeEdited = false;
            state.errors = action.payload!;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(deletePerfume.fulfilled, (state) => {
            state.isPerfumeDeleted = true;
            state.errors = {};
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.pagesCount = action.payload.pagesCount;
            state.totalElements = action.payload.totalElements;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchUserInfo.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchUserInfoByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserInfoByQuery.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchAllUsersByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllUsersByQuery.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const { setAdminLoadingState, resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
