import {Perfume} from "../../types/types";
import {GetPerfumesActionType} from "./admin-action-types";

export const FETCH_PERFUMES_BY_QUERY_SUCCESS = "FETCH_PERFUMES_BY_QUERY_SUCCESS";
export const FETCH_PERFUME_BY_QUERY_SUCCESS = "FETCH_PERFUME_BY_QUERY_SUCCESS";
export const FETCH_PERFUME_SUCCESS = "FETCH_PERFUME_SUCCESS";
export const FETCH_PERFUMES_BY_GENDER_SUCCESS = "FETCH_PERFUMES_BY_GENDER_SUCCESS";
export const FETCH_PERFUMES_BY_PERFUMER_SUCCESS = "FETCH_PERFUMES_BY_PERFUMER_SUCCESS";
export const FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS = "FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS";

export type FetchPerfumesByQuerySuccessActionType = { type: typeof FETCH_PERFUMES_BY_QUERY_SUCCESS, payload: Array<Perfume> };
export type FetchPerfumeByQuerySuccessActionType = { type: typeof FETCH_PERFUME_BY_QUERY_SUCCESS, payload: Perfume };
export type FetchPerfumeSuccessActionType = { type: typeof FETCH_PERFUME_SUCCESS, payload: Perfume };
export type FetchPerfumesByGenderSuccessActionType = { type: typeof FETCH_PERFUMES_BY_GENDER_SUCCESS, payload: Array<Perfume> };
export type FetchPerfumesByPerfumerSuccessActionType = { type: typeof FETCH_PERFUMES_BY_PERFUMER_SUCCESS, payload: Array<Perfume> };
export type FetchPerfumesByFilterParamsSuccessActionType = { type: typeof FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS, payload: Array<Perfume> };

export type PerfumeActionTypes = FetchPerfumesByQuerySuccessActionType | FetchPerfumeByQuerySuccessActionType |
    FetchPerfumeSuccessActionType | FetchPerfumesByGenderSuccessActionType | FetchPerfumesByPerfumerSuccessActionType |
    FetchPerfumesByFilterParamsSuccessActionType | GetPerfumesActionType;
