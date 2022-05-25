import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingStatus, Perfume, Review } from "../../types/types";
import {fetchPerfume, fetchPerfumeByQuery, fetchReviewsByPerfumeId} from "./perfume-thunks";

export interface PerfumeState {
    perfume: Partial<Perfume>;
    reviews: Array<Review>;
    errorMessage: string;
    loadingState: LoadingStatus;
}

const initialState: PerfumeState = {
    perfume: {},
    reviews: [],
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};

export const perfumeSlice = createSlice({
    name: "perfume",
    initialState,
    reducers: {
        setPerfumeLoadingState(state, action: PayloadAction<LoadingStatus>) {
            state.loadingState = action.payload;
        },
        setPerfume(state, action: PayloadAction<Perfume>) {
            state.perfume = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        setReviews(state, action: PayloadAction<Array<Review>>) {
            state.reviews = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        setReview(state, action: PayloadAction<Review>) {
            state.reviews = [...state.reviews, action.payload];
            state.loadingState = LoadingStatus.LOADED;
        },
        setPerfumeError(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload;
            state.loadingState = LoadingStatus.ERROR;
        },
        setPerfumeByQuery(state, action: PayloadAction<Perfume>) {
            state.perfume = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        resetPerfumeState(state) {
            state = initialState;
        }
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

export const {
    setPerfumeLoadingState,
    setPerfume,
    setReviews,
    setReview,
    setPerfumeError,
    setPerfumeByQuery,
    resetPerfumeState
} = perfumeSlice.actions;
export default perfumeSlice.reducer;
