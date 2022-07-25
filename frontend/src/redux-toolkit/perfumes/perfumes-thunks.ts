import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import {
    PERFUMES,
    PERFUMES_GRAPHQL_IDS,
    PERFUMES_GRAPHQL_PERFUMES,
    PERFUMES_IDS,
    PERFUMES_SEARCH,
    PERFUMES_SEARCH_TEXT
} from "../../constants/urlConstants";
import { FilterParamsType, HeaderResponse, PerfumeResponse, PerfumesSearchRequest } from "../../types/types";
import { gePerfumesByIdsQuery, getAllPerfumesByQuery } from "../../utils/graphql-query/perfume-query";

export const fetchPerfumes = createAsyncThunk<HeaderResponse<PerfumeResponse>, number>(
    "perfumes/fetchPerfumes",
    async (page) => {
        const response = await RequestService.get(`${PERFUMES}?page=${page}`);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchPerfumesByIds = createAsyncThunk<Array<PerfumeResponse>, Array<number>>(
    "perfumes/fetchPerfumesByIds",
    async (ids) => {
        const response = await RequestService.post(PERFUMES_IDS, ids);
        return response.data;
    }
);

export const fetchPerfumesByFilterParams = createAsyncThunk<HeaderResponse<PerfumeResponse>, FilterParamsType>(
    "perfumes/fetchPerfumesByFilterParams",
    async (filter) => {
        const response = await RequestService.post(`${PERFUMES_SEARCH}?page=${filter.currentPage}`, filter);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchPerfumesByInputText = createAsyncThunk<HeaderResponse<PerfumeResponse>, PerfumesSearchRequest>(
    "perfumes/fetchPerfumesByInputText",
    async (data) => {
        const response = await RequestService.post(`${PERFUMES_SEARCH_TEXT}?page=${data.currentPage}`, data);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

// GraphQL thunks
export const fetchPerfumesByQuery = createAsyncThunk<Array<PerfumeResponse>>("perfumes/fetchPerfumesByQuery", async () => {
    const response = await RequestService.post(PERFUMES_GRAPHQL_PERFUMES, { query: getAllPerfumesByQuery });
    return response.data.data.perfumes;
});

export const fetchPerfumesByIdsQuery = createAsyncThunk<Array<PerfumeResponse>, Array<number>>(
    "perfumes/fetchPerfumesByIdsQuery",
    async (ids) => {
        const response = await RequestService.post(PERFUMES_GRAPHQL_IDS, { query: gePerfumesByIdsQuery(ids) });
        return response.data.data.perfumesIds;
    }
);
