import {
    FETCH_ORDER_SUCCESS,
    ORDER_ADDED_SUCCESS,
    ORDER_ADDED_FAILURE,
    ORDER_CONFIRMED_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS
} from "../utils/constants/actions-types";

const initialState = {
    orders: [],
    perfumes: [],
    errors: {},
    orderIndex: ""
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case FETCH_ORDER_SUCCESS:
            return {...state, perfumes: payload, errors: {}};

        case ORDER_ADDED_SUCCESS:
            return {...state};

        case ORDER_ADDED_FAILURE:
            return {...state, errors: payload};

        case ORDER_CONFIRMED_SUCCESS:
            return {...state, orderIndex: payload};

        case FETCH_USER_ORDERS_SUCCESS:
            return {...state, orders: payload};

        default:
            return state;
    }
};

export default reducer;