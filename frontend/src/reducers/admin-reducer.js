import {
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_SUCCESS,
    PERFUME_ADDED_FAILURE,
    PERFUME_UPDATED_FAILURE,
    FETCH_USER_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ORDERS_SUCCESS,
} from "../constants/actions-types";

const initialState = {
    orders:[],
    users: [],
    user: {},
    errors: {},
    success: false
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case PERFUME_ADDED_SUCCESS || PERFUME_UPDATED_SUCCESS:
            return {...state, success: true, errors: {}};

        case PERFUME_ADDED_FAILURE || PERFUME_UPDATED_FAILURE:
            return {...state, errors: payload, success: false};

        case FETCH_USER_SUCCESS:
            return {...state, user: payload};

        case FETCH_ALL_USERS_SUCCESS:
            return {...state, users: payload};

        case FETCH_ALL_USERS_ORDERS_SUCCESS:
            return {...state, orders: payload};

        default:
            return state;
    }
};

export default reducer;
