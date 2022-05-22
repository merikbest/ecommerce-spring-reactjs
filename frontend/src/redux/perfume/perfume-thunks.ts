import { Dispatch } from "redux";

import { setPerfume, setPerfumeByQuery, setPerfumeError, setPerfumeLoadingState, setReviews } from "./perfume-actions";
import { getPerfumeByQuery } from "../../utils/graphql-query/perfume-query";
import RequestService from "../../utils/request-service";
import { PERFUMES, PERFUMES_GRAPHQL_PERFUME, PERFUMES_REVIEWS } from "../../constants/urlConstants";
import { LoadingStatus } from "../../types/types";

export const fetchPerfume = (perfumeId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setPerfumeLoadingState(LoadingStatus.LOADING));
        const response = await RequestService.get(`${PERFUMES}/${perfumeId}`);
        dispatch(setPerfume(response.data));
    } catch (error) {
        dispatch(setPerfumeError(error.response.data));
    }
};

export const fetchReviewsByPerfumeId = (perfumeId: string) => async (dispatch: Dispatch) => {
    const response = await RequestService.get(`${PERFUMES_REVIEWS}/${perfumeId}`);
    dispatch(setReviews(response.data));
};

// GraphQL thunks
export const fetchPerfumeByQuery = (perfumeId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setPerfumeLoadingState(LoadingStatus.LOADING));
        const response = await RequestService.post(PERFUMES_GRAPHQL_PERFUME, { query: getPerfumeByQuery(perfumeId) });
        dispatch(setPerfumeByQuery(response.data.data.perfume));
    } catch (error) {
        dispatch(setPerfumeError(error.response.data));
    }
};
