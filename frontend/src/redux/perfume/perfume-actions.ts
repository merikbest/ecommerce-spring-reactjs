import { LoadingStatus, Perfume, Review } from "../../types/types";
import {
    RESET_PERFUME_STATE,
    ResetPerfumeStateActionType,
    SET_PERFUME,
    SET_PERFUME_BY_QUERY,
    SET_PERFUME_ERROR,
    SET_PERFUME_LOADING_STATE,
    SET_REVIEW,
    SET_REVIEWS,
    SetPerfumeActionType,
    SetPerfumeByQueryActionType,
    SetPerfumeErrorActionType,
    SetPerfumeLoadingStateActionType,
    SetReviewActionType,
    SetReviewsActionType
} from "./perfume-action-types";

export const setPerfumeLoadingState = (status: LoadingStatus): SetPerfumeLoadingStateActionType => ({
    type: SET_PERFUME_LOADING_STATE,
    payload: status
});

export const setPerfume = (perfume: Perfume): SetPerfumeActionType => ({
    type: SET_PERFUME,
    payload: perfume
});

export const setReviews = (reviews: Array<Review>): SetReviewsActionType => ({
    type: SET_REVIEWS,
    payload: reviews
});

export const setReview = (review: Review): SetReviewActionType => ({
    type: SET_REVIEW,
    payload: review
});

export const setPerfumeError = (errorMessage: string): SetPerfumeErrorActionType => ({
    type: SET_PERFUME_ERROR,
    payload: errorMessage
});

export const setPerfumeByQuery = (perfume: Perfume): SetPerfumeByQueryActionType => ({
    type: SET_PERFUME_BY_QUERY,
    payload: perfume
});

export const resetPerfumeState = (): ResetPerfumeStateActionType => ({
    type: RESET_PERFUME_STATE
});
