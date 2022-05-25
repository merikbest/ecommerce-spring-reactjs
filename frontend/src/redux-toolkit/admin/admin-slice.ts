import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingStatus, PerfumeErrors, User } from "../../types/types";
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
    users: Array<User>;
    user: Partial<User>;
    errors: Partial<PerfumeErrors>;
    isPerfumeAdded: boolean;
    isPerfumeEdited: boolean;
    isPerfumeDeleted: boolean;
    loadingState: LoadingStatus;
}

const initialState: AdminState = {
    users: [],
    user: {},
    errors: {},
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
        addPerfumeSuccess(state) {
            state.isPerfumeAdded = true;
            state.errors = {};
            state.loadingState = LoadingStatus.LOADED;
        },
        addPerfumeFailure(state, action: PayloadAction<PerfumeErrors>) {
            state.isPerfumeAdded = false;
            state.errors = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        updatePerfumeSuccess(state) {
            state.isPerfumeEdited = true;
            state.errors = {};
            state.loadingState = LoadingStatus.LOADED;
        },
        updatePerfumeFailure(state, action: PayloadAction<PerfumeErrors>) {
            state.isPerfumeEdited = false;
            state.errors = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        deletePerfumeSuccess(state) {
            state.isPerfumeDeleted = true;
            state.errors = {};
            state.loadingState = LoadingStatus.LOADED;
        },
        setAllUsers(state, action: PayloadAction<Array<User>>) {
            state.users = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        setUserInfo(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        resetAdminState(state) {
            state.users = [];
            state.user = {};
            state.errors = {};
            state.isPerfumeAdded = false;
            state.isPerfumeEdited = false;
            state.isPerfumeDeleted = false;
            state.loadingState = LoadingStatus.LOADING;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addPerfume.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(addPerfume.fulfilled, (state, action) => {
            state.isPerfumeAdded = true;
            state.errors = {};
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(addPerfume.rejected, (state, action) => {
            state.isPerfumeAdded = false;
            state.errors = action.payload!;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(updatePerfume.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(updatePerfume.fulfilled, (state, action) => {
            state.isPerfumeEdited = true;
            state.errors = {};
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(updatePerfume.rejected, (state, action) => {
            state.isPerfumeEdited = false;
            state.errors = action.payload!;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(deletePerfume.fulfilled, (state, action) => {
            state.isPerfumeDeleted = true;
            state.errors = {};
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchUserInfo.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchUserInfoByQuery.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserInfoByQuery.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchAllUsersByQuery.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllUsersByQuery.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const {
    setAdminLoadingState,
    addPerfumeSuccess,
    addPerfumeFailure,
    updatePerfumeSuccess,
    updatePerfumeFailure,
    deletePerfumeSuccess,
    setAllUsers,
    setUserInfo,
    resetAdminState
} = adminSlice.actions;
export default adminSlice.reducer;
