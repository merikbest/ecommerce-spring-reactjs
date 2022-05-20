import {Perfume, Review} from "../../types/types";
import {
    LOADING_PERFUME,
    PerfumeActionTypes,
    RESET_PERFUME_STATE,
    SET_PERFUME,
    SET_PERFUME_BY_QUERY
} from "./perfume-action-types";

export type PerfumeState = {
    perfume: Partial<Perfume>,
    reviews: Array<Review>,
    isPerfumeLoading: boolean
};

const initialState: PerfumeState = {
    perfume: {},
    reviews: [],
    isPerfumeLoading: true
};

const reducer = (state: PerfumeState = initialState, action: PerfumeActionTypes): PerfumeState => {

    switch (action.type) {
        case LOADING_PERFUME:
            return {...state, isPerfumeLoading: true};

        case SET_PERFUME:
            return {...state, perfume: action.payload, reviews: action.payload.reviews, isPerfumeLoading: false};

        case SET_PERFUME_BY_QUERY:
            return {...state, perfume: action.payload, reviews: action.payload.reviews, isPerfumeLoading: false};

        case RESET_PERFUME_STATE:
            return {perfume: {}, reviews: [], isPerfumeLoading: true};

        default:
            return state;
    }
};

export default reducer;
