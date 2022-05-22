import { LoadingStatus, Perfume, Review } from "../../types/types";

export const SET_PERFUME_LOADING_STATE = "perfume/SET_PERFUME_LOADING_STATE";
export const SET_PERFUME = "perfume/SET_PERFUME";
export const SET_REVIEWS = "perfume/SET_REVIEWS";
export const SET_REVIEW = "perfume/SET_REVIEW";
export const SET_PERFUME_ERROR = "perfume/SET_PERFUME_ERROR";
export const SET_PERFUME_BY_QUERY = "perfume/SET_PERFUME_BY_QUERY";
export const RESET_PERFUME_STATE = "perfume/RESET_PERFUME_STATE";

export type SetPerfumeLoadingStateActionType = {
    type: typeof SET_PERFUME_LOADING_STATE;
    payload: LoadingStatus;
};

export type SetPerfumeActionType = {
    type: typeof SET_PERFUME;
    payload: Perfume;
};

export type SetReviewsActionType = {
    type: typeof SET_REVIEWS;
    payload: Array<Review>;
};

export type SetReviewActionType = {
    type: typeof SET_REVIEW;
    payload: Review;
};

export type SetPerfumeErrorActionType = {
    type: typeof SET_PERFUME_ERROR;
    payload: string;
};

export type SetPerfumeByQueryActionType = {
    type: typeof SET_PERFUME_BY_QUERY;
    payload: Perfume;
};

export type ResetPerfumeStateActionType = {
    type: typeof RESET_PERFUME_STATE;
};

export type PerfumeActionTypes =
    | SetPerfumeLoadingStateActionType
    | SetPerfumeActionType
    | SetReviewsActionType
    | SetReviewActionType
    | SetPerfumeErrorActionType
    | SetPerfumeByQueryActionType
    | ResetPerfumeStateActionType;
