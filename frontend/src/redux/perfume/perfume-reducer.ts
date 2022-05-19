import {Perfume, Review} from "../../types/types";
import {
    FETCH_PERFUME_BY_QUERY_SUCCESS,
    FETCH_PERFUME_SUCCESS,
    LOADING_PERFUME,
    PerfumeActionTypes
} from "./perfume-action-types";

export type PerfumeState = {
    perfume: Partial<Perfume>,
    reviews: Array<Review>,
    isPerfumeLoading: boolean
};

const initialState: PerfumeState = {
    perfume: {},
    reviews: [],
    isPerfumeLoading: false
};

const reducer = (state: PerfumeState = initialState, action: PerfumeActionTypes): PerfumeState => {

    switch (action.type) {
        case LOADING_PERFUME:
            return {...state, isPerfumeLoading: true};

        case FETCH_PERFUME_SUCCESS:
            return {...state, perfume: action.payload, reviews: action.payload.reviews, isPerfumeLoading: false};

        case FETCH_PERFUME_BY_QUERY_SUCCESS:
            return {...state, perfume: action.payload, reviews: action.payload.reviews, isPerfumeLoading: false};

        default:
            return state;
    }
};

export default reducer;
