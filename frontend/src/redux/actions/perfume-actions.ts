import {Perfume} from "../../types/types";
import {
    FETCH_PERFUME_SUCCESS,
    FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS,
    FETCH_PERFUMES_BY_GENDER_SUCCESS,
    FETCH_PERFUMES_BY_PERFUMER_SUCCESS,
    FetchPerfumesByFilterParamsSuccessActionType,
    FetchPerfumesByGenderSuccessActionType,
    FetchPerfumesByPerfumerSuccessActionType,
    FetchPerfumeSuccessActionType
} from "../action-types/perfume-action-types";

export const fetchPerfumeSuccess = (perfume: Perfume): FetchPerfumeSuccessActionType => ({
    type: FETCH_PERFUME_SUCCESS,
    payload: perfume
});

export const fetchPerfumesByGenderSuccess = (perfumes: Array<Perfume>): FetchPerfumesByGenderSuccessActionType => ({
    type: FETCH_PERFUMES_BY_GENDER_SUCCESS,
    payload: perfumes
});

export const fetchPerfumesByPerfumerSuccess = (perfumes: Array<Perfume>): FetchPerfumesByPerfumerSuccessActionType => ({
    type: FETCH_PERFUMES_BY_PERFUMER_SUCCESS,
    payload: perfumes
});

export const fetchPerfumesByFilterParamsSuccess = (perfumes: Array<Perfume>): FetchPerfumesByFilterParamsSuccessActionType => ({
    type: FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS,
    payload: perfumes
});
