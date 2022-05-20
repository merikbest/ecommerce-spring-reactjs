import {Dispatch} from "redux";

import {setPerfumeByQuery, setPerfume, loadingPerfume} from "./perfume-actions";
import {getPerfumeByQuery} from "../../utils/graphql-query/perfume-query";
import RequestService from '../../utils/request-service';

export const fetchPerfume = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.get("/perfumes/" + id);
    dispatch(setPerfume(response.data));
};

// GraphQL thunks
export const fetchPerfumeByQuery = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.post("/perfumes/graphql/perfume", {query: getPerfumeByQuery(id)});
    dispatch(setPerfumeByQuery(response.data.data.perfume));
};
