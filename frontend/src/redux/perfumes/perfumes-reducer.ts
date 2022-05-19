import {Perfume} from "../../types/types";
import {
    FETCH_PERFUMES,
    FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS,
    FETCH_PERFUMES_BY_GENDER_SUCCESS,
    FETCH_PERFUMES_BY_PERFUMER_SUCCESS,
    FETCH_PERFUMES_BY_QUERY_SUCCESS,
    LOADING_PERFUME,
    PerfumesActionTypes
} from "./perfumes-action-types";

export type PerfumesState = {
    perfumes: Array<Perfume>,
    isPerfumeLoading: boolean
};

const initialState: PerfumesState = {
    perfumes: [],
    isPerfumeLoading: false
};

const reducer = (state: PerfumesState = initialState, action: PerfumesActionTypes): PerfumesState => {

    switch (action.type) {
        case LOADING_PERFUME:
            return {...state, isPerfumeLoading: true};

        case FETCH_PERFUMES:
            return {...state, perfumes: action.payload, isPerfumeLoading: false};

        case FETCH_PERFUMES_BY_QUERY_SUCCESS:
            return {...state, perfumes: action.payload, isPerfumeLoading: false};

        case FETCH_PERFUMES_BY_GENDER_SUCCESS:
            return {...state, perfumes: action.payload, isPerfumeLoading: false};

        case FETCH_PERFUMES_BY_PERFUMER_SUCCESS:
            return {...state, perfumes: action.payload, isPerfumeLoading: false};

        case FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS:
            return {...state, perfumes: action.payload, isPerfumeLoading: false};

        default:
            return state;
    }
};

export default reducer;
