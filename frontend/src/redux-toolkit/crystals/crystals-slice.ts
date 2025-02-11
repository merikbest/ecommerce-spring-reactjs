import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CrystalResponse, LoadingStatus } from "../../types/types";
import {
    fetchCrystals,
    fetchPerfumesByIds,
    fetchPerfumesByIdsQuery,
    fetchPerfumesByInputText,
    fetchPerfumesByQuery
} from "./crystals-thunks";


export interface CrystalsState {
    crystals: Array<CrystalResponse>;
    pagesCount: number;
    totalElements: number;
    loadingState: LoadingStatus;
}


export const initialState:  CrystalsState = {
    crystals: [],
    pagesCount: 1,
    totalElements: 0,
    loadingState: LoadingStatus.LOADING,
}



export const crystalsSlice = createSlice({
    name: "crystals",
    initialState,
    reducers: {
        setCrystals(state, action: PayloadAction<Array<CrystalResponse>>) {
            state.crystals = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        removeCrystalById(state, action: PayloadAction<number>) {
            state.crystals = state.crystals.filter((crystal) => crystal.id !== action.payload);
            state.loadingState = LoadingStatus.LOADED;
        },
        resetCrystalsState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCrystals.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchCrystals.fulfilled, (state, action) => {
            state.crystals = action.payload.items;
            state.pagesCount = action.payload.pagesCount;
            state.totalElements = action.payload.totalElements;
            state.loadingState = LoadingStatus.LOADED;
        });
        // builder.addCase(fetchCrystalsByIds.pending, (state) => {
        //     state.loadingState = LoadingStatus.LOADING;
        // });
        // builder.addCase(fetchCrystalsByIds.fulfilled, (state, action) => {
        //     state.perfumes = action.payload;
        //     state.loadingState = LoadingStatus.LOADED;
        // });
        // builder.addCase(fetchCrystalsByFilterParams.pending, (state) => {
        //     state.loadingState = LoadingStatus.LOADING;
        // });
        // builder.addCase(fetchCrystalsByFilterParams.fulfilled, (state, action) => {
        //     state.perfumes = action.payload.items;
        //     state.pagesCount = action.payload.pagesCount;
        //     state.totalElements = action.payload.totalElements;
        //     state.loadingState = LoadingStatus.LOADED;
        // });
        // builder.addCase(fetchCrystalsByInputText.pending, (state) => {
        //     state.loadingState = LoadingStatus.LOADING;
        // });
        // builder.addCase(fetchCrystalsByInputText.fulfilled, (state, action) => {
        //     state.perfumes = action.payload.items;
        //     state.pagesCount = action.payload.pagesCount;
        //     state.totalElements = action.payload.totalElements;
        //     state.loadingState = LoadingStatus.LOADED;
        // });
        // builder.addCase(fetchCrystalsByQuery.pending, (state) => {
        //     state.loadingState = LoadingStatus.LOADING;
        // });
        // builder.addCase(fetchCrystalsByQuery.fulfilled, (state, action) => {
        //     state.perfumes = action.payload;
        //     state.loadingState = LoadingStatus.LOADED;
        // });
        // builder.addCase(fetchCrystalsByIdsQuery.pending, (state) => {
        //     state.loadingState = LoadingStatus.LOADING;
        // });
        // builder.addCase(fetchCrystalsByIdsQuery.fulfilled, (state, action) => {
        //     state.perfumes = action.payload;
        //     state.loadingState = LoadingStatus.LOADED;
        // });
    }
});

export const { setCrystals,removeCrystalById,resetCrystalsState } = crystalsSlice.actions;
export default crystalsSlice.reducer;
