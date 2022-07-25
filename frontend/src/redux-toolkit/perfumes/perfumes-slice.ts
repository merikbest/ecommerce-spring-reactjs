import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingStatus, PerfumeResponse } from "../../types/types";
import {
    fetchPerfumes,
    fetchPerfumesByFilterParams,
    fetchPerfumesByIds,
    fetchPerfumesByIdsQuery,
    fetchPerfumesByInputText,
    fetchPerfumesByQuery
} from "./perfumes-thunks";

export interface PerfumesState {
    perfumes: Array<PerfumeResponse>;
    pagesCount: number;
    totalElements: number;
    loadingState: LoadingStatus;
}

export const initialState: PerfumesState = {
    perfumes: [],
    pagesCount: 1,
    totalElements: 0,
    loadingState: LoadingStatus.LOADING
};

export const perfumesSlice = createSlice({
    name: "perfumes",
    initialState,
    reducers: {
        setPerfumes(state, action: PayloadAction<Array<PerfumeResponse>>) {
            state.perfumes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        removePerfumeById(state, action: PayloadAction<number>) {
            state.perfumes = state.perfumes.filter((perfume) => perfume.id !== action.payload);
            state.loadingState = LoadingStatus.LOADED;
        },
        resetPerfumesState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPerfumes.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumes.fulfilled, (state, action) => {
            state.perfumes = action.payload.items;
            state.pagesCount = action.payload.pagesCount;
            state.totalElements = action.payload.totalElements;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfumesByIds.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumesByIds.fulfilled, (state, action) => {
            state.perfumes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfumesByFilterParams.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumesByFilterParams.fulfilled, (state, action) => {
            state.perfumes = action.payload.items;
            state.pagesCount = action.payload.pagesCount;
            state.totalElements = action.payload.totalElements;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfumesByInputText.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumesByInputText.fulfilled, (state, action) => {
            state.perfumes = action.payload.items;
            state.pagesCount = action.payload.pagesCount;
            state.totalElements = action.payload.totalElements;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfumesByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumesByQuery.fulfilled, (state, action) => {
            state.perfumes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfumesByIdsQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumesByIdsQuery.fulfilled, (state, action) => {
            state.perfumes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const { setPerfumes, removePerfumeById, resetPerfumesState } = perfumesSlice.actions;
export default perfumesSlice.reducer;
