import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import {CRYSTALS, CRYSTALS_GRAPHQL_CRYSTAL, REVIEW} from "../../constants/urlConstants";
import { FullCrystalResponse, ReviewResponse } from "../../types/types";
import { getCrystalByQuery } from "../../utils/graphql-query/crystal-query";


export const fetchCristal = createAsyncThunk<Partial<FullCrystalResponse>, string, { rejectValue: string }>(
    "crystal/fetchCrystal",
    async (crystalId, thunkApi) => {
        try {
            const response = await RequestService.get(`${CRYSTALS}/${crystalId}`);
          console.log(response.data)

            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
export const fetchReviewsByCrystalId = createAsyncThunk<Array<ReviewResponse>, string>(
    "crystal/fetchReviewsByCrystalId",
    async (crystalId) => {
        const response = await RequestService.get(`${REVIEW}/${crystalId}`);
        return response.data;
    }
);


// GraphQL thunks
export const fetchCristalByQuery = createAsyncThunk<Partial<FullCrystalResponse>, string, { rejectValue: string }>(
    "crystal/fetchCrystalByQuery",
    async (crystalId, thunkApi) => {
        try {
            const response = await RequestService.post(CRYSTALS_GRAPHQL_CRYSTAL, {
                query: getCrystalByQuery(crystalId)
            });
            return response.data.data.perfume;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);




