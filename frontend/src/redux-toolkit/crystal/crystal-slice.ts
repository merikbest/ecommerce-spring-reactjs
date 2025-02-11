import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FullCrystalResponse, LoadingStatus, ReviewResponse } from "../../types/types";
import { fetchCristal, fetchCristalByQuery,  fetchReviewsByCrystalId } from "./crystal-thunks";


export interface CrystalState {
    crystal: Partial<FullCrystalResponse>;
    reviews: Array<ReviewResponse>;
    errorMessage: string;
    loadingState: LoadingStatus;
}


export const initialState: CrystalState = {
    crystal: {},
    reviews: [],
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};




export const crystalSlice = createSlice({
    name: "crystal",
    initialState,
    reducers: {
        setCrystal(state, action: PayloadAction<FullCrystalResponse>) {
            state.crystal = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        setReview(state, action: PayloadAction<ReviewResponse>) {
            state.reviews = [...state.reviews, action.payload];
            state.loadingState = LoadingStatus.LOADED;
        },
        resetCrystalState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCristal.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchCristal.fulfilled, (state, action) => {
            state.crystal = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchCristal.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
        builder.addCase(fetchReviewsByCrystalId.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchCristalByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchCristalByQuery.fulfilled, (state, action) => {
            state.crystal = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchCristalByQuery.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
    }
});
export const { setCrystal, setReview, resetCrystalState } = crystalSlice.actions;
export default crystalSlice.reducer;
