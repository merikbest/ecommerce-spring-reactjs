import { Dispatch } from "redux";

import { loadingPerfume, setPerfume, setPerfumeByQuery } from "./perfume-actions";
import { getPerfumeByQuery } from "../../utils/graphql-query/perfume-query";
import RequestService from "../../utils/request-service";
import { PERFUMES, PERFUMES_GRAPHQL_PERFUME } from "../../constants/urlConstants";

export const fetchPerfume = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.get(`${PERFUMES}/${id}`);
    dispatch(setPerfume(response.data));
};

// GraphQL thunks
export const fetchPerfumeByQuery = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await RequestService.post(PERFUMES_GRAPHQL_PERFUME, { query: getPerfumeByQuery(id) });
    dispatch(setPerfumeByQuery(response.data.data.perfume));
};
