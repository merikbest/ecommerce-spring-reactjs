import { Dispatch } from "redux";

import { setPerfumes, setPerfumesLoadingState } from "./perfumes-actions";
import { FilterParamsType, LoadingStatus } from "../../types/types";
import { gePerfumesByIdsQuery, getAllPerfumesByQuery } from "../../utils/graphql-query/perfume-query";
import RequestService from "../../utils/request-service";
import {
    PERFUMES,
    PERFUMES_GRAPHQL_IDS,
    PERFUMES_GRAPHQL_PERFUMES,
    PERFUMES_IDS,
    PERFUMES_SEARCH,
    PERFUMES_SEARCH_GENDER,
    PERFUMES_SEARCH_PERFUMER
} from "../../constants/urlConstants";

export const fetchPerfumes = () => async (dispatch: Dispatch) => {
    dispatch(setPerfumesLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.get(PERFUMES);
    dispatch(setPerfumes(response.data));
};

export const fetchPerfumesByIds = (ids: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(setPerfumesLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(PERFUMES_IDS, ids);
    dispatch(setPerfumes(response.data));
};

export const fetchPerfumesByFilterParams = (filter: FilterParamsType) => async (dispatch: Dispatch) => {
    dispatch(setPerfumesLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(PERFUMES_SEARCH, filter);
    dispatch(setPerfumes(response.data));
};

export const fetchPerfumesByGender = (gender: { perfumeGender: string }) => async (dispatch: Dispatch) => {
    dispatch(setPerfumesLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(PERFUMES_SEARCH_GENDER, gender);
    dispatch(setPerfumes(response.data));
};

export const fetchPerfumesByPerfumer = (perfumer: { perfumer: string }) => async (dispatch: Dispatch) => {
    dispatch(setPerfumesLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(PERFUMES_SEARCH_PERFUMER, perfumer);
    dispatch(setPerfumes(response.data));
};

// GraphQL thunks
export const fetchPerfumesByQuery = () => async (dispatch: Dispatch) => {
    dispatch(setPerfumesLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(PERFUMES_GRAPHQL_PERFUMES, { query: getAllPerfumesByQuery });
    dispatch(setPerfumes(response.data.data.perfumes));
};

export const fetchPerfumesByIdsQuery = (ids: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(setPerfumesLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(PERFUMES_GRAPHQL_IDS, { query: gePerfumesByIdsQuery(ids) });
    dispatch(setPerfumes(response.data.data.perfumesIds));
};
