import {Dispatch} from "redux";

import {fetchPerfumeByQuerySuccess, fetchPerfumeSuccess, loadingPerfume} from "./perfume-actions";
import {Perfume} from "../../types/types";
import {getPerfumeByQuery} from "../../utils/graphql-query/perfume-query";
import RequestService from '../../utils/request-service';

export const fetchPerfume = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.get("/perfumes/" + id);
    dispatch(fetchPerfumeSuccess(response.data));
};

export const fetchPerfumeReviewsWS = (response: Perfume) => async (dispatch: Dispatch) => {
    dispatch(fetchPerfumeSuccess(response));
};

// GraphQL thunks
export const fetchPerfumeByQuery = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.post("/perfumes/graphql/perfume", {query: getPerfumeByQuery(id)});
    dispatch(fetchPerfumeByQuerySuccess(response.data.data.perfume));
};
