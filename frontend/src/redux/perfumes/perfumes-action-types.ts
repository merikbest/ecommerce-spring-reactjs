import {Perfume} from "../../types/types";

export const LOADING_PERFUME = "perfumes/LOADING_PERFUME";
export const FETCH_PERFUMES = "perfumes/FETCH_PERFUMES";
export const FETCH_PERFUMES_BY_GENDER_SUCCESS = "perfumes/FETCH_PERFUMES_BY_GENDER_SUCCESS";
export const FETCH_PERFUMES_BY_PERFUMER_SUCCESS = "perfumes/FETCH_PERFUMES_BY_PERFUMER_SUCCESS";
export const FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS = "perfumes/FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS";
export const FETCH_PERFUMES_BY_QUERY_SUCCESS = "perfumes/FETCH_PERFUMES_BY_QUERY_SUCCESS";

export type LoadingPerfumeActionType = {
    type: typeof LOADING_PERFUME
};

export type GetPerfumesActionType = {
    type: typeof FETCH_PERFUMES,
    payload: Array<Perfume>
};

export type FetchPerfumesByGenderSuccessActionType = {
    type: typeof FETCH_PERFUMES_BY_GENDER_SUCCESS,
    payload: Array<Perfume>
};

export type FetchPerfumesByPerfumerSuccessActionType = {
    type: typeof FETCH_PERFUMES_BY_PERFUMER_SUCCESS,
    payload: Array<Perfume>
};

export type FetchPerfumesByFilterParamsSuccessActionType = {
    type: typeof FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS,
    payload: Array<Perfume>
};

export type FetchPerfumesByQuerySuccessActionType = {
    type: typeof FETCH_PERFUMES_BY_QUERY_SUCCESS,
    payload: Array<Perfume>
};

export type PerfumesActionTypes = 
    | LoadingPerfumeActionType 
    | FetchPerfumesByQuerySuccessActionType
    | FetchPerfumesByGenderSuccessActionType 
    | FetchPerfumesByPerfumerSuccessActionType 
    | GetPerfumesActionType 
    | FetchPerfumesByFilterParamsSuccessActionType;
