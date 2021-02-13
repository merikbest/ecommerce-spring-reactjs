import {
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_SUCCESS,
    PERFUME_ADDED_FAILURE,
    PERFUME_UPDATED_FAILURE,
    FETCH_USER_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ORDERS_SUCCESS,
    FORM_RESET,
    FETCH_PERFUMES
} from "../utils/constants/actions-types";
import {Order, PerfumeErrors, Perfume, User} from "../types/types";

type InitialStateType = {
    perfumes: Array<Perfume>
    orders: Array<Order>
    users: Array<User>
    user: User | {}
    errors : PerfumeErrors | {}
    success: boolean
};

const initialState: InitialStateType = {
    perfumes: [],
    orders:[],
    users: [],
    user: {},
    errors: {},
    success: false
};

const reducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    const {type, payload} = action;

    switch (type) {
        case FETCH_PERFUMES:
            return {...state, perfumes: payload};

        case PERFUME_ADDED_SUCCESS:
            return {...state, success: true, errors: {}};

        case PERFUME_ADDED_FAILURE:
            return {...state, success: false, errors: payload};

        case PERFUME_UPDATED_SUCCESS:
            return {...state, success: true, errors: {}};

        case PERFUME_UPDATED_FAILURE:
            return {...state, success: false, errors: payload};

        case FETCH_USER_SUCCESS:
            return {...state, user: payload};

        case FETCH_ALL_USERS_SUCCESS:
            return {...state, users: payload};

        case FETCH_ALL_USERS_ORDERS_SUCCESS:
            return {...state, orders: payload};

        case FORM_RESET:
            return {...state, success: false, errors: {}};

        default:
            return state;
    }
};

export default reducer;
