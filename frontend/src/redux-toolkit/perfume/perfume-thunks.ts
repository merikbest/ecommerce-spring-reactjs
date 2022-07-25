import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import { PERFUMES, PERFUMES_GRAPHQL_PERFUME, PERFUMES_REVIEWS } from "../../constants/urlConstants";
import { getPerfumeByQuery } from "../../utils/graphql-query/perfume-query";
import { FullPerfumeResponse, ReviewResponse } from "../../types/types";

export const fetchPerfume = createAsyncThunk<Partial<FullPerfumeResponse>, string, { rejectValue: string }>(
    "perfume/fetchPerfume",
    async (perfumeId, thunkApi) => {
        try {
            const response = await RequestService.get(`${PERFUMES}/${perfumeId}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const fetchReviewsByPerfumeId = createAsyncThunk<Array<ReviewResponse>, string>(
    "perfume/fetchReviewsByPerfumeId",
    async (perfumeId) => {
        const response = await RequestService.get(`${PERFUMES_REVIEWS}/${perfumeId}`);
        return response.data;
    }
);

// GraphQL thunks
export const fetchPerfumeByQuery = createAsyncThunk<Partial<FullPerfumeResponse>, string, { rejectValue: string }>(
    "perfume/fetchPerfumeByQuery",
    async (perfumeId, thunkApi) => {
        try {
            const response = await RequestService.post(PERFUMES_GRAPHQL_PERFUME, {
                query: getPerfumeByQuery(perfumeId)
            });
            return response.data.data.perfume;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
