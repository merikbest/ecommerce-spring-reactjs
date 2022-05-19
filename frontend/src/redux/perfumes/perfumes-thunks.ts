import {Dispatch} from "redux";

import {
    getPerfumes,
    fetchPerfumesByQuerySuccess,
    fetchPerfumesByFilterParamsSuccess,
    fetchPerfumesByGenderSuccess,
    fetchPerfumesByPerfumerSuccess,
    loadingPerfume
} from "./perfumes-actions";
import {FilterParamsType} from "../../types/types";
import {gePerfumesByIdsQuery, getAllPerfumesByQuery} from "../../utils/graphql-query/perfume-query";
import RequestService from '../../utils/request-service';

export const fetchPerfumes = () => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.get("/perfumes");
    dispatch(getPerfumes(response.data));
};

export const fetchPerfumesByIds = (ids: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.post("/perfumes/ids", ids);
    dispatch(getPerfumes(response.data));
};

export const fetchPerfumesByFilterParams = (filter: FilterParamsType) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.post("/perfumes/search", filter);
    dispatch(fetchPerfumesByFilterParamsSuccess(response.data));
};

export const fetchPerfumesByGender = (gender: { perfumeGender: string }) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.post("/perfumes/search/gender", gender);
    dispatch(fetchPerfumesByGenderSuccess(response.data));
};

export const fetchPerfumesByPerfumer = (perfumer: { perfumer: string }) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.post("/perfumes/search/perfumer", perfumer);
    dispatch(fetchPerfumesByPerfumerSuccess(response.data));
};

// GraphQL thunks
export const fetchPerfumesByQuery = () => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.post("/perfumes/graphql/perfumes", {query: getAllPerfumesByQuery});
    dispatch(fetchPerfumesByQuerySuccess(response.data.data.perfumes));
};

export const fetchPerfumesByIdsQuery = (ids: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.post("/perfumes/graphql/ids", {query: gePerfumesByIdsQuery(ids)});
    dispatch(fetchPerfumesByQuerySuccess(response.data.data.perfumesIds));
};
