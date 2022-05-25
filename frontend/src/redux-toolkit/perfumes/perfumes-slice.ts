import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingStatus, Perfume } from "../../types/types";
import {
    fetchPerfumes,
    fetchPerfumesByFilterParams,
    fetchPerfumesByGender,
    fetchPerfumesByIds, fetchPerfumesByIdsQuery,
    fetchPerfumesByPerfumer, fetchPerfumesByQuery
} from "./perfumes-thunks";

export interface PerfumesState {
    perfumes: Array<Perfume>;
    loadingState: LoadingStatus;
}

const initialState: PerfumesState = {
    perfumes: [],
    loadingState: LoadingStatus.LOADING
};

export const perfumesSlice = createSlice({
    name: "perfumes",
    initialState,
    reducers: {
        setPerfumesLoadingState(state, action: PayloadAction<LoadingStatus>) {
            state.loadingState = action.payload;
        },
        setPerfumes(state, action: PayloadAction<Array<Perfume>>) {
            state.perfumes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        removePerfumeById(state, action: PayloadAction<number>) {
            state.perfumes = state.perfumes.filter((perfume) => perfume.id !== action.payload);
            state.loadingState = LoadingStatus.LOADED;
        },
        resetPerfumesState(state) {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPerfumes.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumes.fulfilled, (state, action) => {
            state.perfumes = action.payload;
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
            state.perfumes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfumesByGender.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumesByGender.fulfilled, (state, action) => {
            state.perfumes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfumesByPerfumer.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumesByPerfumer.fulfilled, (state, action) => {
            state.perfumes = action.payload;
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

export const { setPerfumesLoadingState, setPerfumes, removePerfumeById, resetPerfumesState } = perfumesSlice.actions;
export default perfumesSlice.reducer;
