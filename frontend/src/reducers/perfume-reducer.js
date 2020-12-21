import {
    FETCH_PERFUMES,
    FETCH_PERFUME,
    FETCH_PERFUMES_BY_GENDER,
    FETCH_PERFUMES_BY_PERFUMER,
    FETCH_PERFUMES_BY_FILTER_PARAMS
} from "../constants/actions-types";

const initialState = {
    perfumes: [],
    perfume: {}
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case FETCH_PERFUMES:
            return {...state, perfumes: payload};

        case FETCH_PERFUME:
            return {...state, perfume: payload};

        case FETCH_PERFUMES_BY_GENDER:
            return {...state, perfumes: payload};

        case FETCH_PERFUMES_BY_PERFUMER:
            return {...state, perfumes: payload};

        case FETCH_PERFUMES_BY_FILTER_PARAMS:
            return {...state, perfumes: payload};

        default:
            return state;
    }
};

export default reducer;