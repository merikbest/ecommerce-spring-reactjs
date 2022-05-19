import {Perfume} from "../../types/types";

export const LOADING_PERFUME = "perfume/LOADING_PERFUME";
export const FETCH_PERFUME_SUCCESS = "perfume/FETCH_PERFUME_SUCCESS";
export const FETCH_PERFUME_BY_QUERY_SUCCESS = "perfume/FETCH_PERFUME_BY_QUERY_SUCCESS";

export type LoadingPerfumeActionType = {
    type: typeof LOADING_PERFUME
};

export type FetchPerfumeSuccessActionType = {
    type: typeof FETCH_PERFUME_SUCCESS,
    payload: Perfume
};

export type FetchPerfumeByQuerySuccessActionType = {
    type: typeof FETCH_PERFUME_BY_QUERY_SUCCESS,
    payload: Perfume
};

export type PerfumeActionTypes = 
    | LoadingPerfumeActionType 
    | FetchPerfumeByQuerySuccessActionType 
    | FetchPerfumeSuccessActionType 
