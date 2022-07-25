import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FullPerfumeResponse, LoadingStatus, ReviewResponse } from "../../types/types";
import { fetchPerfume, fetchPerfumeByQuery, fetchReviewsByPerfumeId } from "./perfume-thunks";

export interface PerfumeState {
    perfume: Partial<FullPerfumeResponse>;
    reviews: Array<ReviewResponse>;
    errorMessage: string;
    loadingState: LoadingStatus;
}

export const initialState: PerfumeState = {
    perfume: {},
    reviews: [],
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};

export const perfumeSlice = createSlice({
    name: "perfume",
    initialState,
    reducers: {
        setPerfume(state, action: PayloadAction<FullPerfumeResponse>) {
            state.perfume = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        setReview(state, action: PayloadAction<ReviewResponse>) {
            state.reviews = [...state.reviews, action.payload];
            state.loadingState = LoadingStatus.LOADED;
        },
        resetPerfumeState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPerfume.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfume.fulfilled, (state, action) => {
            state.perfume = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfume.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
        builder.addCase(fetchReviewsByPerfumeId.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfumeByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchPerfumeByQuery.fulfilled, (state, action) => {
            state.perfume = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchPerfumeByQuery.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
    }
});

export const { setPerfume, setReview, resetPerfumeState } = perfumeSlice.actions;
export default perfumeSlice.reducer;
