import {Perfume} from "../../types/types";
import {
    FETCH_PERFUME_BY_QUERY_SUCCESS,
    FETCH_PERFUME_SUCCESS,
    LOADING_PERFUME,
    FetchPerfumeByQuerySuccessActionType,
    FetchPerfumeSuccessActionType,
    LoadingPerfumeActionType
} from "./perfume-action-types";

export const loadingPerfume = (): LoadingPerfumeActionType => ({
    type: LOADING_PERFUME
});

export const fetchPerfumeByQuerySuccess = (perfume: Perfume): FetchPerfumeByQuerySuccessActionType => ({
    type: FETCH_PERFUME_BY_QUERY_SUCCESS,
    payload: perfume
});

export const fetchPerfumeSuccess = (perfume: Perfume): FetchPerfumeSuccessActionType => ({
    type: FETCH_PERFUME_SUCCESS,
    payload: perfume
});
