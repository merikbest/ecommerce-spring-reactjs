import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import {
    PERFUMES,
    PERFUMES_GRAPHQL_IDS,
    PERFUMES_GRAPHQL_PERFUMES,
    PERFUMES_IDS,
    PERFUMES_SEARCH,
    PERFUMES_SEARCH_GENDER,
    PERFUMES_SEARCH_PERFUMER, PERFUMES_SEARCH_TEXT
} from "../../constants/urlConstants";
import {FilterParamsType, Perfume, SearchPerfume} from "../../types/types";
import { gePerfumesByIdsQuery, getAllPerfumesByQuery } from "../../utils/graphql-query/perfume-query";

export const fetchPerfumes = createAsyncThunk<Array<Perfume>>("perfumes/fetchPerfumes", async () => {
    const response = await RequestService.get(PERFUMES);
    return response.data;
});

export const fetchPerfumesByIds = createAsyncThunk<Array<Perfume>, Array<number>>(
    "perfumes/fetchPerfumesByIds",
    async (ids) => {
        const response = await RequestService.post(PERFUMES_IDS, ids);
        return response.data;
    }
);

export const fetchPerfumesByFilterParams = createAsyncThunk<Array<Perfume>, FilterParamsType>(
    "perfumes/fetchPerfumesByFilterParams",
    async (filter) => {
        const response = await RequestService.post(PERFUMES_SEARCH, filter);
        return response.data;
    }
);

export const fetchPerfumesByGender = createAsyncThunk<Array<Perfume>, { perfumeGender: string }>(
    "perfumes/fetchPerfumesByGender",
    async (gender) => {
        const response = await RequestService.post(PERFUMES_SEARCH_GENDER, gender);
        return response.data;
    }
);

export const fetchPerfumesByPerfumer = createAsyncThunk<Array<Perfume>, { perfumer: string }>(
    "perfumes/fetchPerfumesByPerfumer",
    async (perfumer) => {
        const response = await RequestService.post(PERFUMES_SEARCH_PERFUMER, perfumer);
        return response.data;
    }
);

export const fetchPerfumesByInputText = createAsyncThunk<Array<Perfume>, { searchType: SearchPerfume, text: string }>(
    "perfumes/fetchPerfumesByInputText",
    async (data) => {
        const response = await RequestService.post(PERFUMES_SEARCH_TEXT, data);
        return response.data;
    }
);

// GraphQL thunks
export const fetchPerfumesByQuery = createAsyncThunk<Array<Perfume>>("perfumes/fetchPerfumesByQuery", async () => {
    const response = await RequestService.post(PERFUMES_GRAPHQL_PERFUMES, { query: getAllPerfumesByQuery });
    return response.data.data.perfumes;
});

export const fetchPerfumesByIdsQuery = createAsyncThunk<Array<Perfume>, Array<number>>(
    "perfumes/fetchPerfumesByIdsQuery",
    async (ids) => {
        const response = await RequestService.post(PERFUMES_GRAPHQL_IDS, { query: gePerfumesByIdsQuery(ids) });
        return response.data.data.perfumesIds;
    }
);
