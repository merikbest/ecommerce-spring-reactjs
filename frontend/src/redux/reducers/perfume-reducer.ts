import {Perfume, Review} from "../../types/types";
import {FETCH_PERFUMES} from "../action-types/admin-action-types";
import {
    FETCH_PERFUME_SUCCESS,
    FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS,
    FETCH_PERFUMES_BY_GENDER_SUCCESS,
    FETCH_PERFUMES_BY_PERFUMER_SUCCESS,
    PerfumeActionTypes
} from "../action-types/perfume-action-types";

type InitialStateType = {
    perfumes: Array<Perfume>,
    perfume: Partial<Perfume>,
    reviews: Array<Review>
};

const initialState: InitialStateType = {
    perfumes: [],
    perfume: {},
    reviews: []
};

const reducer = (state: InitialStateType = initialState, action: PerfumeActionTypes): InitialStateType => {

    switch (action.type) {
        case FETCH_PERFUMES:
            return {...state, perfumes: action.payload};

        case FETCH_PERFUME_SUCCESS:
            return {...state, perfume: action.payload, reviews: action.payload.reviews};

        case FETCH_PERFUMES_BY_GENDER_SUCCESS:
            return {...state, perfumes: action.payload};

        case FETCH_PERFUMES_BY_PERFUMER_SUCCESS:
            return {...state, perfumes: action.payload};

        case FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS:
            return {...state, perfumes: action.payload};

        default:
            return state;
    }
};

export default reducer;
